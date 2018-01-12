const DEFAULT_STATE = {
  streamUrl: 'https://livestream.gittoken.io/live/gittoken.m3u8',
  streamLive: true
}

const Media = function(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    case 'SET_MEDIA_DETAILS':
      return {
        ...state,
        [id]: value
      }
      break;
    default:
      return state;
  }
}

export default Media
