import React, { Component } from "react";
import Home from "./components/Home";
import CustomNavbar from "./components/CustomNavbar";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    //TODO to get token from local storage and check user is already logged in or not
  }
  render() {
    return (
      <div>
        <CustomNavbar />
        <Home />
      </div>
    );
  }
}
