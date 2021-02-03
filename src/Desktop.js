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
      mockDataTextSubArrays: null,
      dataToDivs: null,
      originalImageHeight: null,
      originalImageStretch: null,
      isTriggeredInfoContent: false,
    };
  }

  componentDidMount(){

    document.addEventListener("wheel", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);


    let viewportHeight = window.innerHeight;
    let updatedHeightOfPage = viewportHeight*15;
    document.body.style.height = `${updatedHeightOfPage}px`;

    this.setState({
      updatedHeightOfPage,
      viewportHeight,
      mockData
    }, () => {

      let mockDataText = this.state.mockData.entriesText;

      let mockDataTextSubArrays = [
          mockDataText.slice(0, 3),
          mockDataText.slice(3, 6),
          mockDataText.slice(6, 9),
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
    let divTextH1 = [...document.getElementsByClassName('div_text_h1')];
    let divTextP = [...document.getElementsByClassName('div_text_p')];


    let mockDataTextSubArrays = this.state.mockDataTextSubArrays;


      if (counter !== prevState.counter) {
        if(counter >= 0 && counter < 6){

          let mockDataTextSubArraysFirstRow = mockDataTextSubArrays[0];

          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataTextSubArraysFirstRow[index].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataTextSubArraysFirstRow[index].description
          })
        }

        if(counter >= 6 && counter < 12){

          let mockDataTextSubArraysSecondRow = mockDataTextSubArrays[1];

            divTextH1.map((ele, index) => {
              ele.innerHTML = mockDataTextSubArraysSecondRow[index].headlines
            })
            divTextP.map((ele, index) => {
              ele.innerHTML = mockDataTextSubArraysSecondRow[index].description
            })
        }

        if(counter === 12){

          let mockDataTextSubArraysThirdRow = mockDataTextSubArrays[2];

          divTextH1.map((ele, index) => {
            ele.innerHTML = mockDataTextSubArraysThirdRow[index].headlines
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mockDataTextSubArraysThirdRow[index].description
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

      let aligningThirdDiv = this.defineValueFromPorcentage(2, viewportHeight);

      let originalImageHeight = img.getBoundingClientRect().height;

      let originalImageStretch = (viewportHeight + 1.4*aligningThirdDiv)/originalImageHeight;


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
    let mockDataTextSubArraysFirstRow = this.state.mockDataTextSubArrays[0];


    let dataToDivs = mockData.entriesImgDesktop.map((ele, index) => {

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
                  {mockDataTextSubArraysFirstRow[index].headlines}
              </h1>
              <p className="div_text_p">
                {mockDataTextSubArraysFirstRow[index].description}
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
      viewportHeight
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

        this.handleResetPreviousDivHeightUp(this.state.selectedDivId);


        this.setState({
          counter: 11,
          selectedDivId: 2
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }


    if (numberOfPixelScrolled > viewportHeight*12
      && numberOfPixelScrolled < viewportHeight*13) {

        this.handleResetPreviousDivHeightDown(this.state.selectedDivId);


        this.setState({
          counter: 12,
          selectedDivId: 2
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, 0, "up", true);
          this.handleAnimation(counter, 1, "up", true);
          this.handleAnimation(counter, 2, "up", true);
        })
    }


  };






  handleAnimation = (counter, selectedDivId, animDirection, all) => {

    console.log(all);

    // to optimze;
    // this.handleDivTextChange(counter)

    let divID = `container_div_${selectedDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;
    let originalImageStretch = this.state.originalImageStretch;


    if(!all){

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
                if(selectedDivId === 0){
                  img.style.transform = `scaleY(1.035)`;
                }
                if(selectedDivId === 1){
                  img.style.transform = `scaleY(1)`;
                }
                if(selectedDivId === 2){
                  img.style.transform = `scaleY(1.04)`;
                }

              let newImgContainerHeight = img.getBoundingClientRect().height;
              imgContainer.style.height = newImgContainerHeight + "px";
            }
          }

          if(animDirection === "down"){
            img.style.transform = `scaleY(${translateYPorcentageDown})`;
            let newImgContainerHeight = img.getBoundingClientRect().height;
            imgContainer.style.height = newImgContainerHeight + "px";

            if(translateYPorcentageDown < 1){
              if(selectedDivId === 0){
                img.style.transform = `scaleY(1.035)`;
              }
              if(selectedDivId === 1){
                img.style.transform = `scaleY(1)`;
              }
              if(selectedDivId === 2){
                img.style.transform = `scaleY(1.04)`;
              }
              let newImgContainerHeight = img.getBoundingClientRect().height;
              imgContainer.style.height = newImgContainerHeight + "px";
            }
          }

      }else{


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

          console.log(translateYPorcentageUp, selectedDivId, "heres");


          img.style.transform = `scaleY(${translateYPorcentageUp})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";

          if(selectedDivId === 1){

            // 570 = hauteur premier div;
            // 593 = hauteur deuxième div;
            let coeffScalDivId1 = (translateYPorcentageUp * 570/593)
            // console.log(x, "here");
            img.style.transform = `scaleY(${coeffScalDivId1})`;
            let newImgContainerHeight = img.getBoundingClientRect().height;
            imgContainer.style.height = newImgContainerHeight + "px";

          }

            if(translateYPorcentageUp < 1){
              if(selectedDivId === 0){
                img.style.transform = `scaleY(1)`;
              }
              if(selectedDivId === 1){
                img.style.transform = `scaleY(0.95)`;
              }
              if(selectedDivId === 2){
                img.style.transform = `scaleY(1)`;
              }

            let newImgContainerHeight = img.getBoundingClientRect().height;
            imgContainer.style.height = newImgContainerHeight + "px";
          }
        }

        if(animDirection === "down"){

          // APPLY THE CHANGE HERE;

          img.style.transform = `scaleY(${translateYPorcentageDown})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";


          if(selectedDivId === 1){

            console.log(translateYPorcentageDown);

            img.style.transform = `scaleY(${translateYPorcentageDown})`;
            let newImgContainerHeight = img.getBoundingClientRect().height;
            imgContainer.style.height = newImgContainerHeight + "px";

          }

          if(translateYPorcentageDown < 1){
            if(selectedDivId === 0){
              img.style.transform = `scaleY(1)`;
            }
            if(selectedDivId === 1){
              img.style.transform = `scaleY(1)`;
            }
            if(selectedDivId === 2){
              img.style.transform = `scaleY(1)`;
            }
            let newImgContainerHeight = img.getBoundingClientRect().height;
            imgContainer.style.height = newImgContainerHeight + "px";
          }
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
       <div
          className="info_cta_container"
          onClick={this.triggerInfoContent}
          style={this.infoCTAStyle()}>
          <span>
            +
          </span>
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
            </div>
          </div>
          <div className="info_body_container_end_para">
            <h1>Voir des choses <br /> « Very interesting » ?</h1>
          </div>
       </div>
     )
   }



  render() {
    return (
      <div className="main_vertical_container">
        {this.renderInfo()}
        {this.renderDivsToDom()}
      </div>
    );
  }
}

export default Desktop;
