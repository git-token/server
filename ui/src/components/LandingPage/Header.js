import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  MenuItem
} from 'react-bootstrap'

import FaBars from 'react-icons/lib/fa/bars'
import MainLogo from 'gittoken-svg-icons/dist/MainLogo'
import NavBarLogo from '../Logos/NavBarLogo'

class HeaderComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    return (
      <Row style={{ marginBottom: '175px' }}>
        <Col sm={12}>
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <NavBarLogo width={'100%'} style={{ margin: '-15px', marginBottom: '-70px' }} />
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={'whatIsGitToken'} href="#">What is GitToken?</NavItem>
              <NavItem eventKey={'github'} href="#">GitHub</NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    );
  }
}

const mapStoreToProps = (store, props) => {
  return {
    main: store.main
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
