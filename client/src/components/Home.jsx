import React, { Component } from "react";
// import Cards from "./Cards";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReviewModal from "./ReviewModal";
import "./Home.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    // let token = localStorage.getItem("auth-token");

    this.state = {
      reviewShow: false,
      type: "",
    };
  }
  onReviewOpen = (e) => {
    this.setState({ reviewShow: true, type: e.target.value });
  };
  reviewClose = (e) => this.setState({ reviewShow: false });

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={this.onReviewOpen}
                value="Feedback">
                Feedback
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={this.onReviewOpen}
                value="Thankyou">
                Thankyou
              </Button>
            </Col>
          </Row>
        </Container>

        <ReviewModal
          show={this.state.reviewShow}
          onHide={this.reviewClose}
          type={this.state.type}
        />
      </div>
    );
  }
}
