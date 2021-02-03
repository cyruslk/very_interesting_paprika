import React from "react";
import ReactHtmlParser from 'react-html-parser';
import ScrollDirection from '@anakinyuen/scroll-direction';
import mockData from "./mock_data.js";
import "./App.css";


class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      animDirection: null,
      isTriggeredInfoContent: false,
      numberOfPixelScrolled: 0,
      resetTextDivs: false,
      margin: 0,
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
      textDivSizeArray: [],
      scalingCoeffStart: 482/471,
      scalingCoeffEnd: 1.13,
      divsLastFold: null,
      resetTextDivs: false
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
    let resetTextDivs = this.state.resetTextDivs;

    // Updating these divs;
    let imgMobileContainer = [...document.getElementsByClassName('img_mobile_container')];
    let imgMobile = [...document.getElementsByClassName("img_mobile")];
    let divTextH1 = [...document.getElementsByClassName('div_text_h1')];
    let divTextP = [...document.getElementsByClassName('div_text_p')];

    let mockDataTextSubArrays = this.state.mockDataTextSubArrays;

    if(viewportHeight !== prevState.viewportHeight){

      imgMobileContainer.map((ele, index) => {
        ele.style.height = `${viewportHeight/2}px`;
      })
      imgMobile.map((ele, index) => {
        ele.style.width = `${viewportHeight/2}px`;
      })
    };

    // updating the data;
    if (counter !== prevState.counter) {
      if(counter >= 0 && counter < 4){
        this.setState({
          vertical: false,
          resetTextDivs: false
        })

        let textSubArray = mockDataTextSubArrays[0]
        divTextH1.map((ele, index) => {
         ele.innerHTML = textSubArray[index].headlines
        })
         divTextP.map((ele, index) => {
           ele.innerHTML = textSubArray[index].description
         })
      }
      if(counter >= 4 && counter < 8){
        this.setState({
          vertical: false,
          resetTextDivs: false
        })

        //initalizing the last arrayl
        let textSubArrayLastFall = mockDataTextSubArrays.slice(2, 5);
        let verticalContentArray = textSubArrayLastFall[0].concat(textSubArrayLastFall[1])

        let divsLastFold = verticalContentArray.map((ele, index) => {
          return (
            <div className="vertical_text_content">
              <h1>{ReactHtmlParser(ele.headlines)}</h1>
              <p>{ReactHtmlParser(ele.description)}</p>
            </div>
          )
        })

        let textWidth = document
        .getElementById("container_mobile_text_0")
        .getBoundingClientRect().width;


        let renderVerticalAnimationDivContainer = () => {
          let styling = {
            width: `${textWidth}px`,
            left: `-${textWidth}px`
          }
          return (
            <div
              style={styling}
              id="vertical_div_main_container">
                 {divsLastFold}
            </div>
          )
        }

        this.setState({
          divsLastFold: renderVerticalAnimationDivContainer()
        })


        let textSubArray = mockDataTextSubArrays[1]
        divTextH1.map((ele, index) => {
         ele.innerHTML = textSubArray[index].headlines
        })
         divTextP.map((ele, index) => {
           ele.innerHTML = textSubArray[index].description
         })
      }

      if(counter >= 8 && counter < 12){
        this.setState({
          vertical: true,
          resetTextDivs: true
        })
      }
    };

    // resizing the divs here;
    if(selectedDivId !== prevState.selectedDivId){

      console.log(this.state.animDirection);

      let animDirection = this.state.animDirection
      let textDivSize = this.state.textDivSizeArray[1];
      let originalImageStretchArray = this.state.originalImageStretchArray;

      if(animDirection === "down"){
        if(selectedDivId === 0){

          let divID = `container_mobile_div_${1}`;
          let divIDText = `container_mobile_text_${1}`;
          let imgScale = originalImageStretchArray[1];
          let imgContainer = document.querySelector(`#${divID}`);
          let img = document.querySelector(`#${divID} img`);

          let divText = document.querySelector(`#${divIDText}`);

          divText.style.left = `-${textDivSize}px`
          img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${imgScale*0.9})`;

        }
        if(selectedDivId === 1){

          let divID = `container_mobile_div_${0}`;
          let divIDText = `container_mobile_text_${0}`;
          let imgScale = originalImageStretchArray[0];
          let imgContainer = document.querySelector(`#${divID}`);
          let img = document.querySelector(`#${divID} img`);
          let divText = document.querySelector(`#${divIDText}`);
          divText.style.left = `-${textDivSize}px`
          console.log(imgScale, divID);
          img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${imgScale*0.9})`;

        }
      }

      if(animDirection === "up"){

        if(selectedDivId === 0){

          let divID = `container_mobile_div_${0}`;
          let divIDText = `container_mobile_text_${0}`;
          let imgScale = originalImageStretchArray[1];
          let imgContainer = document.querySelector(`#${divID}`);
          let img = document.querySelector(`#${divID} img`);

          let divText = document.querySelector(`#${divIDText}`);

          divText.style.left = `-${textDivSize}px`
          img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${15})`;

        }
        if(selectedDivId === 1){

          let divID = `container_mobile_div_${1}`;
          let divIDText = `container_mobile_text_${1}`;
          let imgScale = originalImageStretchArray[0];
          let imgContainer = document.querySelector(`#${divID}`);
          let img = document.querySelector(`#${divID} img`);
          let divText = document.querySelector(`#${divIDText}`);

          divText.style.left = `-${textDivSize}px`
          img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${15})`;

        }
      }
    }
  };


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
            style={{height: `${this.state.viewportHeight/2-this.state.margin}px`}}
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
        width: `${this.state.viewportHeight/2-this.state.margin}px`,
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
      textDivSizeArray: [...this.state.textDivSizeArray, textDivSize],
      originalImageHeightArray: [...this.state.originalImageHeightArray, originalImageHeight],
      originalImageStretchArray: [...this.state.originalImageStretchArray, originalImageStretch]
     }, () => {

       divText.style.width = `${textDivSize - 40}px`;
       divText.style.left = `-${textDivSize - this.state.margin}px`;

       let originalImageStretchArray = this.state.originalImageStretchArray;

       // why it goes on the first and not the second;
       if(index === 0){
         img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${originalImageStretchArray[index]})
         `;
       }else{

         let scalingCoeffStart = this.state.scalingCoeffStart;
         img.style.transform = `
           rotateZ(90deg)
           translate(100%)
           scaleY(${originalImageStretchArray[1]*scalingCoeffStart})
         `;
       }

     })
   })
  }


  scrollHandler = (event) => {


    if(!this.state.originalImageStretch){
      return null;
    }

    let numberOfPixelScrolled = window.scrollY;
    // fix the wheeldelta;

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
          vertical: true,
          selectedDivId: 0,
        }, () => {

          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;

          this.handleAnimation(counter, 0, "up");
          this.handleAnimation(counter, 1, "up");
          this.handleVerticalHanimation(counter, "horizontal");

        })

    }

    if (numberOfPixelScrolled > viewportHeight*9
      && numberOfPixelScrolled < viewportHeight*12) {

        let distanceToScroll = (viewportHeight*12 - viewportHeight*9);

        this.setState({
          counter: 9,
          selectedDivId: 0,
          vertical: true,

        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleVerticalHanimation(12, "vertical", distanceToScroll);
        })
    }

  };


  handleAnimation = (counter, selectedDivId, animDirection, single) => {

    this.setState({
      animDirection
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

   let textLeftUp = this.defineValueFromPorcentage(
       remainingScrollPorcentage,
       this.state.textDivSizeArray[1]
   );

   let textLeftDown = this.defineValueFromPorcentage(
       scrolledPorcentage,
       this.state.textDivSizeArray[1]
   );

    if(animDirection === "up"){


      if(selectedDivId === 0){

        let originalImageHeightArray = this.state.originalImageHeightArray;
        let scalingCoeffEnd = this.state.scalingCoeffEnd;
        let scalingCoeffEndFirstDiv = translateYPorcentageUp*scalingCoeffEnd;

        img.style.transform = `
         rotateZ(90deg)
         translate(100%)
         scaleY(${scalingCoeffEndFirstDiv})`;

         if(!this.state.vertical){
           divText.style.left = `-${textLeftUp}px`
         }else{
           divText.style.left = "-289.703px"
         }

          if(translateYPorcentageUp < 1){

            img.style.transform = `
                 rotateZ(90deg)
                 translate(100%)
                 scaleY(${1*scalingCoeffEnd})`;


           if(!this.state.vertical){
             divText.style.left = `0vw`;
           }else{
             divText.style.left = "-289.703px"
           }

        }
      }

      if(selectedDivId === 1){

        img.style.transform = `
         rotateZ(90deg)
         translate(100%)
         scaleY(${translateYPorcentageUp})`;


         if(!this.state.vertical){
           divText.style.left = `-${textLeftUp}px`
         }else{
           divText.style.left = "-289.703px"
         }

          if(translateYPorcentageUp < 1){

            img.style.transform = `
                 rotateZ(90deg)
                 translate(100%)
                 scaleY(1)`;


           if(!this.state.vertical){
             divText.style.left = `0vw`;
           }else{
             divText.style.left = "-289.703px"
           }
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


   handleVerticalHanimation = (counter, slideDirection, distanceToScroll) => {

     // calculate the distance of the scroll between the viewportHeight*9 and the viewportHeight*12;
     // then, make a % of this
     // then calculate what this pourcentage means for the verticalDivHeight, which is the height of the div;

     let verticalDiv = document.getElementById("vertical_div_main_container");
     console.log(distanceToScroll);

     let verticalDivHeight = verticalDiv.getBoundingClientRect().height;

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

    let textLeftUp = this.defineValueFromPorcentage(
        remainingScrollPorcentage,
        this.state.textDivSizeArray[1]
    );

    let textLeftDown = this.defineValueFromPorcentage(
        scrolledPorcentage,
        this.state.textDivSizeArray[1]
    );

    if(slideDirection === "horizontal"){

      verticalDiv.style.left = `-${textLeftUp}px`;

    }else{

      verticalDiv.style.left = "0px";
      // lock the other text divs;


      // Make the translateY() on the div;


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

  renderVerticalAnimation = () => {
    if(!this.state.vertical){
      return null;
    }
    return this.state.divsLastFold;
  };


  renderInfo = () => {
    return (
      <div className="info_main_container">
         {this.renderInfoCTA()}
         {this.renderBodyCTA()}
      </div>
    )
  }


  renderInfoCTA = () => {
    return (
      <div className="cta_desktop_container">
      <div
         className="info_cta_container"
         onClick={this.triggerInfoContent}
         style={this.infoCTAStyle()}>
         <span>
           +
         </span>
      </div>
      <div className="en_cta">
         <span>
           EN
         </span>
      </div>
      </div>
    )
  };


  triggerInfoContent = () => {
    this.setState({
      isTriggeredInfoContent: !this.state.isTriggeredInfoContent
    })
  }

  infoCTAStyle = () => {
    if(!this.state.isTriggeredInfoContent){
      return {
        transform: "rotate(0deg)",
        transition: "0.1s"
      }
    }else{
      return {
        transform: "rotate(45deg)",
        transition: "0.1s"
      }
    }
  }

  renderBodyCTA = () => {
    if(!this.state.isTriggeredInfoContent){
      return null;
    }
    return (
      <div className="info_body_container">
         <div className="info_body_container_headline">
           <h1>« Very Interesting » rend ses clients plus intéressants, plus remarqués, plus sollicités</h1>
         </div>
         <div className="info_body_container_ctas">
           <h1>Devenir une Cie <br /> « Very interesting » ?</h1>
           <div className="info_body_container_ctas_spans">
               <span>
                 APPELEZ
               </span>
               <span>
                 ÉCRIVEZ
               </span>
               <span>
                 REGARDEZ
               </span>
           </div>
         </div>
      </div>
    )
  };


  render() {
    if(!this.state.dataToDivs){
      return null;
    };
    return (
      <div className="main_vertical_container_mobile">
          {this.state.dataToDivs}
          {this.renderVerticalAnimation()}
          {this.renderInfo()}
      </div>
    );
  }
}

export default Mobile;
