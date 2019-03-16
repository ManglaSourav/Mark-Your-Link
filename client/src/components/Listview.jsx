import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
export default class Listview extends Component {
  render() {
    const data = this.props.linksData || [];

    return (
      <ListGroup variant='flush'>
        {data.map(item => {
          return (
            <ListGroup.Item key={item._id}> {item.link || []}</ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
