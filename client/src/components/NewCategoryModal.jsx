import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
// import
export default class NewCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.makeCategory = this.makeCategory.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);

    this.state = {
      category: ""
    };
  }

  onAddCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  makeCategory(onHide) {
    onHide();
    const newBookmark = {
      link: "",
      description: "",
      category: this.state.category,
      token: localStorage.getItem("auth-token")
    };
    // console.log(newBookmark);

    axios
      .post("http://localhost:4000/bookmark/add", newBookmark)
      .then(res => console.log(res.data))
      .catch(function(response) {
        console.log(response);
      });
    window.location.reload();
  }

  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Enter New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={this.state.category}
                onChange={this.onAddCategory}
                placeholder='Enter Category'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.makeCategory(this.props.onHide)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
