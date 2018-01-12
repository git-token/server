export default function getProfile() {
  this.worker.postMessage({ type: 'GET_PROFILE' })
  return null
}
