import React from "react";
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      counter: 0,
      selectedDivId: 0,
      updatedHeightOfPage: null,
      viewportHeight: null,
      mock_data: null,
      dataToDivs: null,
      originalImageHeight: null,
      originalImageStretch: null
    };
  }

  componentDidMount(){

    document.addEventListener("wheel", this.scrollHandler);
    let scrollHeight = document.documentElement.scrollHeight;
    let viewportHeight = window.innerHeight;

    // 6 here is the number of sections, to be redefined later;
    // +1 so that it can get the viewport;
    let updatedHeightOfPage = viewportHeight*14;
    document.body.style.height = `${updatedHeightOfPage}px`;

    this.setState({
      updatedHeightOfPage,
      viewportHeight,
      mock_data
    }, () => {
      this.renderDataToDivs();
    })
  }


  handleImageLoaded = (divID) => {
    this.setState({
      loaded: true
    }, () => {

      let viewportHeight = this.state.viewportHeight;
      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);

      let originalImageHeight = img.getBoundingClientRect().height;
      let originalImageStretch = viewportHeight/originalImageHeight;

      imgContainer.style.height = viewportHeight + "px";
      img.style.transform = `scaleY(${originalImageStretch})`;

      this.setState({
        originalImageHeight,
        originalImageStretch
      })


    })
  }


  renderDataToDivs = () => {

    let mockData = this.state.mock_data;

    let dataToDivs = mockData.entries.map((ele, index) => {
      let divID = `container_div_${index}`;
      return (
        <div className="main_vertical_container_inner">
          <div id={divID}>
              <img
                onLoad={() => {this.handleImageLoaded(divID)}}
                src={ele.img}
                alt={ele.img}
              />
            </div>
            <div className="text_container">
              <h1>SvgSection</h1>
              <p>fvdfv</p>
            </div>
        </div>
      )
    })
    this.setState({
      dataToDivs
    })
  }


  scrollHandler = (event) => {

    if(!this.state.originalImageStretch){
      return null;
    }

    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;

    let originalImageStretch = this.state.originalImageStretch;

  if (numberOfPixelScrolled > 0
    && numberOfPixelScrolled < viewportHeight) {

      this.setState({
        counter: 0,
        selectedDivId: 0
      }, () => {
        let counter = this.state.counter;
        let selectedDivId = this.state.selectedDivId;
        return this.handleAnimation(counter, selectedDivId, "up");
      })

  }

  if (numberOfPixelScrolled > viewportHeight
    && numberOfPixelScrolled < viewportHeight*2) {

      // again, the first div, but ascen;

      this.setState({
        counter: 1,
        selectedDivId: 1
      }, () => {

        // resetting/locking the height of the previous div

        let counter = this.state.counter;
        let selectedDivId = this.state.selectedDivId;
        return this.handleAnimation(counter, selectedDivId, "down");
      })

      // console.log("second anim: animate div with", remainingScroll);
  }


  if (numberOfPixelScrolled > viewportHeight*2
    && numberOfPixelScrolled < viewportHeight*3) {

      this.setState({
        counter: 2,
        selectedDivId: 2
      }, () => {
        let counter = this.state.counter;
        let selectedDivId = this.state.selectedDivId;
        return this.handleAnimation(counter, selectedDivId, "up");
      })


  }


  if (numberOfPixelScrolled > viewportHeight*3
    && numberOfPixelScrolled < viewportHeight*4) {





      let remainingScroll = this.definePorcentage(numberOfPixelScrolled-viewportHeight*3, viewportHeight);
      // console.log("fourth anim: animate div with", remainingScroll);
  }


  if (numberOfPixelScrolled > viewportHeight*4
    && numberOfPixelScrolled < viewportHeight*5) {
      let remainingScroll = this.definePorcentage(numberOfPixelScrolled-viewportHeight*4, viewportHeight);
      // console.log("fifth anim: animate div with", remainingScroll);
  }


    if (numberOfPixelScrolled > viewportHeight*5
      && numberOfPixelScrolled < viewportHeight*6) {
      let remainingScroll = this.definePorcentage(numberOfPixelScrolled-viewportHeight*5, viewportHeight);
      // console.log("sixth anim: animate div with", remainingScroll);
    }

  };


  handleAnimation = (counter, selectedDivId, animDirection) => {

    let divID = `container_div_${selectedDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;
    let originalImageStretch = this.state.originalImageStretch;


    let scrolledPorcentage = this.definePorcentage(
      (numberOfPixelScrolled - this.state.counter * viewportHeight),
      viewportHeight)
    ;


    let remainingScrollPorcentage = 100-scrolledPorcentage;

    let translateYPorcentage = this.defineValueFromPorcentage(
        remainingScrollPorcentage,
        originalImageStretch
    );

    img.style.transform = `scaleY(${translateYPorcentage})`;
    let newImgContainerHeight = img.getBoundingClientRect().height;
    imgContainer.style.height = newImgContainerHeight + "px";



    // if it's smaller that < 1, then lock;
    if(translateYPorcentage < 1){
      img.style.transform = `scaleY(1)`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";
    }
  }

  definePorcentage = (percent, total) => {
      let porcentage = (percent/total)*100;
      return porcentage
   }


   defineValueFromPorcentage = (percentage, total) => {
     let value =  ((percentage * total)/100);
     return value;
   }

   renderDivsToDom = () => {
     if(!this.state.dataToDivs){
       return "loading"
     }else{
       return this.state.dataToDivs;
     }
   }




  render() {

    let state = this.state;

    return (
      <div className="main_vertical_container">
        {this.renderDivsToDom()}
      </div>
    );
  }
}

export default App;
