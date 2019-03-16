import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import SingleCard from "./SingleCard";
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.countCategories = this.countCategories.bind(this);
    let token = localStorage.getItem("auth-token");

    this.state = {
      // nCategory: 0,
      categories: [],
      links: [],
      data: [],
      loggedIn: token ? true : false
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/bookmark", {
        params: {
          token: localStorage.getItem("auth-token")
        }
      })
      .then(response => {
        this.setState({
          links: response.data
        });
        // console.log(this.state.links);
      })
      .catch(err => {
        console.log(err);
      });
    if (this.state.loggedIn) {
      this.countCategories();
    }
  }

  async countCategories() {
    let dataForCat = await this.state.links.filter(link => {
      // console.log(link);
      return link.link === "";
    });
    // console.log(dataForCat);

    await this.setState({
      categories: dataForCat
    });
    let linkData = await this.state.links.filter(link => {
      return link.link !== ""; //removed empty document which are stored to get category
    });
    await dataForCat.filter(cat => {
      const test = cat.category;
      var links = linkData.filter(item => item.category === test);
      this.state.data.push(links);
      return test;
    });
    await this.setState({
      data: this.state.data
    });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.loggedIn ? (
            this.state.categories.map((category, i) => {
              return (
                <SingleCard
                  key={category._id}
                  category={category}
                  linksData={this.state.data[i]}
                />
              );
            })
          ) : (
            <h1 className='m-5' style={{ color: "red" }}>
              {" "}
              You need to Login or Register
            </h1>
          )}
        </Row>
      </Container>
    );
  }
}
