import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import SingleCard from "./SingleCard";
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.countCategories = this.countCategories.bind(this);
    this.state = {
      // nCategory: 0,
      categories: [],
      links: [],
      data: []
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/bookmark")
      .then(response => {
        this.setState({
          links: response.data
        });
        // console.log(this.state.links);
      })
      .catch(err => {
        console.log(err);
      });
    this.countCategories();
  }
 

  async countCategories() {
    let dataForCat = await this.state.links.filter(link => {
      // console.log(link);
      return link.link === "";
    });
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
    // console.log(this.state.data);
  }

  render() {
     return (
      <Container>
        <Row>
          {this.state.categories.map((category, i) => {
            return (
              <SingleCard
                key={category._id}
                category={category}
                linksData={this.state.data[i]}
              />
            );
          })}
        </Row>
      </Container>
    )// console.log(;
  }
}
