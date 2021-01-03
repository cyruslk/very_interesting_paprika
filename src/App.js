import React from "react";
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selected: "first anim decreased",
      counter: 1,
      updatedHeightOfPage: null,
      viewportHeight: null,
      svgSectionsToDom: null
    };
  }

  componentDidMount(){


    document.addEventListener("wheel", this.scrollHandler);

    // initial height of page;
    let scrollHeight = document.documentElement.scrollHeight;

    // height of the viewport;
    let viewportHeight = window.innerHeight;

    // 6 here is the number of sections, to be redefined later;
    // +1 so that it can get the viewport;
    let updatedHeightOfPage = viewportHeight*7;
    // console.log(updatedHeightOfPage, "here");

    document.body.style.height = `${updatedHeightOfPage}px`;

    this.setState({
      updatedHeightOfPage,
      viewportHeight
    })
  }


  handleImageLoaded = () => {
    this.setState({
      loaded: true
    })
  }


  scrollHandler = (event) => {

    if(!this.state.loaded){
      return null;
    }

  let body = document.body.parentNode;
  let numberOfPixelScrolled = window.scrollY;
  let viewportHeight = this.state.viewportHeight;

  if (numberOfPixelScrolled > 0
    && numberOfPixelScrolled < viewportHeight) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled, viewportHeight)
      console.log("first anim: animate div with", animateDiv);
  }

  if (numberOfPixelScrolled > viewportHeight
    && numberOfPixelScrolled < viewportHeight*2) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled-viewportHeight, viewportHeight);
      console.log("second anim: animate div with", animateDiv);
  }


  if (numberOfPixelScrolled > viewportHeight*2
    && numberOfPixelScrolled < viewportHeight*3) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled-viewportHeight*2, viewportHeight);
      console.log("third anim: animate div with", animateDiv);
  }


  if (numberOfPixelScrolled > viewportHeight*3
    && numberOfPixelScrolled < viewportHeight*4) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled-viewportHeight*3, viewportHeight);
      console.log("fourth anim: animate div with", animateDiv);
  }


  if (numberOfPixelScrolled > viewportHeight*4
    && numberOfPixelScrolled < viewportHeight*5) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled-viewportHeight*4, viewportHeight);
      console.log("fifth anim: animate div with", animateDiv);
  }


    if (numberOfPixelScrolled > viewportHeight*5
      && numberOfPixelScrolled < viewportHeight*6) {
      let animateDiv = this.definePorcentage(numberOfPixelScrolled-viewportHeight*5, viewportHeight);
      console.log("sixth anim: animate div with", animateDiv);
    }

  };



  definePorcentage = (percent, total) => {
      let porcentage = (percent/total)*100;
      return porcentage
   }

  render() {

    let state = this.state;

    return (
      <div className="main_vertical_container">
      <div className="main_vertical_container_inner">
        <div id="container_div_0">
          <img
            onLoad={this.handleImageLoaded}
            src="https://bit.ly/3nXBlMo"
            alt="XXI"
          />
        </div>
        <div className="text_container">
          <h1>SvgSection</h1>
          <p>fvdfv</p>
        </div>
      </div>

      <div className="main_vertical_container_inner">
      <div id="container_div_1">
          <img
            onLoad={this.handleImageLoaded}
            src="https://bit.ly/3nXBlMo"
            alt="XXI"
          />
        </div>
        <div className="text_container">
          <h1>SvgSection</h1>
          <p>fvdfv</p>
        </div>
      </div>



      <div className="main_vertical_container_inner">
      <div id="container_div_2">
          <img
            onLoad={this.handleImageLoaded}
            src="https://bit.ly/3nXBlMo"
            alt="XXI"
          />
        </div>
        <div className="text_container">
          <h1>SvgSection</h1>
          <p>fvdfv</p>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
