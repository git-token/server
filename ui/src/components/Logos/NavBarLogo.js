import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavBarLogoComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    let { width, style } = this.props

    width = width ? width : "50%"

    return (
      <svg width={width} viewBox="0 0 2500 1500" style={style}>

        <path d="M 530 500 L 700 500 L 700 600 L 500 700 L 300 600 L 300 400 L 500 300 L 680 390 "
          fill="transparent"
          strokeLinejoin={"round"}
          stroke="#cc5333"
          strokeWidth="36"
        />

        <circle
          cx="500"
          cy="500"
          r="30"
          fill="transparent"
          stroke="#cc5333"
          strokeWidth="16"
        />

        <circle
          cx="700"
          cy="400"
          r="30"
          fill="transparent"
          stroke="#cc5333"
          strokeWidth="16"
        />

        <text x="750" y="675" fontSize="450px" fill="#fff">GitToken</text>

      </svg>
    );
  }
}

const mapStoreToProps = (store, props) => {
  return {
    main: store.main
  }
}

const NavBarLogo = connect(mapStoreToProps)(NavBarLogoComponent)

export default NavBarLogo


// <svg width={width} viewBox="0 0 2500 1500" style={style}>
// 	<path d="M 350 250 L 550 350 L 350 450 L 150 350 L 150 150 L 350 50 L 550 150 "
// 		fill="transparent"
// 		strokeLinejoin={"round"}
// 		stroke="#cc5333"
// 		strokeWidth="48"
// 	/>
//
// 	<circle cx="550" cy="150" r="48" fill="#cc5333"/>
// 	<circle cx="550" cy="150" r="26" fill="#320551"/>
// 	<circle cx="350" cy="250" r="48" fill="#cc5333"/>
// 	<circle cx="350" cy="250" r="26" fill="#320551"/>
//   <text x="600" y="450" fontSize="400px" fill="#fff">GitToken</text>
// </svg>
