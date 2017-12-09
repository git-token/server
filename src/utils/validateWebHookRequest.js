import Promise from 'bluebird'

// TODO Better security validation
// 
export default function validateWebHookRequest({ headers, body }) {
  return new Promise((resolve, reject) => {
    if (!headers['user-agent'].match(RegExp('GitHub-Hookshot'))) {
      reject({ code: 403, message: 'Forbidden Authorization' })
    } else {
      resolve({ code: 200, message: null })
    }
  })
}
