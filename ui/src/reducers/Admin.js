const DEFAULT_STATE = {
  address: '0x0',
  signer: '0x0'
}

 const Admin = function(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    case 'SET_ADMIN_DETAILS':
      return {
        ...state,
        [id]: value
      }
      break;
    default:
      return state;
  }
}

export default Admin
