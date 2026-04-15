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

        // 使用更长的延迟 + 多次尝试，确保 QPlayer 内部初始化完成
        const setConfig = () => {
          window.QPlayer = {
            list: [
              {
                name: "Do You Know How Sexy You Are",
                artist: "Kendall Kelly",
                audio: "https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0",        // ← 必须是真实直链
                cover: "https://stor.picx.cx/images/2026/04/14/cux1oh.avif",
                lrc: "https://你的双语歌词.lrc 直链"
              }
            ],
            isAutoplay: false,
            isRotate: true,
            volume: 0.7
          }

          console.log('✅ 歌曲列表已设置，数量：', window.QPlayer.list.length)

          // 尝试初始化
          if (typeof window.QPlayer.init === 'function') {
            window.QPlayer.init()
            console.log('✅ QPlayer2 已手动初始化')
          }
        }

        // 多次尝试设置配置
        setTimeout(setConfig, 600)
        setTimeout(setConfig, 1200)
        setTimeout(setConfig, 2000)
      }

      document.head.appendChild(script)
    }

    initQPlayer()

  }, [musicEnable])

  return null
}

export default QPlayer2