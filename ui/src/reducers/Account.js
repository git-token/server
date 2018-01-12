const DEFAULT_STATE = {
  metaMaskInstalled: false,
  metaMaskLocked: true,
  address: '',
  profile: {},
  email: '',
  verified: false,
  menu: [{
    key: 'register',
    title: 'Register Organization',
    link: '/register'
  }, {
    key: 'contributions',
    title: 'Contribution Activity',
    link: '/contributions'
  }],
  organizations: []
}

const Account = function(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    case 'SET_PROFILE':
      return {
        ...state,
        profile: value
      }
      break;
    case 'SET_PROFILE_DETAILS':
      return {
        ...state,
        profile: {
          ...state['profile'],
          [id]: value
        }
      }
      break;
    case 'SET_ACCOUNT_DETAILS':
      return {
        ...state,
        [id]: value
      }
      break;
    default:
      return state;
  }
}

export default Account
