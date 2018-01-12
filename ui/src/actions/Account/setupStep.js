export default function setupStep({ step }) {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACCOUNT_SETUP_DETAILS',
      id: 'activeStep',
      value: step
    })

    location.href = `/account/setup/${step}`
  }
}
