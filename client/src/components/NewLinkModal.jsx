import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
export default class NewLinkModal extends Component {
  constructor(props) {
    super(props);
    this.onAddLink = this.onAddLink.bind(this);
    this.onAddDescription = this.onAddDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      link: "",
      description: ""
    };
  }
  onAddLink(e) {
    this.setState({
      link: e.target.value
    });
  }
  onAddDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(onHide, category) {
    onHide(); //to close modal
    const newLink = {
      link: this.state.link,
      description: this.state.description,
      category: category,
      token: localStorage.getItem("auth-token")
    };

    axios
      .post("http://localhost:4000/bookmark/add", newLink)
      .then(res => console.log(res.data));
    window.location.reload();
  }

  render() {
    const category = this.props.category;
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add new {category}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='text'
                // value={this.state.link}
                onChange={this.onAddLink}
                placeholder='Enter Link'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                // value={this.state.description}
                onChange={this.onAddDescription}
                placeholder='Enter Description'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onSubmit(this.props.onHide, category)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
