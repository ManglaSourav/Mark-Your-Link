import React, { Component } from "react";
import { Form, Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      person_id: "",
      type: "Designation",
      email: "",
      password1: "",
      password2: "",
    };
  }

  onAddName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onAddEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onAddPassword1 = (e) => {
    this.setState({
      password1: e.target.value,
    });
  };
  onAddPassword2 = (e) => {
    this.setState({
      password2: e.target.value,
    });
  };
  onAddPersonID = (e) => {
    this.setState({
      person_id: e.target.value,
    });
  };
  onStudentClick = (e) => {
    this.setState({ type: "Student" });
  };

  onTeacherClick = (e) => {
    this.setState({ type: "Teacher" });
  };
  onRegister = (hide) => {
    if (this.state.password1 !== this.state.password2) {
      alert("Passwords don't match");
    } else {
      if (this.state.type == "Designation") {
        alert("Select a designation");
        return;
      }
      let newUser = {
        name: this.state.name,
        email: this.state.email,
        type: this.state.type,
        person_id: this.state.person_id,
        password: this.state.password1,
      };
      console.log("user", newUser);

      //axios post request
      axios
        .post("/users/register", newUser)
        .then((res) => console.log(res.data))
        .catch(function (response) {
          console.log(response);
        });

      this.setState({
        name: "",
        email: "",
        person_id: "",
        password1: "",
        password2: "",
        type: "Designation",
      });
      hide();
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                onChange={this.onAddName}
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <DropdownButton
                size="sm"
                variant="secondary"
                id="dropdown-variants-Info"
                title={this.state.type}>
                <Dropdown.Item onClick={this.onStudentClick}>
                  Student
                </Dropdown.Item>
                <Dropdown.Item onClick={this.onTeacherClick}>
                  Teacher
                </Dropdown.Item>
              </DropdownButton>

              {this.state.type !== "Designation" && (
                <Form.Control
                  style={{ marginLeft: "30px" }}
                  type="text"
                  value={this.state.person_id}
                  onChange={this.onAddPersonID}
                  placeholder={
                    this.state.type === "Student"
                      ? "Enter Roll Number"
                      : "Enter Employee id"
                  }
                />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={this.state.email}
                onChange={this.onAddEmail}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password1}
                onChange={this.onAddPassword1}
                placeholder="Enter Password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password2}
                onChange={this.onAddPassword2}
                placeholder="Enter Password "
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
