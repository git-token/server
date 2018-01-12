const DEFAULT_STATE = {
  expandLeftSideNav: true,
  expandRightSideNav: true,
  expandHeader: true,
  expandFooter: true
}

const Layout = function(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    case 'SET_LAYOUT_DETAILS':
      return {
        ...state,
        [id]: value
      }
      break;
    default:
      return state;
  }
}

export default Layout
