import React, { Component } from "react";
import Cards from "./Cards";
import "./Home.css";
export default class Home extends Component {
  render() {
    return (
      <div>
        <div className='div1'>
          <Cards />
        </div>
      </div>
    );
  }
}
