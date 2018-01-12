import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  MenuItem,
  Image
} from 'react-bootstrap'

import FaBars from 'react-icons/lib/fa/bars'
import MainLogo from 'gittoken-svg-icons/dist/MainLogo'
import NavBarLogo from '../Logos/NavBarLogo'

class HeaderComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    const { Account: { profile: { username, _json: { avatar_url } } } } = this.props

    return (
      <Row style={{ marginBottom: '175px' }}>
        <Navbar fixedTop>
          <Col sm={11}>
            <Navbar.Header>
              <Navbar.Brand>
                <NavBarLogo width={'100%'} style={{ margin: '-15px', marginBottom: '-70px' }} />
              </Navbar.Brand>
            </Navbar.Header>
          </Col>
          <Col sm={1}>
            <Nav pullRight style={{ textAlign: 'right' }}>
              <NavDropdown eventKey={3} title={<Image style={{ width: '100%' }} src={avatar_url} circle />} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>{username}</MenuItem>
                <MenuItem eventKey={3.2}>My Contributions</MenuItem>
                <MenuItem eventKey={3.3}>My Organizations</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Settings</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.5}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Col>
        </Navbar>

      </Row>
    );
  }
}

const mapStoreToProps = (store, props) => {
  return {
    Account: store.Account
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
