import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import ExampleContent from "./exampleContent";

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  slides = [
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/crxWB7VdxDw?si=N6mM7pgptRgwcFLn"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/WgIvZoMOaQ0?si=rBFx8Rn--ljHzIcG"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/-Uz0nSWIlhc?si=3bS9WrzzguFxlX6-"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/YpUZMGGGOZI?si=kl5ygBzrxCVlgB_D"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/5m3WozJnOVs?si=XGTj4OX-zWzqc26A"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/alwIcLw2CUs?si=WM-KGsl2sH31h1KK"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/xLEZEdEKq_o?si=OKWFzEnEeIou3qqp"} />
    },
    {
      key: uuidv4(),
      content: <ExampleContent videoLink={"https://www.youtube.com/embed/twD7_mQhANU?si=uShwpAhl_8-ZqadA"} />
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
