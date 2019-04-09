import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
export default class Listview extends Component {
  render() {
    const data = this.props.linksData || [];

    return (
      <ListGroup variant='flush'>
        {data.map(item => {
          return (
            <ListGroup.Item key={item._id}>
              {" "}
              <a href={item.link || []} target='_blank'>
                {item.link || []}
              </a>{" "}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
