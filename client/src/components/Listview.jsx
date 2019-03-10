import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
export default class Listview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  render() {
    const data = this.props.linksData || [];
    // console.log(data[0] || []);
    // data.map(aa => {
    //   console.log(aa); 
    //   return;
    // });

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
