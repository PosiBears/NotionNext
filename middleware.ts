import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { checkStrIsNotionId, getLastPartOfUrl } from '@/lib/utils'
import { idToUuid } from 'notion-utils'
import BLOG from './blog.config'

/**
 * Clerk 身份验证中间件
 */
export const config = {
  // 这里设置白名单，防止静态资源被拦截
  matcher: ['/((?!.*\\..*|_next|/sign-in|/auth).*)', '/', '/(api|trpc)(.*)','/music/:path*','/images/:path*']
}

// 限制登录访问的路由
const isTenantRoute = createRouteMatcher([
  '/user/organization-selector(.*)',
  '/user/orgid/(.*)',
  '/dashboard',
  '/dashboard/(.*)'
])

// 限制权限访问的路由
const isTenantAdminRoute = createRouteMatcher([
  '/admin/(.*)/memberships',
  '/admin/(.*)/domain'
])

/**
 * 音乐防盗链中间件（严格模式：空 Referer 也禁止）
 */
function musicHotlinkProtection(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 只对 /music 目录下的音频文件进行保护
  if (
    (pathname.startsWith('/music/') || pathname.startsWith('/audio/')) &&
      /\.(m4a|lrc|avif|jpg|webp)$/i.test(pathname)) {
    
    const referer = req.headers.get('referer') || '';
    const host = req.headers.get('host') || '';

    // 严格模式：只有来自自己域名的 Referer 才允许
    // 空 Referer（直接打开链接）也会被禁止
    if (!referer || !referer.includes(host)) {
      return new NextResponse('Hotlinking not allowed', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
  return null; // 不拦截，继续往下执行
}

/**
 * 没有配置权限相关功能的返回
 */
const noAuthMiddleware = async (req: NextRequest) => {
  // 先执行音乐防盗链检查
  const hotlinkResponse = musicHotlinkProtection(req);
  if (hotlinkResponse) return hotlinkResponse;

  // 原来的 redirect 逻辑
  if (BLOG['UUID_REDIRECT']) {
    let redirectJson: Record<string, string> = {}
    try {
      const response = await fetch(`${req.nextUrl.origin}/redirect.json`)
      if (response.ok) {
        redirectJson = (await response.json()) as Record<string, string>
      }
    } catch (err) {
      console.error('Error fetching static file:', err)
    }

    let lastPart = getLastPartOfUrl(req.nextUrl.pathname) as string
    if (checkStrIsNotionId(lastPart)) {
      lastPart = idToUuid(lastPart)
    }

    if (lastPart && redirectJson[lastPart]) {
      const redirectToUrl = req.nextUrl.clone()
      redirectToUrl.pathname = '/' + redirectJson[lastPart]
      console.log(`redirect from ${req.nextUrl.pathname} to ${redirectToUrl.pathname}`)
      return NextResponse.redirect(redirectToUrl, 308)
    }
  }

  return NextResponse.next()
}

/**
 * 鉴权中间件
 */
const authMiddleware = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware((auth, req) => {
      const { userId } = auth()

      // 先执行音乐防盗链检查
      const hotlinkResponse = musicHotlinkProtection(req);
      if (hotlinkResponse) return hotlinkResponse;

      // 处理 /dashboard 路由的登录保护
      if (isTenantRoute(req)) {
        if (!userId) {
          const url = new URL('/sign-in', req.url)
          url.searchParams.set('redirectTo', req.url)
          return NextResponse.redirect(url)
        }
      }

      // 处理管理员相关权限保护
      if (isTenantAdminRoute(req)) {
        auth().protect(has => {
          return (
            has({ permission: 'org:sys_memberships:manage' }) ||
            has({ permission: 'org:sys_domains_manage' })
          )
        })
      }

      return NextResponse.next()
    })
  : noAuthMiddleware

export default authMiddleware