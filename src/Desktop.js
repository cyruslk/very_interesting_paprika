import React from "react";
import {SlideDown} from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import mockData from "./mock_data.js";
import "./App.css";

import very from './img/very.svg'; 
import intere from './img/ntere.svg'; 
import sting from './img/sting.svg'; 

const parse = require('html-react-parser');


class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOnHoverCallCTA: false,
      toggleEN: false,
      isClosedInfoPanel: true,
      selectedlan: "fr",
      loaded: true,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
      updatedHeightOfPage: null,
      viewportHeight: null,
      viewportWidth: null,
      mockData: null,
      mainCmsDataSubArrays: null,
      dataToDivs: null,
      originalImageHeight: null,
      originalImageWidth: null,
      originalImageStretch: null,
      isTriggeredInfoContent: false,
      mainCmsData: null,
      infoCmsData: null,
      scroll: 0,
      originalImageStretchArray: []
    };
  }

  componentDidMount() {

    document.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);
    let {cmsData} = this.props;
    let mainCmsData = cmsData.slice(0, 9);
    let infoCmsData = cmsData.slice(9, 14);

    let viewportHeight = window.innerHeight;
    let viewportWidth = this.props.viewportWidth;

    let updatedHeightOfPage = viewportHeight * 8.5;
    document.body.style.height = `${updatedHeightOfPage}px`;

    this.setState(
      {
        updatedHeightOfPage,
        viewportHeight,
        viewportWidth,
        mockData,
        mainCmsData,
        infoCmsData
      },
      () => {
        // Slice the data in chops for panels;
        let {mainCmsData} = this.state;
        let mainCmsDataSubArrays = [
          mainCmsData.slice(0, 3),
          mainCmsData.slice(3, 6),
          mainCmsData.slice(6, 9)
        ];
        this.setState(
          {
            mainCmsDataSubArrays
          },
          () => {
            // Once this chop is done, format these to divs;
            this.renderDataToDivs(this.state.selectedlan);
          }
        );
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {

    // Get these images and their divs here; 
    // or a hard block when the user reaches
    // the bottom of the viewportHeight;

    let firstImg = document.querySelector(`#container_div_0 img`);
    let firstContainer = document.getElementById("container_div_0");

    let secondImg = document.querySelector(`#container_div_1 img`);
    let secondContainer = document.getElementById("container_div_1");

    let thirdImg = document.querySelector(`#container_div_2 img`);
    let thirdContainer = document.getElementById("container_div_2");


    const {
      originalImageStretchArray, 
      selectedDivId,
      viewportHeight, 
      viewportWidth,
      loaded} = this.state;


    if(!window.pageYOffset
      && firstImg
      && originalImageStretchArray
      && viewportHeight){

        firstContainer.style.height = `${this.state.viewportHeight}px`;
        secondContainer.style.height = `${this.state.viewportHeight}px`;
        thirdContainer.style.height = `${this.state.viewportHeight}px`;


            firstImg.style.transform = `scaleY(${originalImageStretchArray[0]})`
            secondImg.style.transform = `scaleY(${originalImageStretchArray[1]})`;
            thirdImg.style.transform = `scaleY(${originalImageStretchArray[2]})`;
    
    }

    let counter = this.state.counter;
    let divTextH1 = [...document.getElementsByClassName("div_text_h1")];
    let divTextP = [...document.getElementsByClassName("div_text_p")];

    let {mainCmsDataSubArrays, selectedlan} = this.state;

    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

    if (selectedlan !== prevState.selectedlan) {
      window.scrollTo(0, 0);
    }

    if (counter !== prevState.counter) {
      if (counter >= 0 && counter < 6) {

        this.setState({
          isDisplayFooter: false
        });

        let mainCmsDataSubArraysFirstRow = mainCmsDataSubArrays[0];

        divTextH1.map((ele, index) => {
          ele.innerHTML =
            mainCmsDataSubArraysFirstRow[index][selectedLanHeadlines];
        });
        divTextP.map((ele, index) => {
          ele.innerHTML = mainCmsDataSubArraysFirstRow[index][selectedLanPara];
        });

      }

      if (counter >= 6 && counter < 12) {
        this.setState({
          isDisplayFooter: false
        });

        let mainCmsDataSubArraysSecondRow = mainCmsDataSubArrays[1];

        divTextH1.map((ele, index) => {
          ele.innerHTML =
            mainCmsDataSubArraysSecondRow[index][selectedLanHeadlines];
        });
        divTextP.map((ele, index) => {
          ele.innerHTML = mainCmsDataSubArraysSecondRow[index][selectedLanPara];
        });
      }


      if (counter === 12) {

        let valueForFooter;

        if(viewportHeight > 2000){
          valueForFooter = this.defineValueFromPorcentage(14, this.state.updatedHeightOfPage);
        }else{
          valueForFooter = this.defineValueFromPorcentage(12, this.state.updatedHeightOfPage);
        }


        window.onscroll = ev => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - valueForFooter
          ) {
            this.setState({
              isDisplayFooter: true
            });
          } else {
            this.setState({
              isDisplayFooter: false
            });
          }
        };

        let mainCmsDataSubArraysThirdRow = mainCmsDataSubArrays[2];

        divTextH1.map((ele, index) => {
          ele.innerHTML =
            mainCmsDataSubArraysThirdRow[index][selectedLanHeadlines];
        });
        divTextP.map((ele, index) => {
          ele.innerHTML = mainCmsDataSubArraysThirdRow[index][selectedLanPara];
        });
      }
    }

    if(selectedDivId !== prevState.selectedDivId){

  
      let firstImg = document.querySelector(`#container_div_0 img`);
      let firstContainer = document.getElementById("container_div_0");
  
      let secondImg = document.querySelector(`#container_div_1 img`);
      let secondContainer = document.getElementById("container_div_1");
  
      let thirdImg = document.querySelector(`#container_div_2 img`);
      let thirdContainer = document.getElementById("container_div_2");


      if(selectedDivId === 1){

        firstImg.style.transform = `scaleY(${originalImageStretchArray[0]})`;
        firstContainer.style.height = `${this.state.viewportHeight}px`;

        thirdImg.style.transform = `scaleY(${originalImageStretchArray[2]})`;
        thirdContainer.style.height = `${this.state.viewportHeight}px`;
        
      }

      if(selectedDivId === 2){

        firstImg.style.transform = `scaleY(${originalImageStretchArray[0]})`;
        firstContainer.style.height = `${this.state.viewportHeight}px`;

        secondImg.style.transform = `scaleY(${originalImageStretchArray[1]})`;
        secondContainer.style.height = `${this.state.viewportHeight}px`;

      }

      if(selectedDivId === 0){

        secondImg.style.transform = `scaleY(${originalImageStretchArray[1]})`;
        secondContainer.style.height = `${this.state.viewportHeight}px`;

        thirdImg.style.transform = `scaleY(${originalImageStretchArray[2]})`;
        thirdContainer.style.height = `${this.state.viewportHeight}px`;

      }


    }
  }

  toggleEN = () => {
    this.setState(
      {
        toggleEN: !this.state.toggleEN,
      },
      () => {
        if (this.state.toggleEN) {
          this.setState(
            {
              selectedlan: "en"
            },
            () => {
              this.renderDataToDivs(this.state.selectedlan);
            }
          );
        } else {
          this.setState(
            {
              selectedlan: "fr"
            },
            () => {
              this.renderDataToDivs(this.state.selectedlan);
            }
          );
        }
      }
    );
  };


  handleImageLoaded = (divID, index) => {
    let divId = `container_div_${index}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);

    let viewportHeight = this.state.viewportHeight;
    let aligningThirdDiv = this.defineValueFromPorcentage(2.2, viewportHeight);
    let originalImageHeight = img.getBoundingClientRect().height;
    let originalImageWidth = img.getBoundingClientRect().width;

    let originalImageStretch = (viewportHeight + 1.4 * aligningThirdDiv) / originalImageHeight;
    console.log(originalImageStretch);
  
      this.setState({
        originalImageHeight,
        originalImageStretch,
        originalImageWidth,
        originalImageStretchArray : [
            ...this.state.originalImageStretchArray,
            originalImageStretch
        ]
      }, () => {
  
        const {
          originalImageStretchArray
        } = this.state;
  
        if(originalImageStretchArray.length === 3){
          
         let firstImg = document.querySelector(`#container_div_0 img`);
        let firstContainer = document.getElementById("container_div_0");
  
        let secondImg = document.querySelector(`#container_div_1 img`);
        let secondContainer = document.getElementById("container_div_1");
  
        let thirdImg = document.querySelector(`#container_div_2 img`);
        let thirdContainer = document.getElementById("container_div_2");
  
        firstImg.style.transform = `scaleY(${originalImageStretchArray[0]})`

        firstContainer.style.height = `${this.state.viewportHeight}px`;
        secondContainer.style.height = `${this.state.viewportHeight}px`;
        thirdContainer.style.height = `${this.state.viewportHeight}px`;


        }
      });
  };


  renderDataToDivs = selectedlan => {
    let mainCmsDataSubArraysFirstRow = this.state.mainCmsDataSubArrays[0];

    let imgArray = [
      very,
      intere,
      sting
  ]

    let dataToDivs = imgArray.map((ele, index) => {
      let divID = `container_div_${index}`;
      let selectedLanHeadlines = `headlines_${selectedlan}`;
      let selectedLanPara = `paragraph_${selectedlan}`;
      let imgID = `svg_${index}`;

      return (
        <div className="main_vertical_container_inner">
          <div id={divID} className="svgs_containers">
            <img
              className="svgs"
              onLoad={() => {
                this.handleImageLoaded(divID, index);
              }}
              id={imgID}
              src={imgArray[index]}
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
      );
    });
    this.setState({
      dataToDivs
    });
  };

  resizeHandler = () => {

    const {
      selectedDivId,
      counter,
      originalImageWidth,
      originalImageHeight
    } = this.state;

    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    this.setState(
      {
        viewportHeight,
        viewportWidth
      },
      () => {
        let svgs = [...document.getElementsByClassName("svgs")];
        let svgContainers = [...document.getElementsByClassName("svgs_containers")];

        // here;
        svgs.map((ele, index) => {
          if(
            index === selectedDivId
            || counter > 11){
            return;
          }else{

            // here;
            svgContainers[index].style.height = `${viewportHeight}px`;
            let divID = `container_div_${index}`;
            let newWidth = document.getElementById(divID).getBoundingClientRect().width;
            let aligningThirdDiv = this.defineValueFromPorcentage(2.2, viewportHeight);
            let newHeight = newWidth/originalImageWidth*originalImageHeight;
            let newImgStretch = (viewportHeight + 1.4 * aligningThirdDiv) / newHeight;
            ele.style.transform = `scaleY(${newImgStretch})`;

          }
        })
      }
    );
  };


  // scrollHandler here;
  scrollHandler = event => {
    
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;

    if (!this.state.originalImageStretch
      || !this.state.loaded) {
      return null;
    }

    this.setState({
      scroll: numberOfPixelScrolled
    });

    if (numberOfPixelScrolled > 0 && numberOfPixelScrolled < viewportHeight*0.5) {
      this.setState(
        {
          counter: 0,
          selectedDivId: 0
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight*0.5 &&
      numberOfPixelScrolled < viewportHeight *1
    ) {
      this.setState(
        {
          counter: 1,
          selectedDivId: 0
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 1 &&
      numberOfPixelScrolled < viewportHeight * 1.5
    ) {
      this.setState(
        {
          counter: 2,
          selectedDivId: 1
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 1.5 &&
      numberOfPixelScrolled < viewportHeight * 2
    ) {
      this.setState(
        {
          counter: 3,
          selectedDivId: 1
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 2 &&
      numberOfPixelScrolled < viewportHeight * 2.5
    ) {

      this.setState(
        {
          counter: 4,
          selectedDivId: 2
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 2.5 &&
      numberOfPixelScrolled < viewportHeight * 3
    ) {

      this.setState(
        {
          counter: 5,
          selectedDivId: 2
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 3 &&
      numberOfPixelScrolled < viewportHeight * 3.5
    ) {

      this.setState(
        {
          counter: 6,
          selectedDivId: 0
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 3.5 &&
      numberOfPixelScrolled < viewportHeight * 4
    ) {

      this.setState(
        {
          counter: 7,
          selectedDivId: 0
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 4 &&
      numberOfPixelScrolled < viewportHeight * 4.5
    ) {
      this.setState(
        {
          counter: 8,
          selectedDivId: 1
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 4.5 &&
      numberOfPixelScrolled < viewportHeight * 5
    ) {
      this.setState(
        {
          counter: 9,
          selectedDivId: 1
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 5 &&
      numberOfPixelScrolled < viewportHeight * 5.5
    ) {

      this.setState(
        {
          counter: 10,
          selectedDivId: 2
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 5.5 &&
      numberOfPixelScrolled < viewportHeight * 6
    ) {
      this.setState(
        {
          counter: 11,
          selectedDivId: 2
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        }
      );
    }

    if (
      numberOfPixelScrolled > viewportHeight * 6 &&
      numberOfPixelScrolled < viewportHeight * 6.5
    ) {
      this.setState(
        {
          counter: 12,
          selectedDivId: 2
        },
        () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, 0, "up", true);
          this.handleAnimation(counter, 1, "up", true);
          this.handleAnimation(counter, 2, "up", true);
        }
      );
    }
  };

  handleAnimation = (counter, selectedDivId, animDirection, all) => {

    let divID = `container_div_${selectedDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight/2;
    let originalImageStretch = this.state.originalImageStretchArray[selectedDivId];

    if (!all) {

      let scrolledPorcentage = this.definePorcentage(
        numberOfPixelScrolled - this.state.counter * viewportHeight,
        viewportHeight
      );
      let remainingScrollPorcentage = 100 - scrolledPorcentage;
      let translateYPorcentageUp = this.defineValueFromPorcentage(
        remainingScrollPorcentage,
        originalImageStretch
      );
      let translateYPorcentageDown = this.defineValueFromPorcentage(
        scrolledPorcentage,
        originalImageStretch
      );

      if (animDirection === "up") {
        
        img.style.transform = `scaleY(${translateYPorcentageUp})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";


        let valueToForceBlock = originalImageStretch - 0.5;
        if(translateYPorcentageUp > valueToForceBlock){

          img.style.transform = `scaleY(${originalImageStretch})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
         
        }


        if (translateYPorcentageUp < 1) {
          if (selectedDivId === 0) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 1) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 2) {
            img.style.transform = `scaleY(1)`;
          }

          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }
      }

      if (animDirection === "down") {

      
        img.style.transform = `scaleY(${translateYPorcentageDown})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";

        let valueToForceBlock = originalImageStretch - 0.5;
        if(translateYPorcentageDown > valueToForceBlock){

          img.style.transform = `scaleY(${originalImageStretch})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
         
        }
        

        if (translateYPorcentageDown < 1) {
          if (selectedDivId === 0) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 1) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 2) {
            img.style.transform = `scaleY(1)`;
          }
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }
      }

    } else {

      let scrolledPorcentage = this.definePorcentage(
        numberOfPixelScrolled - this.state.counter * viewportHeight,
        viewportHeight
      );
      let remainingScrollPorcentage = 100 - scrolledPorcentage;
      let translateYPorcentageUp = this.defineValueFromPorcentage(
        remainingScrollPorcentage,
        originalImageStretch
      );
      let translateYPorcentageDown = this.defineValueFromPorcentage(
        scrolledPorcentage,
        this.state.originalImageStretchArray[3]
      );

      if (animDirection === "up") {


        img.style.transform = `scaleY(${translateYPorcentageUp})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";

        let valueToForceBlock = originalImageStretch - 0.2;
        if(translateYPorcentageUp > valueToForceBlock){

          img.style.transform = `scaleY(${originalImageStretch})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
         
        }

        if (translateYPorcentageUp < 1.8) {
          if (selectedDivId === 0) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 1) {
            img.style.transform = `scaleY(0.95)`;
          }
          if (selectedDivId === 2) {
            img.style.transform = `scaleY(1)`;
          }

          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }
      }
    }
  };


  definePorcentage = (percent, total) => {
    let porcentage = (percent / total) * 100;
    return porcentage;
  };

  defineValueFromPorcentage = (percentage, total) => {
    let value = (percentage / 100) * total
    return value;
  };

  renderDivsToDom = () => {
    if (!this.state.dataToDivs) {
      return "loading";
    } else {
      return this.state.dataToDivs;
    }
  };

  renderInfo = () => {
    if (!this.state.infoCmsData) {
      return null;
    }
    return (
      <div className="info_main_container">
        {this.renderInfoCTA()}
        {this.renderBodyCTA()}
      </div>
    );
  };

  renderInfoCTA = () => {
    return (
      <div className="cta_desktop_container">
        <div
          className="info_cta_container"
          onClick={this.triggerInfoContent}
          style={this.infoCTAStyle()}
        >
          <img src="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1612842534/paprika%20-%20very%20interesting/Croix.svg" />
        </div>
        <div onClick={this.toggleEN} className="en_cta">
          <span>{this.toggleENText()}</span>
        </div>
      </div>
    );
  };

  toggleENText = () => {
    if (this.state.toggleEN) {
      return "FR";
    } else {
      return "EN";
    }
  };

  triggerInfoContent = () => {
    this.setState({
      isClosedInfoPanel: !this.state.isClosedInfoPanel
    });
  };

  infoCTAStyle = () => {
    if (this.state.isClosedInfoPanel) {
      return {
        transform: "rotate(0deg)",
        transitionTimingFunction: "ease-in-out",
        transition: "0.5s"
      };
    } else {
      return {
        transform: "rotate(135deg)",
        transitionTimingFunction: "ease-in-out",
        transition: "0.5s"
      };
    }
  };

  renderBodyCTA = () => {
    let {infoCmsData} = this.state;
    let {selectedlan} = this.state;
    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

    return (
      <SlideDown
        closed={this.state.isClosedInfoPanel}
        className={"my-dropdown-slidedown"}>
        <div id="info_body_container" className="info_body_container">
          <div className="info_body_container_headline">
            <h1>{infoCmsData[0][selectedLanHeadlines]}</h1>
          </div>
          <div className="info_body_container_ctas">
            <h1>{infoCmsData[0][selectedLanPara]}</h1>
            <div className="info_body_container_ctas_spans">
            <a>
              <span
                id="body"
                onMouseEnter={() => this.toggleOnHoverCallCTA("body")}
                onMouseLeave={() => this.toggleOnHoverCallCTA("body")}>
                {infoCmsData[1][selectedLanHeadlines]}
              </span>
              </a>
              <a
                href={"mailto:" + infoCmsData[2][selectedLanPara]}
                rel="noopener"
                target="_blank"
              >
                <span>{infoCmsData[2][selectedLanHeadlines]}</span>
              </a>
              <a
                href={infoCmsData[3][selectedLanPara]}
                rel="noopener"
                target="_blank"
              >
                <span>{infoCmsData[3][selectedLanHeadlines]}</span>
              </a>
            </div>
          </div>
          <div
            onClick={this.triggerInfoContent}
            className="body_cta_background_close"
          ></div>
        </div>
      </SlideDown>
    );
  };

  toggleOnHoverCallCTA = id => {
    let {infoCmsData} = this.state;
    let {selectedlan} = this.state;

    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

    this.setState(
      {
        toggleOnHoverCallCTA: !this.state.toggleOnHoverCallCTA
      },
      () => {
        let selectedSpan = document.getElementById(id);

        if (this.state.toggleOnHoverCallCTA) {
          selectedSpan.innerHTML = "<p>514 839-1839</p>";
        } else {
          selectedSpan.innerHTML = infoCmsData[1][selectedLanHeadlines];
        }
      }
    );
  };

  renderFooter = () => {
    let {infoCmsData} = this.state;
    let {selectedlan} = this.state;

    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

    if (!this.state.isDisplayFooter) {
      return null;
    }
    return (
      <footer className="footer_desktop">
        <div className="footer_desktop_first">
          <h1>{infoCmsData[4][selectedLanHeadlines]}</h1>
        </div>
        <div className="footer_cta_outer">
          <div className="footer_cta">
            <a>
              <div
                id="footer"
                onMouseEnter={() => this.toggleOnHoverCallCTA("footer")}
                onMouseLeave={() => this.toggleOnHoverCallCTA("footer")}
              >
                {infoCmsData[1][selectedLanHeadlines]}
              </div>
            </a>
            <a
              href={"mailto:" + infoCmsData[2][selectedLanPara]}
              rel="noopener"
              target="_blank"
            >
              <div>{infoCmsData[2][selectedLanHeadlines]}</div>
            </a>
            <a
              href={infoCmsData[3][selectedLanPara]}
              rel="noopener"
              target="_blank"
            >
              <div>{infoCmsData[3][selectedLanHeadlines]}</div>
            </a>
          </div>
          <div className="footer_copyright">
            <span className="copyright">« VERY INTERESTING » ©2021</span>
          </div>
        </div>
      </footer>
    );
  };


  render() {

    const { 
      originalImageStretchArray,
      scrollDirection,
      selectedDivId,
      viewportWidth,
    } = this.state;

    let style = {
      position: "fixed",
      top: 0,
      right: 0,
      backgroundColor: "yellow",
        }
    
    return (
        <div className="main_vertical_container">
          {this.renderInfo()}
          {this.renderDivsToDom()}
          {this.renderFooter()}
          <div style={style}>
            {selectedDivId} -
            {viewportWidth} -
            {originalImageStretchArray[0]} - 
            {originalImageStretchArray[1]} - 
            {originalImageStretchArray[2]}
          </div>
        </div>
    );
  }
}

export default Desktop;
