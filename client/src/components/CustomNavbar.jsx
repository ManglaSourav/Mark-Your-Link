import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import NewCategoryModal from "./NewCategoryModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { CatShow: false, loginShow: false, registerShow: false };
  }
  create = () => {
    this.setState({ CatShow: true });
  };
  register = () => {
    this.setState({ registerShow: true });
  };
  login = () => {
    this.setState({ loginShow: true });
  };

  render() {
    let CatClose = () => this.setState({ CatShow: false });
    let loginClose = () => this.setState({ loginShow: false });
    let registerClose = () => this.setState({ registerShow: false });

    return (
      <div>
        <Navbar className='bg-danger' expand='lg'>
          <Navbar.Brand href='#home'>Bookmark Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/'>Link</Nav.Link>
            </Nav>
            <Button onClick={this.create} className='mr-2'>
              New Category
            </Button>
            <NewCategoryModal show={this.state.CatShow} onHide={CatClose} />
            <Button onClick={this.register} className='mr-2'>
              Register
            </Button>
            <RegisterModal
              show={this.state.registerShow}
              onHide={registerClose}
            />
            <Button onClick={this.login}>Login</Button>
            <LoginModal show={this.state.loginShow} onHide={loginClose} />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
