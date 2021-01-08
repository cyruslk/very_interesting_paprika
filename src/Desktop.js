import React from "react";
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
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

      console.log(ele, "here");
      let textContent = ele.textContent;

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
              {ele.textContent[0]}
            </div>
        </div>
      )
    })
    this.setState({
      dataToDivs
    })
  }



  // scrollHandler here;
  scrollHandler = (event) => {

    if(!this.state.originalImageStretch){
      return null;
    }

    let deltaY = event.deltaY;
    if (deltaY < 0){
      this.setState({
        scrollDirection: "up"
      })
    }else{
      this.setState({
        scrollDirection: "down"
      })
    }

    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;

    let originalImageStretch = this.state.originalImageStretch;

    if (numberOfPixelScrolled > 0
      && numberOfPixelScrolled < viewportHeight) {

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 0,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })


    }

    if (numberOfPixelScrolled > viewportHeight
      && numberOfPixelScrolled < viewportHeight*2) {

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 1,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*2
      && numberOfPixelScrolled < viewportHeight*3) {

         // reseting the height of the first div;
       this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 2,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })



    }

    if (numberOfPixelScrolled > viewportHeight*3
      && numberOfPixelScrolled < viewportHeight*4) {


        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 3,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })


    }

    if (numberOfPixelScrolled > viewportHeight*4
      && numberOfPixelScrolled < viewportHeight*5) {

        this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 4,
          selectedDivId: 2,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })



    }

    if (numberOfPixelScrolled > viewportHeight*5
      && numberOfPixelScrolled < viewportHeight*6) {

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 5,
          selectedDivId: 2,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*6
      && numberOfPixelScrolled < viewportHeight*7) {

        this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 6,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*7
      && numberOfPixelScrolled < viewportHeight*8) {

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 7,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*8
      && numberOfPixelScrolled < viewportHeight*9) {

        this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 8,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })


    }

    if (numberOfPixelScrolled > viewportHeight*9
      && numberOfPixelScrolled < viewportHeight*10) {

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 9,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*10
      && numberOfPixelScrolled < viewportHeight*11) {

        this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 10,
          selectedDivId: 2
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*11
      && numberOfPixelScrolled < viewportHeight*12) {


    }

    if (numberOfPixelScrolled > viewportHeight*12
      && numberOfPixelScrolled < viewportHeight*11) {


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

    let translateYPorcentageUp = this.defineValueFromPorcentage(
        remainingScrollPorcentage,
        originalImageStretch
    );

    let translateYPorcentageDown = this.defineValueFromPorcentage(
        scrolledPorcentage,
        originalImageStretch
    );

    if(animDirection === "up"){

      img.style.transform = `scaleY(${translateYPorcentageUp})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";

      if(translateYPorcentageUp < 1){
        img.style.transform = `scaleY(1)`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
      }

    }

    if(animDirection === "down"){

      img.style.transform = `scaleY(${translateYPorcentageDown})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";

      if(translateYPorcentageDown < 1){
        img.style.transform = `scaleY(1)`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
      }
    }

  }


  handleResetPreviousDivHeightDown = (id) => {

    let scrollDirection = this.state.scrollDirection;

    if(scrollDirection === "down"){

      let previousDivId = id;
      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      let viewportHeight = this.state.viewportHeight;
      let originalImageStretch = this.state.originalImageStretch;
      img.style.transform = `scaleY(${originalImageStretch})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";

    }else{
      return null;
    }
  };


  handleResetPreviousDivHeightUp = (id) => {

    let scrollDirection = this.state.scrollDirection;

    if(scrollDirection === "down"){
      return null;
    }else{


      let previousDivId = id;
      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      let viewportHeight = this.state.viewportHeight;
      let originalImageStretch = this.state.originalImageStretch;
      img.style.transform = `scaleY(${originalImageStretch})`;
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
   };

  render() {

    let state = this.state;

    return (
      <div className="main_vertical_container">
        {this.renderDivsToDom()}
      </div>
    );
  }
}

export default Desktop;
