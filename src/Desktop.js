import React from "react";
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import mockData from "./mock_data.js";
import "./App.css";

class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOnHoverCallCTA: false,
      toggleEN: false,
      selectedlan: "fr",
      loaded: false,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
      updatedHeightOfPage: null,
      viewportHeight: null,
      mockData: null,
      mainCmsDataSubArrays: null,
      dataToDivs: null,
      originalImageHeight: null,
      originalImageStretch: null,
      isTriggeredInfoContent: false,
      mainCmsData: null,
      infoCmsData: null
    };
  }

  componentDidMount(){

    document.addEventListener("wheel", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);

    let {cmsData} = this.props;
    let mainCmsData = cmsData.slice(0, 9);
    let infoCmsData = cmsData.slice(9, 14);
    let viewportHeight = window.innerHeight;
    let updatedHeightOfPage = viewportHeight*15;
    document.body.style.height = `${updatedHeightOfPage}px`;

    this.setState({
      updatedHeightOfPage,
      viewportHeight,
      mockData,
      mainCmsData,
      infoCmsData
    }, () => {

      let {mainCmsData} = this.state;

      let mainCmsDataSubArrays = [
        mainCmsData.slice(0, 3),
        mainCmsData.slice(3, 6),
        mainCmsData.slice(6, 9),
      ]

      this.setState({
        mainCmsDataSubArrays
      }, () => {
        this.renderDataToDivs(this.state.selectedlan);
      })
    })
  };


  componentDidUpdate(prevProps, prevState) {

    let counter = this.state.counter;
    let divTextH1 = [...document.getElementsByClassName('div_text_h1')];
    let divTextP = [...document.getElementsByClassName('div_text_p')];
    let mainCmsDataSubArrays = this.state.mainCmsDataSubArrays;
    let selectedlan = this.state.selectedlan;
    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

      if(selectedlan !== prevState.selectedlan){
        window.scrollTo(0, 0)
      }

      if (counter !== prevState.counter) {
        if(counter >= 0 && counter < 6){

          this.setState({
            isDisplayFooter: false
          })

          let mainCmsDataSubArraysFirstRow = mainCmsDataSubArrays[0];

          divTextH1.map((ele, index) => {
            ele.innerHTML = mainCmsDataSubArraysFirstRow[index][selectedLanHeadlines]
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mainCmsDataSubArraysFirstRow[index][selectedLanPara]
          })

        }

        if(counter >= 6 && counter < 12){

          this.setState({
            isDisplayFooter: false
          })

          let mainCmsDataSubArraysSecondRow = mainCmsDataSubArrays[1];

            divTextH1.map((ele, index) => {
              ele.innerHTML = mainCmsDataSubArraysSecondRow[index][selectedLanHeadlines]
            })
            divTextP.map((ele, index) => {
              ele.innerHTML = mainCmsDataSubArraysSecondRow[index][selectedLanPara]
            })
        }

        if(counter === 12){

          window.onscroll = (ev) =>  {
              if ((window.innerHeight + window.scrollY)
              >= document.body.offsetHeight - 800) {
                this.setState({
                  isDisplayFooter: true
                })
              }else{
                this.setState({
                  isDisplayFooter: false
                })
              }
          };


          let mainCmsDataSubArraysThirdRow = mainCmsDataSubArrays[2];

          divTextH1.map((ele, index) => {
            ele.innerHTML = mainCmsDataSubArraysThirdRow[index][selectedLanHeadlines]
          })
          divTextP.map((ele, index) => {
            ele.innerHTML = mainCmsDataSubArraysThirdRow[index][selectedLanPara]
          })
        }
      }
    }


  toggleEN = () => {
    this.setState({
      toggleEN: !this.state.toggleEN,
      dataToDivs: null
    }, () => {
      if(this.state.toggleEN){
        this.setState({
          selectedlan: "en"
        }, () => {
          this.renderDataToDivs(this.state.selectedlan)
        })
      }else{
        this.setState({
          selectedlan: "fr"
        }, () => {
          this.renderDataToDivs(this.state.selectedlan)
        })
      }
    })
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


  renderDataToDivs = (selectedlan) => {

    let mainCmsDataSubArraysFirstRow = this.state.mainCmsDataSubArrays[0];

    // get these images here;
    let dataToDivs = mockData.entriesImgDesktop.map((ele, index) => {

      let divID = `container_div_${index}`;
      let selectedLanHeadlines = `headlines_${selectedlan}`;
      let selectedLanPara = `paragraph_${selectedlan}`;

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
                  {mainCmsDataSubArraysFirstRow[index][selectedLanHeadlines]}
              </h1>
              <p className="div_text_p">
                {mainCmsDataSubArraysFirstRow[index][selectedLanPara]}
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
       <div
         className="info_main_container">
          {this.renderInfoCTA()}
          {this.renderBodyCTA()}
       </div>
     )
   }


   renderInfoCTA = () => {
     return (
       <div
        className="cta_desktop_container">
       <div
          className="info_cta_container"
          onClick={this.triggerInfoContent}
          style={this.infoCTAStyle()}>
            <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1612842534/paprika%20-%20very%20interesting/Croix.svg" />
       </div>
       <div
        onClick={this.toggleEN}
        className="en_cta">
          <span>
            {this.toggleENText()}
          </span>
       </div>
       </div>
     )
   };

   toggleENText = () => {
     if(this.state.toggleEN){
       return "FR"
     }else{
       return "EN"
     }
   }


   triggerInfoContent = () => {
     this.setState({
       isTriggeredInfoContent: !this.state.isTriggeredInfoContent
     })
   }

   infoCTAStyle = () => {
     if(!this.state.isTriggeredInfoContent){
       return {
         transform: "rotate(0deg)",
         transitionTimingFunction: "ease-in-out",
         transition: "0.4s"
       }
     }else{
       return {
         transform: "rotate(135deg)",
         transitionTimingFunction: "ease-in-out",
         transition: "0.4s"
       }
     }
   }


   renderBodyCTA = () => {

     let {infoCmsData} = this.state;
     let {selectedlan} = this.state;

     if(!this.state.isTriggeredInfoContent){
       return null;
     }

     let selectedLanHeadlines = `headlines_${selectedlan}`;
     let selectedLanPara = `paragraph_${selectedlan}`;

     return (
       <SlideDown className={'my-dropdown-slidedown'}>
         <div
            id="info_body_container"
            className="info_body_container">
            <div className="info_body_container_headline">
              <h1>{infoCmsData[0][selectedLanHeadlines]}</h1>
            </div>
            <div className="info_body_container_ctas">
              <h1>{infoCmsData[0][selectedLanPara]}</h1>
              <div className="info_body_container_ctas_spans">
                  <span
                    id="body"
                    onMouseEnter={() => this.toggleOnHoverCallCTA("body")}
                    onMouseLeave={() => this.toggleOnHoverCallCTA("body")}>
                      {infoCmsData[1][selectedLanHeadlines]}
                  </span>
                  <a
                    href={"mailto:" + infoCmsData[2][selectedLanPara]}
                    rel="noopener"
                    target="_blank">
                  <span>
                    {infoCmsData[2][selectedLanHeadlines]}
                  </span>
                  </a>
                  <a
                    href={infoCmsData[3][selectedLanPara]}
                    rel="noopener"
                    target="_blank">
                  <span>
                    {infoCmsData[3][selectedLanHeadlines]}
                  </span>
                  </a>
              </div>
            </div>
            <div
              onClick={this.triggerInfoContent}
              className="body_cta_background_close">
            </div>
         </div>
         </SlideDown>
     )
   };

   toggleOnHoverCallCTA = (id) => {

     let {infoCmsData} = this.state;
     let {selectedlan} = this.state;

     let selectedLanHeadlines = `headlines_${selectedlan}`;
     let selectedLanPara = `paragraph_${selectedlan}`;


     this.setState({
       toggleOnHoverCallCTA: !this.state.toggleOnHoverCallCTA
     }, () => {

       let selectedSpan = document.getElementById(id);
       console.log(selectedSpan, "heere");

       if(this.state.toggleOnHoverCallCTA){
         selectedSpan.innerHTML = "<p>(514) 577 1553</p>"
       }else{
         selectedSpan.innerHTML = infoCmsData[1][selectedLanHeadlines]
       }
     })
   }


   renderFooter = () => {

     let {infoCmsData} = this.state;
     let {selectedlan} = this.state;

     let selectedLanHeadlines = `headlines_${selectedlan}`;
     let selectedLanPara = `paragraph_${selectedlan}`;


     if(!this.state.isDisplayFooter){
       return null;
     }
     return (
       <footer className="footer_desktop">
          <div className="footer_desktop_first">
            <h1>{infoCmsData[4][selectedLanHeadlines]}</h1>
          </div>
            <div className="footer_cta">
              <a>
              <div
                id="footer"
                onMouseEnter={() => this.toggleOnHoverCallCTA("footer")}
                onMouseLeave={() => this.toggleOnHoverCallCTA("footer")}>
                  {infoCmsData[1][selectedLanHeadlines]}
              </div>
              </a>
              <a
                href={"mailto:" + infoCmsData[2][selectedLanPara]}
                rel="noopener"
                target="_blank">
              <div>
                {infoCmsData[2][selectedLanHeadlines]}
              </div>
              </a>
            <a
              href={infoCmsData[3][selectedLanPara]}
              rel="noopener"
              target="_blank">
            <div>
              {infoCmsData[3][selectedLanHeadlines]}
            </div>
            </a>
          </div>
          <span className="copyright">
              « Very Interesting » ©2021
          </span>
       </footer>
     )
   }



  render() {
    if(!this.state.dataToDivs){
      <div className="loading_screen">
        <h1>LOADING</h1>
      </div>
    }

    return (
      <div className="main_vertical_container">
        {this.renderInfo()}
        {this.renderDivsToDom()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default Desktop;
