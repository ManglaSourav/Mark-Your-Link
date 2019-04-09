import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  onAddEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  onAddPassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  onLogin = hide => {
    var user = {
      email: this.state.email,
      password: this.state.password
    };

    //axios post request
    axios
      .post("/users/login", user)
      .then(response => {
        const token = response.data["x-auth"];
        console.log(response.data);
        localStorage.setItem("auth-token", token);
        //access x-auth token and stored that into localstorage
        window.location.reload();
      })
      .catch(function(response) {
        console.log(response);
      });

    this.setState({
      email: "",
      password: ""
    });
    hide();
  };

  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={this.state.email}
                onChange={this.onAddEmail}
                placeholder='Enter email'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={this.state.password}
                onChange={this.onAddPassword}
                placeholder='Enter Password'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onLogin(this.props.onHide)}>Login</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
