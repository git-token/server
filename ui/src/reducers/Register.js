const DEFAULT_STATE = {
  organization: '',
  adminAddress: '0x0',
  adminUsername: '',
  authToken: '',
  decimals: 8,
  symbol: '',
  tokenName: '',
  registered: false,
  showRegistration: true
}

const Registry = function(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    case 'SET_REGISTRATION_DETAILS':
      return {
        ...state,
        [id]: value
      }
      break;
    default:
      return state;
  }
}

export default Registry
