import React, { Component } from "react";
import { Col, Card, Button } from "react-bootstrap";
import NewLinkModal from "./NewLinkModal";
import Listview from "./Listview";
export default class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
    // this.state = {
    //   links: []
    // };
  }
  addBM = () => {
    this.setState({ modalShow: true });
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    const { category } = this.props.category;
    // const linksData = this.props.linksData;
    
    return (
      <div>
        <Col>
          <Card className='m-5 col-6' style={{ width: "18rem" }}>
            <Card.Header>{category} </Card.Header>
            <Listview linksData={this.props.linksData} />
            <Button className='m-2' onClick={this.addBM} variant='primary'>
              Add Bookmark
            </Button>
            <NewLinkModal
              category={category}
              show={this.state.modalShow}
              onHide={modalClose}
            />
          </Card>
        </Col>
      </div>
    );
  }
}
