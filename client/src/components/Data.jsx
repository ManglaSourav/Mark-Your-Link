import React, { Component } from "react";
import axios from "axios";

export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/bookmark")
      .then(response => {
        this.setState({
          links: response
        });
        console.log(this.state.links);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <div data= {this.state.links}/>;
  }
}
