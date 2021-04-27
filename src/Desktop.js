import React from "react";
import "react-slidedown/lib/slidedown.css";
import parse from 'html-react-parser';
import {SlideDown} from 'react-slidedown';
import ScrollSnap from 'scroll-snap'
import ReactHtmlParser from 'react-html-parser';
import "./App.css";
import 'react-slidedown/lib/slidedown.css';

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
      mainCmsDataSubArrays: null,
      dataToDivs: null,
      isTriggeredInfoContent: false,
      mainCmsData: null,
      infoCmsData: null,
      scroll: 0,
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

    let firstSvg = document.querySelector(`#container_div_0 svg`);
    let firstContainer = document.getElementById("container_div_0");

    let secondSvg = document.querySelector(`#container_div_1 svg`);
    let secondContainer = document.getElementById("container_div_1");

    let thirdSvg = document.querySelector(`#container_div_2 svg`);
    let thirdContainer = document.getElementById("container_div_2");


    const {
      selectedDivId,
      viewportHeight, 
      viewportWidth,
      loaded} = this.state;


    if(!window.pageYOffset
       && firstContainer
       && viewportHeight){

        firstSvg.style.height = "101vh"
        secondSvg.style.height = "101vh"
        thirdSvg.style.height = "103vh"

        firstContainer.style.height = `${this.state.viewportHeight}px`;
        secondContainer.style.height = `${this.state.viewportHeight}px`;
        thirdContainer.style.height = `${this.state.viewportHeight}px`;

    
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

  
      let firstImg = document.querySelector(`#container_div_0 svg`);
      let firstContainer = document.getElementById("container_div_0");
  
      let secondImg = document.querySelector(`#container_div_1 svg`);
      let secondContainer = document.getElementById("container_div_1");
  
      let thirdImg = document.querySelector(`#container_div_2 svg`);
      let thirdContainer = document.getElementById("container_div_2");


      if(selectedDivId === 1){

        firstImg.style.height = "101vh"
        firstContainer.style.height = `${this.state.viewportHeight}px`;

        thirdImg.style.height = "103vh"
        thirdContainer.style.height = `${this.state.viewportHeight}px`;
        
      }

      if(selectedDivId === 2){

        firstImg.style.height = "101vh"
        firstContainer.style.height = `${this.state.viewportHeight}px`;

        secondImg.style.height = "101vh"
        secondContainer.style.height = `${this.state.viewportHeight}px`;

      }

      if(selectedDivId === 0){

        secondImg.style.height = "101vh"
        secondContainer.style.height = `${this.state.viewportHeight}px`;

        thirdImg.style.height = "103vh"
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
              window.scrollTo(0,0);
            }
          );
        } else {
          this.setState(
            {
              selectedlan: "fr"
            },
            () => {
              window.scrollTo(0,0);
            }
          );
        }
      }
    );
  };



  renderDataToDivs = selectedlan => {


    let mainCmsDataSubArraysFirstRow = this.state.mainCmsDataSubArrays[0];

    let imgArray = [
          <svg xmlns="http://www.w3.org/2000/svg" width="429" height="91.66" viewBox="0 0 429 91.66" preserveAspectRatio="none">
          <g id="Group_108" data-name="Group 108" transform="translate(-4172 11454.878)">
            <path id="R1" d="M338.868,66.533c-1.153-11.153-5.513-16.024-13.973-18.46v-.385c11.794-3.2,16.794-11.409,16.794-22.178C341.689,10.256,329.894,0,312.2,0H270.155V91.66h18.589V54.867h15c11.538,0,17.178,5.64,17.948,15.64.769,9.872,1.026,20.127,3.333,21.152h17.819v-.9C339.637,89.353,340.15,79.481,338.868,66.533ZM308.486,40.51H288.744V15H309c9.871,0,14.614,5.512,14.614,12.947C323.613,35.254,318.613,40.51,308.486,40.51Z" transform="translate(4116.31 -11454.878)"/>
            <rect id="I1" width="18.588" height="91.66" transform="translate(4573.756 -11454.878)"/>
            <path id="Y" d="M412.933,27.178c-2.692,5.512-6.153,13.076-6.153,13.076h-.256s-3.2-7.564-6.025-13.076L386.653,0H366.4l30.51,56.278V91.66H415.5V56.278L446.008,0H426.522Z" transform="translate(4096.471 -11454.878)"/>
            <g id="GUILLEMETS1" transform="translate(4172 -11434.238)">
              <path id="Path_71" data-name="Path 71" d="M0,66.753,18.46,83.8V67.65L8.2,58.549v-.256l10.256-9.1V32.781L0,49.832Z" transform="translate(0 -32.781)"/>
              <path id="Path_72" data-name="Path 72" d="M30.682,66.753,49.142,83.8V67.65l-10.256-9.1v-.256l10.256-9.1V32.781L30.682,49.832Z" transform="translate(-6.325 -32.781)"/>
            </g>
            <path id="V" d="M100.521,53.073c-1.795,5.9-3.974,14.615-3.974,14.615h-.256s-2.179-8.59-3.974-14.615L76.164,0H56.678l30.9,91.66H104.5L135.391,0H116.546Z" transform="translate(4160.316 -11454.878)"/>
            <path id="E1" d="M186.2,51.406h42.818V36.151H186.2V15.64h48.843V0H167.616V91.66h67.815V76.148H186.2Z" transform="translate(4137.447 -11454.878)"/>
            <rect id="Rectangle_58" data-name="Rectangle 58" width="4" height="4" transform="translate(4597 -11368)" fill="#fff"/>
          </g>
        </svg>,
     <svg xmlns="http://www.w3.org/2000/svg" width="418" height="91.66" viewBox="0 0 418 91.66" preserveAspectRatio="none">
     <g id="Group_109" data-name="Group 109" transform="translate(-4601 11454.878)">
       <path id="T" d="M657.385,15.64h27.562V91.66h18.588V15.64H731.1V0H657.385Z" transform="translate(4036.485 -11454.878)"/>
       <path id="N1" d="M605.509,48.074c0,6.41.513,15.9.513,15.9h-.256s-3.461-7.82-6.41-12.82L568.846,0H550V91.66h18.332v-47.3c0-6.41-.513-16.024-.513-16.024h.256s3.59,7.819,6.538,12.691l31.28,50.637h17.948V0H605.509Z" transform="translate(4058.622 -11454.878)"/>
       <path id="R2" d="M935.859,66.533c-1.154-11.153-5.512-16.024-13.973-18.46v-.385c11.793-3.2,16.793-11.409,16.793-22.178C938.68,10.256,926.886,0,909.2,0H867.147V91.66h18.588V54.867h15c11.537,0,17.178,5.64,17.948,15.64.768,9.872,1.025,20.127,3.333,21.152h17.82v-.9C936.629,89.353,937.141,79.481,935.859,66.533ZM905.478,40.51H885.735V15H905.99c9.871,0,14.614,5.512,14.614,12.947C920.6,35.254,915.6,40.51,905.478,40.51Z" transform="translate(3993.245 -11454.878)"/>
       <path id="E3" d="M993.441,51.406h42.818V36.151H993.441V15.64h48.843V0H974.853V91.66h67.816V76.148H993.441Z" transform="translate(3971.042 -11454.878)"/>
       <path id="E2" d="M783.2,51.406h42.818V36.151H783.2V15.64h48.842V0h-67.43V91.66h67.815V76.148H783.2Z" transform="translate(4014.383 -11454.878)"/>
       <rect id="Rectangle_61" data-name="Rectangle 61" width="4" height="4" transform="translate(5015 -11368)" fill="#fff"/>
       <rect id="Rectangle_59" data-name="Rectangle 59" width="4" height="4" transform="translate(4601 -11368)" fill="#fff"/>
     </g>
   </svg>,
   <svg xmlns="http://www.w3.org/2000/svg" width="433" height="93.711" viewBox="0 0 433 93.711" preserveAspectRatio="none">
     <g id="Group_111" data-name="Group 111" transform="translate(-5019 11454.878)">
       <g id="Group_110" data-name="Group 110" transform="translate(4172 -11455.045)">
         <path id="Path_94" data-name="Path 94" d="M1378.836,48.074c0,6.41.513,15.9.513,15.9h-.256s-3.461-7.82-6.41-12.82L1342.173,0h-18.845V91.66h18.332v-47.3c0-6.41-.513-16.024-.513-16.024h.256s3.589,7.819,6.537,12.691l31.28,50.637h17.947V0h-18.332Z" transform="translate(-272.793 0.167)"/>
         <path id="Path_95" data-name="Path 95" d="M1478.315,57.3h22.05v.513c0,10.128-9.358,20.768-23.588,20.768-15.768,0-25.639-13.717-25.639-32.434,0-18.2,8.589-32.562,25.9-32.562,11.794,0,18.589,6.41,20.64,15.256h18.2C1513.582,14.878,1505.074,4.1,1490.54,0h-27.585a38.668,38.668,0,0,0-15.791,8.717c-9.614,8.845-15,22.178-15,37.433,0,13.846,4.358,25.639,11.922,34.1,7.563,8.333,18.332,13.332,32.177,13.332,10.9,0,19.486-3.718,25.768-14.229h.256l.641,12.306H1516.9V42.945h-38.587Z" transform="translate(-295.229 0.167)"/>
         <g id="Group_15" data-name="Group 15" transform="translate(1237.183 20.807)">
           <path id="Path_76" data-name="Path 76" d="M1558.443,48.934l10.256,9.1v.256l-10.256,9.1V83.8l18.46-17.05V49.832l-18.46-17.051Z" transform="translate(-1558.443 -32.781)"/>
           <path id="Path_78" data-name="Path 78" d="M1589.125,32.781V48.934l10.256,9.1v.256l-10.256,9.1V83.8l18.46-17.05V49.832Z" transform="translate(-1564.768 -32.781)"/>
         </g>
         <rect id="Rectangle_34" data-name="Rectangle 34" width="18.588" height="91.66" transform="translate(1015.667 0.167)"/>
         <path id="Path_96" data-name="Path 96" d="M1172.022,15.64h27.563V91.66h18.588V15.64h27.562V0h-73.713Z" transform="translate(-241.604 0.167)"/>
         <path id="Path_93" data-name="Path 93" d="M1112.442,36.407c-13.588-2.948-20-5.128-20-12.563,0-6.538,6.537-10.769,16.537-10.769,9.487,0,16.665,4.615,17.691,13.846h17.819C1143.412,12.8,1135.356,3.569,1122.4,0h-27.069c-12.919,3.424-21.348,12.1-21.348,25.767,0,19.1,15,23.46,31.408,27.178,13.973,3.2,22.69,5,22.69,13.973,0,8.461-8.332,11.794-17.819,11.794-13.076,0-19.357-4.358-20.639-15.383h-18.2c.641,19.357,14.743,30.383,39.613,30.383,20.64,0,35.638-10.384,35.638-28.973C1146.669,45,1131.286,40.51,1112.442,36.407Z" transform="translate(-220.864 0.167)"/>
       </g>
       <rect id="Rectangle_62" data-name="Rectangle 62" width="1" height="2" transform="translate(5019 -11367)" fill="#fff"/>
     </g>
   </svg>,
  ]

    let dataToDivs = imgArray.map((ele, index) => {
      let divID = `container_div_${index}`;
      let selectedLanHeadlines = `headlines_${selectedlan}`;
      let selectedLanPara = `paragraph_${selectedlan}`;
      let imgID = `svg_${index}`;

      let parsedH = mainCmsDataSubArraysFirstRow[index][selectedLanHeadlines];
      let parsedP = mainCmsDataSubArraysFirstRow[index][selectedLanPara];

      return (
        <div className="main_vertical_container_inner">
          <div id={divID} className="svgs_containers">
           {imgArray[index]}
          </div>
          <div className="text_container">
            <h1 className="div_text_h1">
              {parse(parsedH)}
            </h1>
            <p className="div_text_p">
             {parse(parsedP)}
            </p>
          </div>
        </div>
      );
    });
    this.setState({
      dataToDivs
    });
  };


  scrollHandler = event => {
    
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;


    this.setState({
      scroll: numberOfPixelScrolled
    });

    if (numberOfPixelScrolled > 0 && numberOfPixelScrolled < viewportHeight*0.5) {
      this.setState(
        {
          counter: 0,
          selectedDivId: 0,
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
    let selectedSvg = document.querySelector(`#${divID} svg`);
    let numberOfPixelScrolled = window.scrollY;
    let halfViewportHeight = this.state.viewportHeight/2;

    // to change;
    let originalImageHeight = 101


    let scrolledPorcentage = this.definePorcentage(
      numberOfPixelScrolled - this.state.counter * halfViewportHeight,
      halfViewportHeight
    );

    let remainingScrollPorcentage = 100 - scrolledPorcentage;

    let svgHeightValueUp = this.defineValueFromPorcentage(
      remainingScrollPorcentage,
      originalImageHeight
    );
    
    let svgHeightValueDown = this.defineValueFromPorcentage(
      scrolledPorcentage,
      originalImageHeight
    );

    if(animDirection === "up"){

      selectedSvg.style.height = `${svgHeightValueUp}vh`
      let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";

      console.log(svgHeightValueUp, "up");

      if(svgHeightValueUp > 92){
        selectedSvg.style.height = `101vh`
        let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
      }


      if(svgHeightValueUp < 12){
        selectedSvg.style.height = `12vh`
        let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
      }

    }
    if(animDirection === "down"){

      selectedSvg.style.height = `${svgHeightValueDown}vh`
      let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";

      console.log(svgHeightValueDown, "down");

      if(svgHeightValueDown > 92){
        selectedSvg.style.height = `101vh`
        let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
      }

      if(svgHeightValueDown < 12){
        selectedSvg.style.height = `12vh`
        let newImgContainerHeight = selectedSvg.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";
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

  renderDivsToDomDesktop = () => {
    if (!this.state.dataToDivs) {
      return "loading";
    } else {
      return this.state.dataToDivs;
    }
  };

  renderInfoDesktop = () => {
    if (!this.state.infoCmsData) {
      return null;
    }
    return (
      <div className="info_main_container">
        {this.renderInfoDesktopCTA()}
        {this.renderDesktopBodyCTA()}
      </div>
    );
  };

  renderInfoDesktopCTA = () => {
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

  renderDesktopBodyCTA = () => {
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

  renderFooterDesktop = () => {
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

  renderTextSimplerVersion = () => {

    const {
      loaded, 
      mainCmsData, 
      selectedlan,
      infoCmsData
    } = this.state;

    if(!mainCmsData 
      || !loaded){
      return null;
    }

    let selectedLanPara = `paragraph_${selectedlan}`;
    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let simplerVersionCopy = mainCmsData.slice(0, 9);
    let simplerVersionCopyMaped = simplerVersionCopy
    .map((ele, index) => {

      let id = `vertical_text_content_${index}`;


      if(index === 0){
        return (
          <section id={id} 
          className="section vertical_text_content">
            <div className="slideInUp">
              <h1>{ReactHtmlParser(ele[selectedLanHeadlines])}</h1>
              <p>{ReactHtmlParser(ele[selectedLanPara])}</p>
            </div>
          </section>
        )
      }else{
        return (
          <section id={id} className="section vertical_text_content">
            <div>
              <h1>{ReactHtmlParser(ele[selectedLanHeadlines])}</h1>
              <p>{ReactHtmlParser(ele[selectedLanPara])}</p>
            </div>
          </section>
        )
      }
    })

    return(
      <main className="vertical_content_main">
        <div className="snap_section">
          {simplerVersionCopyMaped}
          <footer className="section">
            <div className="vertical_text_content footer_mobile">
              <h1>{infoCmsData[4][selectedLanHeadlines]}</h1>
              <a
                href={"tel:" + infoCmsData[1][selectedLanPara]}
                rel="noopener"
                target="_blank">
              <span>
                {infoCmsData[1][selectedLanHeadlines]}
              </span>
              </a>
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
                <div className="copyright">
                  <p>« VERY INTERESTING » ©2021</p>
                </div>
                  </div>
            </footer>
        </div> 
      </main>
    )
  }


  render() {
    return (
        <main className="main_vertical_container">
          {this.renderInfoDesktop()}
          {this.renderDivsToDomDesktop()}
          {this.renderFooterDesktop()}
        </main>
    );
  }
}

export default Desktop;
