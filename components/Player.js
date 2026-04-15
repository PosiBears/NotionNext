import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

const QPlayer2 = () => {
  const musicEnable = siteConfig('MUSIC_PLAYER')

  useEffect(() => {
    if (!musicEnable) return

    const loadjQuery = () => new Promise((resolve) => {
      if (window.jQuery) return resolve(window.jQuery)
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
      s.onload = () => resolve(window.jQuery)
      document.head.appendChild(s)
    })

    const initQPlayer = async () => {
      await loadjQuery()

      // 加载 CSS
      if (!document.getElementById('qplayer-css')) {
        const link = document.createElement('link')
        link.id = 'qplayer-css'
        link.rel = 'stylesheet'
        link.href = '/css/QPlayer.css'
        document.head.appendChild(link)
      }

      // 加载 QPlayer2 主 JS
      const script = document.createElement('script')
      script.src = '/js/QPlayer.js'
      script.onload = () => {
        console.log('✅ QPlayer2 JS 加载成功')

        // 配置歌曲列表（必须在 JS 加载完成后设置）
        window.QPlayer = {
          list: [
            {
              name: "Do You Know How Sexy You Are",
              artist: "Kendall Kelly",
              audio: "https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0",        // ← 必须改成真实直链！
              cover: "https://stor.picx.cx/images/2026/04/14/cux1oh.avif",    // 可选
              lrc: "https://p.fileman.tk/d/player/d1.lrc?sign=KRhaiq6NlfCw_qmcceSMScn562tvUa6djITGrkqlm6c=:0"       // 双语歌词推荐
            }
            // 可以继续添加更多歌曲
          ],
          isAutoplay: false,
          isRotate: true,
          volume: 0.7
        }

        console.log('✅ 配置已设置，等待 QPlayer 自动初始化...')
      }

      document.head.appendChild(script)
    }

    initQPlayer()

  }, [musicEnable])

  return null
}

export default QPlayer2