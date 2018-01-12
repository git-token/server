import React, { Component } from 'react'
import { connect } from 'react-redux'


import Header from './Header'
import Welcome from './Welcome'

class MainComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {}

  render() {

    return (
      <div>
        <Header />
        <Welcome />
      </div>
    );
  }
}

const mapStoreToProps = (store, props) => {
  return {
    Account: store.Account,
    Actions: store.Actions
  }
}

const Main = connect(mapStoreToProps)(MainComponent)

export default Main
