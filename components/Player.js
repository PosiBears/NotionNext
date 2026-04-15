import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

const QPlayer2 = () => {
  const musicEnable = siteConfig('MUSIC_PLAYER')

  useEffect(() => {
    if (!musicEnable) return

    // 1. 加载 jQuery
    const loadjQuery = () => new Promise((resolve) => {
      if (window.jQuery) return resolve(window.jQuery)
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
      script.onload = () => resolve(window.jQuery)
      document.head.appendChild(script)
    })

    const initQPlayer = async () => {
      await loadjQuery()

      // 2. 加载 CSS
      if (!document.getElementById('qplayer-css')) {
        const link = document.createElement('link')
        link.id = 'qplayer-css'
        link.rel = 'stylesheet'
        link.href = '/css/QPlayer.css'
        document.head.appendChild(link)
      }

      // 3. 加载 QPlayer2 JS
      const script = document.createElement('script')
      script.src = '/js/QPlayer.js'
      script.onload = () => {
        // ==================== 关键配置在这里 ====================
        window.QPlayer = {
          list: [
            {
              name: "Do You Know How Sexy You Are",     // 歌曲名
              artist: "Kendall Kelly",                   // 歌手名
              audio: "https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0",        // ← 必须是可直接访问的音频链接
              cover: "https://stor.picx.cx/images/2026/04/14/cux1oh.avif",    // 可选，但建议加上
              lrc: "https://p.fileman.tk/d/player/d1.lrc?sign=KRhaiq6NlfCw_qmcceSMScn562tvUa6djITGrkqlm6c=:0"       // 双语歌词文件直链（推荐）
            }
            // 可以继续添加更多歌曲，用逗号隔开
          ],
          // 可选配置（根据需要打开）
          isAutoplay: false,
          isRotate: true,
          isShuffle: false,
          volume: 0.7
        }

        // 初始化播放器
        if (typeof window.QPlayer.init === 'function') {
          window.QPlayer.init()
        } else {
          console.error('QPlayer.init 不存在，请检查 QPlayer.js 是否正确加载')
        }
      }

      document.head.appendChild(script)
    }

    initQPlayer()

  }, [musicEnable])

  return null
}

export default QPlayer2