import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

const QPlayer = () => {
  const musicPlayerEnable = siteConfig('MUSIC_PLAYER')

  useEffect(() => {
    if (!musicPlayerEnable) return

    // 动态加载 jQuery（QPlayer2 依赖）
    const loadjQuery = () => {
      return new Promise((resolve) => {
        if (window.jQuery) {
          resolve(window.jQuery)
          return
        }
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
        script.onload = () => resolve(window.jQuery)
        document.body.appendChild(script)
      })
    }

    // 加载 QPlayer2
    const initQPlayer = async () => {
      await loadjQuery()

      // 加载 CSS
      if (!document.getElementById('qplayer-css')) {
        const link = document.createElement('link')
        link.id = 'qplayer-css'
        link.rel = 'stylesheet'
        link.href = '/css/QPlayer.css'   // 或你放的路径
        document.head.appendChild(link)
      }

      // 加载 JS
      const script = document.createElement('script')
      script.src = '/js/QPlayer.js'     // 或你放的路径
      script.onload = () => {
        // 配置播放列表（按照你的需求修改）
        window.QPlayer = {
          list: [
            {
              name: 'Do You Know How Sexy You Are',
              artist: 'Kendall Kelly',
              audio: 'https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0',
              cover: 'https://stor.picx.cx/images/2026/04/14/cux1oh.avif',
              lrc: 'https://p.fileman.tk/d/player/d1.lrc?sign=KRhaiq6NlfCw_qmcceSMScn562tvUa6djITGrkqlm6c=:0'   // 支持 .lrc 文件或字符串
            },
            // 可以继续添加更多歌曲
          ],
          // 其他可选配置
          isRotate: true,
          isShuffle: false,
          isAutoplay: false
        }

        // 初始化
        if (typeof window.QPlayer.init === 'function') {
          window.QPlayer.init()
        }
      }
      document.body.appendChild(script)
    }

    initQPlayer()

    // 清理（可选）
    return () => {
      // 如果需要销毁 QPlayer，可以在这里处理
    }
  }, [musicPlayerEnable])

  return null   // QPlayer2 会自己创建 DOM，不需要返回组件
}

export default QPlayer