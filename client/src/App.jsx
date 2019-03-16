import React, { Component } from "react";
import Home from "./components/Home";
import CustomNavbar from "./components/CustomNavbar";
export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
      
  //   };
  // }
  
    render() {
    return (
      <div>
        <CustomNavbar />
        <Home />
      </div>
    );
  }
}
