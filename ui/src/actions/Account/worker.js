import AccountWorker from '../../workers/Account/Account.worker.js'
import { push } from 'react-router-redux'

export default function worker() {
  return (dispatch) => {
    this.worker = AccountWorker()
    this.worker.onerror = this.handleError
    this.worker.addEventListener('message', ({ data }) => {
      try {
        const { type, id, value } = JSON.parse(data)
        switch (type) {
          case 'SET_PROFILE':
            dispatch({ type, id, value })
            dispatch(push('/account'))
            break;
          case 'SET_ACCOUNT_VERIFIED':
            dispatch({ type, id, value })
            dispatch(push('/account/setup'))
            break;
          case 'SET_ACCOUNT_SETUP_DETAILS':
            if (id == 'activeStep') { dispatch(push(`/account/setup/${value}`)) }
            dispatch({ type, id, value })
            break;
          default:
            dispatch({ type, id, value })
        }
      } catch (error) {
        console.log('error', error)
      }
    })
  }
}
