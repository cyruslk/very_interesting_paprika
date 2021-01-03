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
    let updatedHeightOfPage = viewportHeight*6;
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

  // what has been scrolled
  let bodyScroll = (
    body.scrollTop || body.scrollTop)
    / (body.scrollHeight - body.clientHeight
  ) * 100;

  let numberOfPixelScrolled = window.scrollY;

  // if it's bigger than the first viewportHeight, then go to the second;
  // console.log(this.state.viewportHeight, "---");

  let viewportHeight = this.state.viewportHeight;

  if (numberOfPixelScrolled > 0
    && numberOfPixelScrolled < viewportHeight) {
    console.log("first anim");
  }

  if (numberOfPixelScrolled > viewportHeight
    && numberOfPixelScrolled < viewportHeight*2) {
    console.log("second anim");
  }

  if (numberOfPixelScrolled > viewportHeight*2
    && numberOfPixelScrolled < viewportHeight*3) {
    console.log("third anim");
  }


  if (numberOfPixelScrolled > viewportHeight*3
    && numberOfPixelScrolled < viewportHeight*4) {
    console.log("fourth anim");
  }


  if (numberOfPixelScrolled > viewportHeight*4
    && numberOfPixelScrolled < viewportHeight*5) {
    console.log("fifth anim");
  }


  if (numberOfPixelScrolled > viewportHeight*5
    && numberOfPixelScrolled < viewportHeight*6) {
    console.log("sixth anim");
  }




  // calculate what has been scrolled in termms of px;
  // apply to the calculation of this / what has been scrolled;

  };


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
