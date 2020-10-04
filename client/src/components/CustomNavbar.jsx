import React, { Component, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import logo from "./logo.png";
import RegisterModal from "./RegisterModal";
import { Link } from "react-router-dom";

export default function CustomNavbar() {
  let token = localStorage.getItem("auth-token");
  const [loginShow, setLoginModal] = useState(false);
  const [registerShow, setRegisterModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  let register = () => {
    // this.setState({ registerShow: true });
    setRegisterModal(true);
  };
  let login = () => {
    // this.setState({ loginShow: true });
    setLoginModal(true);
  };
  let logout = () => {
    setLoggedIn(true);
    // this.setState({ loggedIn: false });
    localStorage.removeItem("auth-token");
    window.location.reload();
  };

  // let CatClose = () => this.setState({ CatShow: false });
  let loginClose = () => {
    setLoginModal(false);
    // this.setState({ loginShow: false });
  };

  let registerClose = () => setRegisterModal(false);
  // this.setState({ registerShow: false });

  return (
    <div>
      <Navbar className="bg-danger" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="logo ml-3 mr-3"
            alt="logo"
          />
          Bookmark Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/'>Link</Nav.Link> */}
          </Nav>
          {!loggedIn ? (
            <div>
              <Button onClick={register} className="mr-2">
                Register
              </Button>
              <RegisterModal show={registerShow} onHide={registerClose} />
              <Button onClick={login}>Login</Button>
              <LoginModal show={loginShow} onHide={loginClose} />
            </div>
          ) : (
            <div>
              <Link to="/profile">
                <Button className="mr-2">My profile</Button>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
