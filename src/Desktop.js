import React from "react";
import {SlideDown} from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import mockData from "./mock_data.js";
import "./App.css";

class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOnHoverCallCTA: false,
      toggleEN: false,
      isClosedInfoPanel: true,
      selectedlan: "fr",
      loaded: false,
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

    // removing for now;
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 1500);

    document.addEventListener("wheel", this.scrollHandler);
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
            this.renderDataToDivs(this.state.selectedlan);
          }
        );
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {


    let firstImg = document.querySelector(`#container_div_0 img`);
    let firstContainer = document.getElementById("container_div_0");

    const {originalImageStretchArray, viewportHeight, loaded} = this.state;


    if(!window.pageYOffset
      && firstImg
      && originalImageStretchArray
      && viewportHeight){

        firstImg.style.transform = `scaleY(${originalImageStretchArray[0]})`;
        firstContainer.style.height = `${this.state.viewportHeight}px`;
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
      if (counter >= 0 && counter < 3.5) {
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

      if (counter >= 3.5 && counter < 7) {
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

      if (counter === 7) {
        window.onscroll = ev => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500
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
  }

  toggleEN = () => {
    this.setState(
      {
        toggleEN: !this.state.toggleEN,
        dataToDivs: null
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
    let viewportHeight = this.state.viewportHeight;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);

    let aligningThirdDiv = this.defineValueFromPorcentage(2.2, viewportHeight);
    let originalImageHeight = img.getBoundingClientRect().height;
    let originalImageWidth = img.getBoundingClientRect().width;

    let originalImageStretch =
      (viewportHeight + 1.4 * aligningThirdDiv) / originalImageHeight;


    this.setState({
      originalImageHeight,
      originalImageStretch,
      originalImageWidth,
      originalImageStretchArray : [
          ...this.state.originalImageStretchArray,
          originalImageStretch
      ]
    }, () => {


      let imgStretch = this.state.originalImageStretchArray[index];
      imgContainer.style.height = viewportHeight + "px";
      img.style.transform = `scaleY(${imgStretch})`;

    });
  };


  handleImageLoadedLoadingScreen = () => {

    let viewportHeight = this.state.viewportHeight;
    let aligningThirdDiv = this.defineValueFromPorcentage(2, viewportHeight);
    let loadingImg = document.getElementById("loading_img");
    let loadingImgInitialHeight = loadingImg.getBoundingClientRect().height;

    let loadingImgStrech = (viewportHeight + 1.4 * aligningThirdDiv)/loadingImgInitialHeight;

    loadingImg.animate(
      [
        { transform: `scaleY(1)` },
        { transform: `scaleY(${loadingImgStrech})` },
      ], {
        duration: 1500,
        easing: "ease",
      }
    );

  }

  renderDataToDivs = selectedlan => {
    let mainCmsDataSubArraysFirstRow = this.state.mainCmsDataSubArrays[0];
    let dataToDivs = mockData.entriesImgDesktop.map((ele, index) => {
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
      );
    });
    this.setState({
      dataToDivs
    });
  };

  resizeHandler = () => {
    let viewportHeight = window.innerHeight;

    this.setState(
      {
        viewportHeight
      },
      () => {
        let svgs = [...document.getElementsByClassName("svgs")];
        let svgContainers = [
          ...document.getElementsByClassName("svgs_containers")
        ];

        svgs.map((ele, index) => {
          if (index === this.state.selectedDivId) {
            let heightSvg = ele.getBoundingClientRect().height;
            svgContainers[index].style.height = `${heightSvg}px`;
          } else {
            let divID = `container_div_${index}`;
            return this.handleResize(divID);
          }
        });
      }
    );
  };

  handleResize = divID => {

    const {
      viewportHeight,
      originalImageHeight,
      originalImageWidth
    } = this.state;

    let ratio = originalImageWidth/originalImageHeight;
    let newWidth = document.getElementById(divID).getBoundingClientRect().width;
    let aligningThirdDiv = this.defineValueFromPorcentage(2, viewportHeight);
    let newHeight = newWidth/originalImageWidth*originalImageHeight;

    let newImgStretch = (viewportHeight + 1.4 * aligningThirdDiv) / newHeight;

    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);
    img.style.transform = `scaleY(${newImgStretch})`;

    let imgHeighPx = img.getBoundingClientRect().height;
    document.getElementById(divID).style.height = `${imgHeighPx}px`;

  };

  // scrollHandler here;
  scrollHandler = event => {
    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;


    if (!this.state.originalImageStretch
      || !this.state.loaded) {
      return null;
    }

    let deltaY = event.deltaY;
    if (deltaY < 0) {
      this.setState({
        scrollDirection: "up"
      });
    } else {
      this.setState({
        scrollDirection: "down"
      });
    }

    // to force block divs;
    this.setState({
      scroll: numberOfPixelScrolled
    });

    if (numberOfPixelScrolled > 0 && numberOfPixelScrolled < viewportHeight*0.5) {
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightUp(this.state.selectedDivId);
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
      this.handleResetPreviousDivHeightDown(this.state.selectedDivId);
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
    let originalImageStretch = this.state.originalImageStretch;

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


        if (translateYPorcentageUp < 1) {
          if (selectedDivId === 0) {
            img.style.transform = `scaleY(1.035)`;
          }
          if (selectedDivId === 1) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 2) {
            img.style.transform = `scaleY(1.04)`;
          }

          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }
      }

      if (animDirection === "down") {
        img.style.transform = `scaleY(${translateYPorcentageDown})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";


        if (translateYPorcentageDown < 1) {
          if (selectedDivId === 0) {
            img.style.transform = `scaleY(1.035)`;
          }
          if (selectedDivId === 1) {
            img.style.transform = `scaleY(1)`;
          }
          if (selectedDivId === 2) {
            img.style.transform = `scaleY(1.04)`;
          }
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }
      }
    } else {


      // HERE;

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

        if (selectedDivId === 1) {
          let coeffScalDivId1 = (translateYPorcentageUp * 102) / 106;
          img.style.transform = `scaleY(${coeffScalDivId1})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }

        // 552 / 539 = rapport de la hauteur entre le S et le T
        if (selectedDivId === 2) {


          const {viewportWidth, viewportHeight} = this.state;

          // console.log(viewportWidth, viewportHeight);


          let coeffScalDivId2 = (translateYPorcentageUp * 548) / 539;
          const {originalImageStretchArray} = this.state;
          img.style.transform = `scaleY(${coeffScalDivId2})`;
          let newImgContainerHeight = img.getBoundingClientRect().height;
          imgContainer.style.height = newImgContainerHeight + "px";
        }

        if (translateYPorcentageUp < 1) {
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

      if (animDirection === "down") {

        img.style.transform = `scaleY(${translateYPorcentageDown})`;
        let newImgContainerHeight = img.getBoundingClientRect().height;
        imgContainer.style.height = newImgContainerHeight + "px";


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
    }
  };

  handleResetPreviousDivHeightDown = id => {
    let scrollDirection = this.state.scrollDirection;

    if (scrollDirection === "down") {
      let previousDivId = id;
      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      let originalImageStretch = this.state.originalImageStretchArray[previousDivId];

      img.style.transform = `scaleY(${originalImageStretch})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";


    } else {
      return null;
    }
  };

  handleResetPreviousDivHeightUp = id => {
    let scrollDirection = this.state.scrollDirection;

    if (scrollDirection === "down") {
      return null;
    } else {


      let previousDivId = id;
      let divID = `container_div_${previousDivId}`;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      let originalImageStretch = this.state.originalImageStretchArray[previousDivId];

      img.style.transform = `scaleY(${originalImageStretch})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";
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
        transition: "0.4s"
      };
    } else {
      return {
        transform: "rotate(135deg)",
        transitionTimingFunction: "ease-in-out",
        transition: "0.4s"
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
        className={"my-dropdown-slidedown"}
      >
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
                onMouseLeave={() => this.toggleOnHoverCallCTA("body")}
              >
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
          selectedSpan.innerHTML = "<p>(514) 577 1553</p>";
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

  displayLoadingScreen = () => {
    if (!this.state.loaded) {
      return (
        <div className="loading_screen">
          <img
            id="loading_img"
            onLoad={this.handleImageLoadedLoadingScreen}
            src={mockData.loadingImg[0].img} />
        </div>
      )
    }else{
      return null;
    }
  }

  render() {

    return (
        <div className="main_vertical_container">
          {this.displayLoadingScreen()}
          {this.renderInfo()}
          {this.renderDivsToDom()}
          {this.renderFooter()}
        </div>
    );
  }
}

export default Desktop;
