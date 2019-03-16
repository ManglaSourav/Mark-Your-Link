import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: ""
    };
  }

  onAddName = e => {
    this.setState({
      name: e.target.value
    });
  };
  onAddEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  onAddPassword1 = e => {
    this.setState({
      password1: e.target.value
    });
  };
  onAddPassword2 = e => {
    this.setState({
      password2: e.target.value
    });
  };
  onRegister = hide => {
    if (this.state.password1 !== this.state.password2) {
      alert("Passwords don't match");
    } else {
      var newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password1
      };

      //axios post request
      axios
        .post("http://localhost:4000/users/register", newUser)
        .then(res => console.log(res.data))
        .catch(function(response) {
          console.log(response);
        });

      this.setState({
        name: "",
        email: "",
        password1: "",
        password2: ""
      });
      hide();
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                value={this.state.name}
                onChange={this.onAddName}
                placeholder='Enter Name'
              />
            </Form.Group>

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
                value={this.state.password1}
                onChange={this.onAddPassword1}
                placeholder='Enter Password'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type='password'
                value={this.state.password2}
                onChange={this.onAddPassword2}
                placeholder='Enter Password '
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onRegister(this.props.onHide)}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
