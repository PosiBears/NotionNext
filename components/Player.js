import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * QPlayer2 音乐播放器
 */
const Player = () => {
  const ref = useRef(null)

  const musicPlayerEnable = siteConfig('MUSIC_PLAYER')
  const playerVisible = JSON.parse(siteConfig('MUSIC_PLAYER_VISIBLE', 'true'))
  const audio = siteConfig('MUSIC_PLAYER_AUDIO_LIST')

  const initMusicPlayer = async () => {
    if (typeof window === 'undefined') return
    if (!musicPlayerEnable) return

    try {
      // 加载 jQuery
      if (!window.jQuery) {
        await loadExternalResource(
          'https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js',
          'js'
        )
      }

      // 加载 QPlayer2 JS
      await loadExternalResource('/js/QPlayer2.min.js', 'js')

      // 加载 QPlayer2 CSS
      await loadExternalResource('/css/QPlayer2.min.css', 'css')

      // 等待 DOM
      if (!ref.current) return

      // 转换 APlayer 格式 → QPlayer2 格式
      const playlist = (audio || []).map(item => ({
        title: item.name || item.title || '',
        artist: item.artist || '',
        src: item.url || item.src || '',
        pic: item.cover || item.pic || ''
      }))

      if (window.QPlayer) {
        window.QPlayer.init({
          selector: ref.current,
          playlist: playlist
        })
      }
    } catch (error) {
      console.error('QPlayer2 加载失败', error)
    }
  }

  useEffect(() => {
    initMusicPlayer()
  }, [])

  return (
    <div className={playerVisible ? 'visible' : 'invisible'}>
      <div
        ref={ref}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 99999
        }}
      />
    </div>
  )
}

export default Player