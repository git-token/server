import Promise, { promisifyAll } from 'bluebird'

import request from 'browser-request'
import PouchDB from 'pouchdb'


export default class GitTokenWalletWorker {
  constructor({ ethereumProvider, torvaldsProvider }) {
    this.db = new PouchDB('gittoken_wallet')

    this.db.info().then((info) => {
      console.log('info', info)
    }).catch((error) => {
      console.log('error', error)
    })



    this.listen()
  }

  listen() {
    console.log('GitToken Wallet Web Worker Listening for Events')
    addEventListener('message', (msg) => {
      const { data: { event, payload } } = msg
      switch(event) {
        case 'SAVE_KEYSTORE':
          this.saveKeystore({ ...payload })
          break;
        case 'RETRIEVE_KEYSTORE':
          this.retrieveKeystore()
          break;
        default:
          this.handleErrorMessage({
            error: `Invalid Event: ${event}`
          })
      }
    })
  }

  saveKeystore({ serialized }) {
    this.db.put({
      _id: 'keystore',
      serialized: serialized
    }).then(() => {
      return this.db.get('keystore')
    }).then((ks) => {
      postMessage({
        event: 'KEYSTORE_SAVED',
        payload: { keystore: ks }
      })
      return null
    }).catch((error) => {
      this.handleErrorMessage({ error })
    })
  }

  retrieveKeystore() {
    this.db.get('keystore').then((ks) => {
      postMessage({
        event: 'SERIALIZED_KEYSTORE',
        payload: {
          serialized: ks
        }
      })
      return null
    }).catch((error) => {
      this.handleErrorMessage({ error })
    })
  }

  setConfig(config) {
    console.log('GitTokenWalletWorker::setConfig::config', config)
    postMessage({
      event: 'configured',
      payload: { configured: true }
    })
  }

  handleErrorMessage({ error }) {
    console.log('error', error)
    postMessage({
      event: 'WALLET_WORKER_ERROR',
      payload: {
        error: error ? error : 'Unhandled Error'
      }
    })
    return null
  }

}

const worker = new GitTokenWalletWorker({})
