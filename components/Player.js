import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * QPlayer2 音乐播放器（稳定版）
 */
const Player = () => {
  const ref = useRef(null)

  const musicPlayerEnable = siteConfig('MUSIC_PLAYER')
  const playerVisible = JSON.parse(siteConfig('MUSIC_PLAYER_VISIBLE', 'true'))

  const initMusicPlayer = async () => {
    if (typeof window === 'undefined') return
    if (!musicPlayerEnable) return
    if (!ref.current) return

    try {
      // 1. 加载 jQuery
      if (!window.jQuery) {
        await loadExternalResource(
          'https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js',
          'js'
        )
      }

      // 2. 加载 QPlayer2（⚠️如果 CDN 失效，建议你本地化）
      await loadExternalResource('/js/QPlayer.js', 'js')

      await loadExternalResource('/css/QPlayer.css', 'css')

      // 3. 读取歌单（关键修复点）
      let audio = siteConfig('MUSIC_PLAYER_AUDIO_LIST')

      try {
        if (typeof audio === 'string') {
          audio = JSON.parse(audio)
        }
      } catch (e) {
        console.error('歌单解析失败:', e)
        audio = []
      }

      if (!Array.isArray(audio)) audio = []

      // 4. 转换格式 + 过滤无效数据
      const playlist = audio
        .map(item => ({
          title: item.name || item.title || '',
          artist: item.artist || '',
          src: item.url || item.src || '',
          pic: item.cover || item.pic || '',
          lrc: item.lrc || ''
        }))
        .filter(item => item.src)

      console.log('QPlayer playlist:', playlist)

      if (!playlist.length) {
        console.warn('QPlayer2：歌单为空，已阻止初始化')
        return
      }

      // 5. 初始化播放器
      if (window.QPlayer) {
        window.QPlayer.init({
          selector: ref.current,
          playlist
        })
      }
    } catch (err) {
      console.error('QPlayer2 初始化失败:', err)
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