export default function getOrganizations() {
  this.worker.postMessage(JSON.stringify({ type: 'GET_ORGANIZATIONS' }))
}
