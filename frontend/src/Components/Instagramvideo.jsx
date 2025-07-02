import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import InstaContent from "./instaContent";

export default class Insta extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  slides = [
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid04dqsguo6ynz992egZYKWyKzTPtjYaHGVDh5rBig5xCjPJCqak3Ntk2M2ttHU4eEwl"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0bPToet8K7RLZi42wAd1EXyotJNLj2BtRHDw1NLcUFrnPY2HLMQ6xeivy7Fd91Cw9l&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid02EcSLKRUv3jFMoKWQd47itz2cLSynvo9qreCqsNZwpABKeAUY8b6kxFh5YunXvziwl&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0TYPFWN9SbRCHB8SyRLB9wfqPxNzSwRWAKBkKkwYrgKVF74sAds2tWnHZB3bL51htl&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0FCwzkgsrr3PE9cVHH1vzfDCNgTKYe1CYsa6i1t8kvTEJznbYwpViG3GkZGfF88Jfl&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0Xz1bYTZncnuVuPmQ1NEt4c21esTTuZ2JLRthGYajpmpEues9xgcvcZ3PyWGskCyml&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0267F9aB6hXp33TNhLWQywivBFHJ8GW4ou4gBPP3C4wNwfmD5oHKvzzePNWGzpZEe5l&show_text=true&width=500"} />
    },
    {
      key: uuidv4(),
      content: <InstaContent postLink={"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoeticatma%2Fposts%2Fpfbid0jDEMCy3tV4kQYhX54aom2tjh7Xj4TucUeAAwyThn1fJtv74K6YZji6NCTqNKdtWRl&show_text=true&width=500"} />
    }
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  onChangeInput = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  render() {
    return (
      <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}
