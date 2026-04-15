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

      // 加载 QPlayer2 JS
      const script = document.createElement('script')
      script.src = '/js/QPlayer.js'
      script.onload = () => {
        console.log('✅ QPlayer2 JS 加载成功')

        // 配置歌曲列表 - 使用 setTimeout 确保在 QPlayer 内部初始化之后设置
        setTimeout(() => {
          window.QPlayer = {
            list: [
              {
                name: "Do You Know How Sexy You Are",
                artist: "Kendall Kelly",
                audio: "https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0",        // ← 改成你的真实直链
                cover: "https://stor.picx.cx/images/2026/04/14/cux1oh.avif",
                lrc: "https://p.fileman.tk/d/player/d1.lrc?sign=KRhaiq6NlfCw_qmcceSMScn562tvUa6djITGrkqlm6c=:0"
              }
              // 可以继续添加更多歌曲
            ],
            isAutoplay: false,
            isRotate: true,
            volume: 0.7
          }

          console.log('✅ 歌曲列表已设置，数量：', window.QPlayer.list.length)

          // 尝试初始化
          if (typeof window.QPlayer.init === 'function') {
            window.QPlayer.init()
            console.log('✅ QPlayer2 初始化完成')
          }
        }, 800) // 延迟800ms，确保 QPlayer.js 内部逻辑执行完
      }

      document.head.appendChild(script)
    }

    initQPlayer()

  }, [musicEnable])

  return null
}

export default QPlayer2