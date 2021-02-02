import React from "react";
import mockData from "./mock_data.js";
import "./App.css";

class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
      updatedHeightOfPage: null,
      viewportHeight: null,
      viewportWidth: null,
      mockData: null,
      dataToDivs: null,
      mockDataTextSubArrays: null,
      originalImageHeight: null,
      originalImageStretch: null,
      originalImageStretchArray: [],
      isTriggeredInfoContent: false,
      imagesMobileToDiv: null
    };
  }


  componentDidMount(){
     document.addEventListener("scroll", this.scrollHandler);
     window.addEventListener("resize", this.resizeHandler);

     let viewportHeight = window.innerHeight;

     let updatedHeightOfPage = viewportHeight*15;
      document.body.style.height = `${updatedHeightOfPage}px`;


     this.setState({
       viewportHeight
     }, () => {
     })

  };



 resizeHandler = () => {

     let viewportHeight = window.innerHeight;
     this.setState({
       viewportHeight
     })
   }


  render() {
    // if(!this.state.dataToDivs){
    //   return null;
    // };
    return (
      <div className="main_vertical_container_mobile">
        <div
        style={{height: `${this.state.viewportHeight/2-5}px`}}
        class="img_mobile_container first">
          <img
          style={{width: `${this.state.viewportHeight/2-5}px`}}
          src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1610211278/paprika%20-%20very%20interesting/M01VERYINTE.svg" />
        </div>
        <div class="img_mobile_container second">
          <img
          style={{width: `${this.state.viewportHeight/2-5}px`}}
          src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1610211325/paprika%20-%20very%20interesting/M02RESTING.svg" />
        </div>
      </div>
    );
  }
}

export default Mobile;
