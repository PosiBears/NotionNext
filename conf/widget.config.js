/**
 * 悬浮在网页上的挂件
 */
module.exports = {
  THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || false, // 是否显示切换主题按钮
  // Chatbase 是否显示chatbase机器人 https://www.chatbase.co/
  CHATBASE_ID: process.env.NEXT_PUBLIC_CHATBASE_ID || null,
  // WebwhizAI 机器人 @see https://github.com/webwhiz-ai/webwhiz
  WEB_WHIZ_ENABLED: process.env.NEXT_PUBLIC_WEB_WHIZ_ENABLED || false, // 是否显示
  WEB_WHIZ_BASE_URL:
    process.env.NEXT_PUBLIC_WEB_WHIZ_BASE_URL || 'https://api.webwhiz.ai', // 可以自建服务器
  WEB_WHIZ_CHAT_BOT_ID: process.env.NEXT_PUBLIC_WEB_WHIZ_CHAT_BOT_ID || null, // 在后台获取ID
  DIFY_CHATBOT_ENABLED: process.env.NEXT_PUBLIC_DIFY_CHATBOT_ENABLED || false,
  DIFY_CHATBOT_BASE_URL: process.env.NEXT_PUBLIC_DIFY_CHATBOT_BASE_URL || '',
  DIFY_CHATBOT_TOKEN: process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN || '',

  // 悬浮挂件
  WIDGET_PET: process.env.NEXT_PUBLIC_WIDGET_PET || false, // 是否显示宠物挂件
  WIDGET_PET_LINK:
    process.env.NEXT_PUBLIC_WIDGET_PET_LINK ||
    'https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json', // 挂件模型地址 @see https://github.com/xiazeyu/live2d-widget-models
  WIDGET_PET_SWITCH_THEME:
    process.env.NEXT_PUBLIC_WIDGET_PET_SWITCH_THEME || true, // 点击宠物挂件切换博客主题

  SPOILER_TEXT_TAG: process.env.NEXT_PUBLIC_SPOILER_TEXT_TAG || '', // Spoiler文本隐藏功能，如Notion中 [sp]希望被spoiler的文字[sp]，填入[sp] 即可

  // 音乐播放插件
  MUSIC_PLAYER: process.env.NEXT_PUBLIC_MUSIC_PLAYER || true, // 是否使用音乐播放插件
  MUSIC_PLAYER_VISIBLE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_VISIBLE || true, // 是否在左下角显示播放和切换，如果使用播放器，打开自动播放再隐藏，就会以类似背景音乐的方式播放，无法取消和暂停
  MUSIC_PLAYER_AUTO_PLAY:
    process.env.NEXT_PUBLIC_MUSIC_PLAYER_AUTO_PLAY || false, // 是否自动播放，不过自动播放时常不生效（移动设备不支持自动播放）
  MUSIC_PLAYER_LRC_TYPE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_LRC_TYPE || '1', // 歌词显示类型，可选值： 3 | 1 | 0（0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url）（前提是有配置歌词路径，对 meting 无效）
  MUSIC_PLAYER_CDN_URL:
    process.env.NEXT_PUBLIC_MUSIC_PLAYER_CDN_URL ||
    'https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js',
  MUSIC_PLAYER_ORDER: process.env.NEXT_PUBLIC_MUSIC_PLAYER_ORDER || 'list', // 默认播放方式，顺序 list，随机 random
  MUSIC_PLAYER_AUDIO_LIST: [
    // 示例音乐列表。除了以下配置外，还可配置歌词，具体配置项看此文档 https://aplayer.js.org/#/zh-Hans/
    {
      name: 'Do You Know How Sexy You Are',
      artist: 'Kendall Kelly',
      url: 'https://p.fileman.tk/d/player/d.m4a?sign=51rcPNTxlw96FaRzxuyKt-Gi2eQdN8dDIJHkkC2Pz8w=:0',
      cover:
        'https://p2.music.126.net/kn6ugISTonvqJh3LHLaPtQ==/599233837187278.jpg'
      lrc: '[00:00.000] Do you know how sexy you are\n[00:00.000] 你知道你有多性感吗\n[00:06.863] Do you know how wild you make me\n[00:06.863] 你知道你让我变得多狂野吗\n[00:13.232] And it's not your body, your car\n[00:13.232] 不是你的身体或者你的车\n[00:19.649] It's the way you give and take me\n[00:19.649] 而是你给予和对待我的方式\n[00:25.576] I was just a lonely soul\n[00:25.576] 我曾是个寂寞灵魂\n[00:29.286] Looking for someone to free me from this stormy weather\n[00:29.286] 找寻着一个能把我从暴风雨中解救出来的人\n[00:38.671] And now it's always sun and summer together\n[00:38.671] 现在则常是晴空盛夏\n[00:45.249] Do you know how dirty you are\n[00:45.249] 你知道你有多坏吗\n[00:51.664] From the earth you came to love me\n[00:51.664] 从大地出来就是为了爱我\n[00:58.001] And you're so much brighter than stars\n[00:58.001] 你比星星都耀眼许多\n[01:04.379] But you're here with me and not above me\n[01:04.379] 但你选择陪伴我而不是凌驾于我之上\n[01:10.490] I was just a lonely boy\n[01:10.490] 我曾是个寂寞男孩\n[01:14.006] Looking for someone to free me from this dark forever\n[01:14.006] 找寻着一个能把我从黑夜里永久解救出来的人\n[01:23.498] And now it's always sun and summer together\n[01:23.498] 现在则常是晴空盛夏\n[01:30.038] Do you know how sexy you are\n[01:30.038] 你知道你有多性感吗\n[01:54.066] Do you know how hopeless I am\n[01:54.066] 你知道我有多无望吗\n[02:00.466] hope left me when I met you\n[02:00.466] 我遇见你后希望就离我而去\n[02:06.862] 'Cause I don't need to wish or pretend\n[02:06.862] 因为我不必再许愿或者假装\n[02:13.240] to find someone to help me get through\n[02:13.240] 能找到人来帮我度过难关\n[02:19.317] I was just a lonely boy\n[02:19.317] 我曾是个寂寞男孩\n[02:22.815] Looking for someone to free me from this dark forever\n[02:22.815] 找寻着一个能把我从黑夜里永久解救出来的人\n[02:32.201] And now it's always sun and summer together\n[02:32.201] 现在则常是晴空盛夏\n[02:38.807] Do you know how sexy you are...\n[02:38.807] 你知道你有多性感吗…\n[02:59.713] Do you know how sexy you are\n[02:59.713] 你知道你有多性感吗'
    }
  ],
  MUSIC_PLAYER_METING: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING || false, // 是否要开启 MetingJS，从平台获取歌单。会覆盖自定义的 MUSIC_PLAYER_AUDIO_LIST，更多配置信息：https://github.com/metowolf/MetingJS
  MUSIC_PLAYER_METING_SERVER:
    process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_SERVER || 'netease', // 音乐平台，[netease, tencent, kugou, xiami, baidu]
  MUSIC_PLAYER_METING_ID:
    process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_ID || '60198', // 对应歌单的 id
  MUSIC_PLAYER_METING_LRC_TYPE:
    process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_LRC_TYPE || '1', // 已废弃！！！可选值： 3 | 1 | 0（0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url）

  // 一个小插件展示你的facebook fan page~ @see https://tw.andys.pro/article/add-facebook-fanpage-notionnext
  FACEBOOK_PAGE_TITLE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_TITLE || null, // 邊欄 Facebook Page widget 的標題欄，填''則無標題欄 e.g FACEBOOK 粉絲團'
  FACEBOOK_PAGE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || null, // Facebook Page 的連結 e.g https://www.facebook.com/tw.andys.pro
  FACEBOOK_PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '', // Facebook Page ID 來啟用 messenger 聊天功能
  FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '' // Facebook App ID 來啟用 messenger 聊天功能 获取: https://developers.facebook.com/
}
