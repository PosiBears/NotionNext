import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

/**
 * 音乐播放器
 * @returns
 */
const Player = () => {
  const [player, setPlayer] = useState()
  const ref = useRef(null)
  const lrcType = JSON.parse(siteConfig('MUSIC_PLAYER_LRC_TYPE'))
  const playerVisible = JSON.parse(siteConfig('MUSIC_PLAYER_VISIBLE'))
  const autoPlay = JSON.parse(siteConfig('MUSIC_PLAYER_AUTO_PLAY'))
  const meting = JSON.parse(siteConfig('MUSIC_PLAYER_METING'))
  const order = siteConfig('MUSIC_PLAYER_ORDER')
  const audio = siteConfig('MUSIC_PLAYER_AUDIO_LIST')

  const musicPlayerEnable = siteConfig('MUSIC_PLAYER')
  const musicPlayerCDN = siteConfig('MUSIC_PLAYER_CDN_URL')
  const musicMetingEnable = siteConfig('MUSIC_PLAYER_METING')
  const musicMetingCDNUrl = siteConfig(
    'MUSIC_PLAYER_METING_CDN_URL',
    'https://cdnjs.cloudflare.com/ajax/libs/meting/2.0.1/Meting.min.js'
  )

  const initMusicPlayer = async () => {
    if (!musicPlayerEnable) {
      return
    }
    try {
      await loadExternalResource(musicPlayerCDN, 'js')
    } catch (error) {
      console.error('音乐组件异常', error)
    }

    if (musicMetingEnable) {
      await loadExternalResource(musicMetingCDNUrl, 'js')
    }

    if (!meting && window.APlayer) {
  const ap = new window.APlayer({
    container: ref.current,
    fixed: false,
    lrcType: lrcType,
    autoplay: autoPlay,
    order: order,
    audio: audio,
    theme: '#ff4d4f'
  });

  // 添加隐藏按钮（加强保护版）
  setTimeout(() => {
    const playerContainer = ref.current;
    if (!playerContainer) return;

    const playerEl = playerContainer.querySelector('.aplayer');
    if (!playerEl) return;

    // 防止重复添加按钮
    if (playerEl.querySelector('.aplayer-hide-btn')) return;

    const hideBtn = document.createElement('div');
    hideBtn.className = 'aplayer-hide-btn';
    hideBtn.innerHTML = '✕';
    hideBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 14px;
      width: 26px;
      height: 26px;
      background: rgba(0,0,0,0.75);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      z-index: 100;
      transition: all 0.2s;
    `;

    hideBtn.onmouseover = () => hideBtn.style.background = 'rgba(200,0,0,0.9)';
    hideBtn.onmouseout = () => hideBtn.style.background = 'rgba(0,0,0,0.75)';

    hideBtn.onclick = (e) => {
      e.stopImmediatePropagation();
      playerEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      playerEl.style.opacity = '0';
      playerEl.style.transform = 'scale(0.85)';

      setTimeout(() => {
        playerEl.style.display = 'none';
      }, 420);
    };

    playerEl.style.position = 'relative';
    playerEl.appendChild(hideBtn);

    console.log('✅ 隐藏按钮已成功添加');
  }, 1500); // 延迟更长，确保播放器完全渲染
}

  useEffect(() => {
    initMusicPlayer()
    return () => {
      setPlayer(undefined)
    }
  }, [])

  return (
    <div className={playerVisible ? 'visible' : 'invisible'}>
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
      />
      {meting ? (
        <meting-js
          fixed='true'
          type='playlist'
          preload='auto'
          api={siteConfig(
            'MUSIC_PLAYER_METING_API',
            'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'
          )}
          autoplay={autoPlay}
          order={siteConfig('MUSIC_PLAYER_ORDER')}
          server={siteConfig('MUSIC_PLAYER_METING_SERVER')}
          id={siteConfig('MUSIC_PLAYER_METING_ID')}
        />
      ) : (
        <div 
        ref={ref} 
        data-player={player}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 99999,
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      />
    )}
  </div>
  )
}
}
export default Player