import { Account } from '../actions/index'

const DEFAULT_STATE = {
  account: new Account({})
}

export default function Actions(state=DEFAULT_STATE, action) {
  const { type, id, value } = action
  switch(type) {
    default:
      return state;
  }
}
