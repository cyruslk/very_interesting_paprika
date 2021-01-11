import React from "react";
import mockData from "./mock_data.js";
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
      mockData: null,
      dataToDivs: null,
      mockDataTextSubArrays: null,
      originalImageHeight: null,
      originalImageStretch: null,
      originalImageStretchArray: []
    };
  }

  componentDidMount(){

    document.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);


    let viewportHeight = window.innerHeight;

    let updatedHeightOfPage = viewportHeight*14;
    document.body.style.height = `${updatedHeightOfPage}px`;


    this.setState({
      updatedHeightOfPage,
      viewportHeight,
      mockData,
    }, () => {

      let mockDataText = this.state.mockData.entriesText;


      let mockDataTextSubArrays = [
          mockDataText.slice(0, 2),
          mockDataText.slice(2, 4),
          mockDataText.slice(4, 6),
          mockDataText.slice(6, 8),
          mockDataText.slice(9,10),
      ];

      this.setState({
        mockDataTextSubArrays
      }, () => {
        this.renderDataToDivs();
      })
    })
  };


  componentDidUpdate(prevProps, prevState) {

    let counter = this.state.counter;
    let selectedDivId = this.state.selectedDivId;

    let divTextH1 = [...document.getElementsByClassName('div_text_h1')];
    let divTextP = [...document.getElementsByClassName('div_text_p')];

    let mockDataText = this.state.mockData.entriesText;

    if(selectedDivId !== prevState.selectedDivId){

      if(selectedDivId === 0){

        console.log(this.state.originalImageStretch, "here");

        let divID = `container_div_${1}`;
        let imgContainer = document.querySelector(`#${divID}`);
        let img = document.querySelector(`#${divID} img`);

        // to optimze;
        let originalImageStretch = this.state.originalImageStretchArray[0];

        img.style.transform = `scaleY(${originalImageStretch})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";


      }
      if(selectedDivId === 1){

        let divID = `container_div_${0}`;
        let imgContainer = document.querySelector(`#${divID}`);
        let img = document.querySelector(`#${divID} img`);

        // to optimze;
        let originalImageStretch = this.state.originalImageStretchArray[0];

        img.style.transform = `scaleY(${originalImageStretch})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";

      }

    }



      if (counter !== prevState.counter) {

        if(counter >= 0 && counter < 2){


          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[0].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = ""
          })
        }

        if(counter >= 2 && counter < 4){
          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[1].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataText[1].description
          })
        }

        if(counter >= 4 && counter < 6){
          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[2].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataText[2].description
          })
        }

        if(counter >= 6 && counter < 8){
          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[3].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataText[3].description
          })
        }

        if(counter >= 8 && counter < 10){
          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[4].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataText[4].description
          })
        }

        if(counter >= 10 && counter < 12){
          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataText[5].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataText[5].description
          })
        }


      }


    }


  handleImageLoaded = (divID) => {
    this.setState({
      loaded: true
    }, () => {

      let viewportHeight = this.state.viewportHeight;
      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);

      let aligningSecondDiv = this.defineValueFromPorcentage(2, viewportHeight);


      let originalImageHeight = img.getBoundingClientRect().height;

      let originalImageStretch = (viewportHeight + 1.4*aligningSecondDiv)/originalImageHeight;


      // to optimize;
      this.setState({
        originalImageStretchArray: [...this.state.originalImageStretchArray, originalImageStretch]
      })


      imgContainer.style.height = viewportHeight + "px";
      img.style.transform = `scaleY(${originalImageStretch})`;

      this.setState({
        originalImageHeight,
        originalImageStretch
      })


    })
  }


  renderDataToDivs = () => {

    let mockData = this.state.mockData;

    let dataToDivs = mockData.entriesMobile.map((ele, index) => {

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
              <h1 className="div_text_h1">
                  Dans une économie de l’attention, il faut se démarquer.
              </h1>
              <p className="div_text_p">

              </p>
            </div>
        </div>
      )
    })
    this.setState({
      dataToDivs
    })
  }


  resizeHandler = () => {

    let viewportHeight = window.innerHeight;
    this.setState({
      viewportHeight,
    }, () => {
      // make the resize here;
    });
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


    if (numberOfPixelScrolled > 0
      && numberOfPixelScrolled < viewportHeight) {

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

        this.setState({
          counter: 4,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*5
      && numberOfPixelScrolled < viewportHeight*6) {

        this.setState({
          counter: 5,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*6
      && numberOfPixelScrolled < viewportHeight*7) {

        this.setState({
          counter: 6,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*7
      && numberOfPixelScrolled < viewportHeight*8) {

        this.setState({
          counter: 7,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*8
      && numberOfPixelScrolled < viewportHeight*9) {

        this.setState({
          counter: 8,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*9
      && numberOfPixelScrolled < viewportHeight*10) {

        this.setState({
          counter: 9,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*10
      && numberOfPixelScrolled < viewportHeight*11) {

        this.setState({
          counter: 10,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*11
      && numberOfPixelScrolled < viewportHeight*12) {

        this.setState({
          counter: 11,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*12
      && numberOfPixelScrolled < viewportHeight*13) {

        this.setState({
          counter: 11,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, 0, "up");
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }


  };


  handleAnimation = (counter, selectedDivId, animDirection, single) => {

    // to optimze;
    // this.handleDivTextChange(counter)

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

    if(!single){

    }

  }


  handleResetPreviousDivHeightDown = (id) => {


    let scrollDirection = this.state.scrollDirection;

    if(scrollDirection === "down"){

      let previousDivId = id;

      if(id === "1"){
        let previousDivId = "0";

      }else{
        let previousDivId = "1";
      }

      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
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

      if(id === "1"){
        let previousDivId = "0";

      }else{
        let previousDivId = "1";
      }


      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);


      let originalImageStretch = this.state.originalImageStretch;
      img.style.transform = `scaleY(${originalImageStretch})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";
    }

  }


  handleDivTextChange = (counter) => {

    if (counter >= 0
      && counter < 6) {
        console.log("first text content here");
    }

    if (counter >= 6
      && counter < 9) {
        console.log("second content here");
    }

    if (counter > 9) {
        console.log("third content here");
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
    return (
      <div className="main_vertical_container">
        {this.renderDivsToDom()}
      </div>
    );
  }
}

export default Desktop;
