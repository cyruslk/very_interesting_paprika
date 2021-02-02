import React from "react";
import ReactHtmlParser from 'react-html-parser';
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
      originalImageHeightArray: [],
      isTriggeredInfoContent: false,
      imagesMobileToDiv: null,
      scalingCoeff: 1.04
    };
  }


  componentDidMount(){

     document.addEventListener("scroll", this.scrollHandler);
     window.addEventListener("resize", this.resizeHandler);

     let viewportHeight = window.innerHeight;
     let viewportWidth = window.innerWidth;

     // Init the state here;
     let updatedHeightOfPage = viewportHeight*15;
     document.body.style.height = `${updatedHeightOfPage}px`;


     this.setState({
       updatedHeightOfPage,
       viewportHeight,
       viewportWidth,
       mockData,
     }, () => {

      // Getting the data from the mockData;
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

    //updating th view based on the viewPort;
    let viewportHeight = this.state.viewportHeight;
    let selectedDivId = this.state.selectedDivId;
    let counter = this.state.counter;

    // Updating these divs;
    let imgMobileContainer = [...document.getElementsByClassName('img_mobile_container')];
    let imgMobile = [...document.getElementsByClassName("img_mobile")];
    let divTextH1 = [...document.getElementsByClassName('div_text_h1')];
    let divTextP = [...document.getElementsByClassName('div_text_p')];

    let mockDataTextSubArrays = this.state.mockDataTextSubArrays;

    if(viewportHeight !== prevState.viewportHeight){
      // 5 is the space between letters; hardcodes for now
      imgMobileContainer.map((ele, index) => {
        ele.style.height = `${viewportHeight/2}px`;
      })
      imgMobile.map((ele, index) => {
        ele.style.width = `${viewportHeight/2}px`;
      })

      // calculate the stretch here;

    };

    // updating the data;
    if (counter !== prevState.counter) {

      if(counter >= 0 && counter < 4){
        let textSubArray = mockDataTextSubArrays[0]
        divTextH1.map((ele, index) => {
         ele.innerHTML = textSubArray[index].headlines
        })
         divTextP.map((ele, index) => {
           ele.innerHTML = textSubArray[index].description
         })
      }

      if(counter >= 4 && counter < 8){
        let textSubArray = mockDataTextSubArrays[1]
        divTextH1.map((ele, index) => {
         ele.innerHTML = textSubArray[index].headlines
        })
         divTextP.map((ele, index) => {
           ele.innerHTML = textSubArray[index].description
         })
      }

      if(counter >= 8 && counter < 12){
        return this.refactorMobileTextDiv();
      }

    };

    // resizing the divs here;
    if(selectedDivId !== prevState.selectedDivId){

    let textDivSize = this.state.textDivSize;
    let originalImageStretchArray = this.state.originalImageStretchArray;

     if(selectedDivId === 0){

       let divID = `container_mobile_div_${1}`;
       let divIDText = `container_mobile_text_${1}`;
       let imgScale = originalImageStretchArray[1];

       let imgContainer = document.querySelector(`#${divID}`);
       let img = document.querySelector(`#${divID} img`);

       let divText = document.querySelector(`#${divIDText}`);

       divText.style.left = `-${textDivSize}px`
       img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${imgScale})`;
     }
     if(selectedDivId === 1){

       let divID = `container_mobile_div_${0}`;
       let divIDText = `container_mobile_text_${0}`;
       let imgScale = originalImageStretchArray[0];

       let imgContainer = document.querySelector(`#${divID}`);
       let img = document.querySelector(`#${divID} img`);

       let divText = document.querySelector(`#${divIDText}`);

       divText.style.left = `-${textDivSize}px`
       img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${imgScale})`;

     }
    }
  };


  refactorMobileTextDiv = () => {
    console.log("going there");
  }


   // Render the data to divs;
   renderDataToDivs = () => {

     // Mapping through the mockData; to be changed;
      let mockData = this.state.mockData;
      let mockDataTextSubArraysFirstRow = this.state.mockDataTextSubArrays[0];


      let dataToDivs = mockData.entriesMobile.map((ele, index) => {

        let divID = `container_mobile_div_${index}`;
        let divIDText = `container_mobile_text_${index}`;
        let divIDH1 = `container_mobile_div_h1_${index}`;
        let divIP = `container_mobile_div_p_${index}`;

        return (
          <div
            id={divID}
            style={{height: `${this.state.viewportHeight/2-5}px`}}
            className="img_mobile_container">

              <div
                  id={divIDText}
                  className="mobile_text_content">
                    <h1 className="div_text_h1">
                      {ReactHtmlParser(mockDataTextSubArraysFirstRow[index].headlines)}
                    </h1>
                    <p className="div_text_p">
                      {ReactHtmlParser(mockDataTextSubArraysFirstRow[index].description)}
                    </p>
              </div>
                {this.renderImg(ele, divID, divIDText, index)}
          </div>
        )
      })
      this.setState({
        dataToDivs
      })
  };

  // optimize;
  renderImg = (ele, divID, divIDText, index) => {
    if(index === 0){
      let style = {
        width: `${this.state.viewportHeight/2}px`,
        transform: `rotateZ(90deg) translate(100%) scaleY(1)`
      }

      return (
        <img
          className="img_mobile"
          style={style}
          onLoad={() => {this.handleImageLoaded(divID, divIDText, index)}}
          alt={ele.img}
          src={ele.img}
        />
      )
    }else{

      let style = {
        width: `${this.state.viewportHeight/2-5}px`,
        transform: `rotateZ(90deg) translate(100%) scaleY(1)`
      }


      return (
        <img
          className="img_mobile"
          style={style}
          onLoad={() => {this.handleImageLoaded(divID, divIDText, index)}}
          alt={ele.img}
          src={ele.img}
        />
      )
    }
  }


  resizeHandler = () => {

      let viewportHeight = window.innerHeight;
      this.setState({
        viewportHeight
      })
    }


  handleImageLoaded = (divID, divIDText, index) => {

    this.setState({
      loaded: true
    }, () => {

      let viewportWidth = this.state.viewportWidth;
      // console.log(viewportWidth);

      // div for img; could put these in the state;
      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      let divText = document.querySelector(`#${divIDText}`);

      let originalImageHeight = img.getBoundingClientRect().width;

      let originalImageStretch = viewportWidth/originalImageHeight;
      let textDivSize = viewportWidth-originalImageHeight;

      this.setState({
      originalImageHeight,
      originalImageStretch,
      textDivSize,
       originalImageHeightArray: [...this.state.originalImageHeightArray, originalImageHeight],
       originalImageStretchArray: [...this.state.originalImageStretchArray, originalImageStretch]
     }, () => {

       let originalImageStretchArray = this.state.originalImageStretchArray;

       if(index === 0){
         img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${originalImageStretchArray[index]})
         `;
       }else{

         let scaleOne = originalImageStretchArray[0]/originalImageStretchArray[1];
         let scalingCoeff = this.state.scalingCoeff;

         img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${originalImageStretchArray[1]*scalingCoeff})
         `;
       }
      divText.style.width = `${textDivSize - 5}px`;
      divText.style.left = `-${textDivSize - 5}px`;
     })
    })
  }


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

          this.handleAnimation(counter, 0, "up");
          this.handleAnimation(counter, 1, "up");

        })

    }

    if (numberOfPixelScrolled > viewportHeight*9
      && numberOfPixelScrolled < viewportHeight*13) {

        this.setState({
          counter: 9,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
        })

    }

  };


  handleAnimation = (counter, selectedDivId, animDirection, single) => {

    // add in componentDidUpdate
    let mobileTextContent = [...document.getElementsByClassName('mobile_text_content')];
    mobileTextContent.map((ele, index) => {
      ele.style.display = "flex"
    })

    this.setState({
      vertical: false
    })

    // div for img;
    let divID = `container_mobile_div_${selectedDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);

    // div for text;
    let divTextID = `container_mobile_text_${selectedDivId}`;
    let divText = document.querySelector(`#${divTextID}`);


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

   // to change;
   let textLeftUp = this.defineValueFromPorcentage(
       remainingScrollPorcentage,
       this.state.textDivSize
   );

   let textLeftDown = this.defineValueFromPorcentage(
       scrolledPorcentage,
       this.state.textDivSize
   );



    if(animDirection === "up"){

      if(selectedDivId === 0){

        let originalImageHeightArray = this.state.originalImageHeightArray;

        // let offset = originalImageHeightArray[1]/originalImageHeightArray[0];
        let offset = 1.12;
        console.log(offset);

        let scalingCoeff = translateYPorcentageUp*offset;

        img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${scalingCoeff})`;

         divText.style.left = `-${textLeftUp}px`

          if(translateYPorcentageUp < 1){
            img.style.transform = `
                 rotateZ(90deg)
                 translate(100%)
                 scaleY(${1*offset})`;
           divText.style.left = `0vw`
          }

      }else{

        img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${translateYPorcentageUp})`;

         divText.style.left = `-${textLeftUp}px`

          if(translateYPorcentageUp < 1){
            img.style.transform = `
                 rotateZ(90deg)
                 translate(100%)
                 scaleY(1)`;
           divText.style.left = `0vw`
          }
      }

    }
    if(animDirection === "down"){


      img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${translateYPorcentageDown})
       `;

      divText.style.left = `-${textLeftDown}px`

      if(translateYPorcentageDown < 1){
        img.style.transform = `
             rotateZ(90deg)
             translate(100%)
             scaleY(1)
         `;
         divText.style.left = `0vw`
      }
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

  renderVertical = () => {
    if(!this.state.vertical){
      return null;
    }
    return (
      <div
        style={{width: `${this.state.textDivSize}px`}}
        className="main_vertical_container_mobile">

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

        <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h1>

      </div>
    )
  }



  render() {
    if(!this.state.dataToDivs){
      return null;
    };
    return (
      <div className="main_vertical_container_mobile">
          {this.state.dataToDivs}
          {this.renderVertical()}
      </div>
    );
  }
}

export default Mobile;
