import React from "react";
import { AnimateKeyframes }  from 'react-simple-animate';
import {SlideDown} from 'react-slidedown';
import ScrollSnap from 'scroll-snap'
import 'react-slidedown/lib/slidedown.css';
import ReactHtmlParser from 'react-html-parser';
import ScrollDirection from '@anakinyuen/scroll-direction';
import mockData from "./mock_data.js";
import "./App.css";


class Mobile extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      toggleEN: false,
      selectedlan: "fr",
      animDirection: null,
      isTriggeredInfoContent: false,
      numberOfPixelScrolled: 0,
      margin: 0,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
      updatedHeightOfPage: null,
      viewportHeight: null,
      viewportWidth: null,
      mockData: null,
      dataToDivs: null,
      mainCmsDataSubArrays: null,
      originalImageHeight: null,
      originalImageStretch: null,
      originalImageHeightArray: [],
      originalImageStretchArray: [],
      originalImageRatioArray: [],
      textDivSizeArray: [],
      screenHeightValuesArray: [],
      divsLastFold: null,
      resetTextDivs: false,
    };
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 1200);

    // this.bindScrollSnap()
    document.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);

    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    let {cmsData} = this.props;
    let mainCmsData = cmsData.slice(0, 9);
    let infoCmsData = cmsData.slice(9, 14);

    // Init the state here;
    let updatedHeightOfPage = viewportHeight;

    this.setState({
      updatedHeightOfPage,
      viewportHeight,
      viewportWidth,
      mockData,
      mainCmsData,
      infoCmsData
    })
  }

  toggleEN = () => {
    this.setState({
      toggleEN: !this.state.toggleEN,
      dataToDivs: null
    }, () => {
      if(this.state.toggleEN){
        this.setState({
          selectedlan: "en"
        })
      }else{
        this.setState({
          selectedlan: "fr"
        })
      }
    })
  }

  handleImageLoadedLoadingScreen = (imgID, index) => {

    const {
      originalImageStretch, 
      originalImageStretchArray, 
      viewportWidth
    } = this.state;

    
    let img = document.getElementById(imgID);

    let originalImageHeight = img.getBoundingClientRect().width;
    let loadingImgStrech = (viewportWidth/originalImageHeight)*1.02;


    img.animate(
      [
        { transform: `rotateZ(90deg) translate(100%) scaleY(${loadingImgStrech})` },
        { transform: `rotateZ(90deg) translate(100%) scaleY(1)` },
      ], {
        duration: 1500,
        easing: "ease",
      }
    );
  }



  resizeHandler = () => {

    const {
        selectedDivId,
        originalImageStretchArray,
        counter
      } = this.state;

      let imgMobileContainer = [...document.getElementsByClassName('img_mobile_container')];
      let imgMobile = [...document.getElementsByClassName("img_mobile")];
      let viewportHeight = window.innerHeight;

      imgMobileContainer.map((ele, index) => {
        ele.style.height = `${viewportHeight/2}px`;
      })
      imgMobile.map((ele, index) => {
        ele.style.width = `${viewportHeight/2}px`;
      })

      if(window.innerHeight !== this.state.viewportHeight){
        this.setState({
          viewportHeight: viewportHeight,
          originalImageWidth: viewportHeight/2
        })
      }

    }

  
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
  };

  renderBodyCTA = () => {

    let {infoCmsData} = this.state;
    let {selectedlan} = this.state;

    let selectedLanHeadlines = `headlines_${selectedlan}`;
    let selectedLanPara = `paragraph_${selectedlan}`;

    if(!this.state.isTriggeredInfoContent){
      return null;
    }

    return (
      <SlideDown className={'my-dropdown-slidedown'}>
      <div className="info_body_container">
         <div className="info_body_container_headline">
           <h1>{infoCmsData[0][selectedLanHeadlines]}</h1>
         </div>
         <div className="info_body_container_ctas">
           <h1>{infoCmsData[0][selectedLanPara]}</h1>
           <div className="info_body_container_ctas_spans">
               <a
                 href={"tel:" + infoCmsData[1][selectedLanPara]}
                 rel="noopener"
                 target="_blank">
               <span id="body">
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

  renderDataToDivsLoading = () => {
 
    let styleImg1 = {
      transform: `rotateZ(90deg) translate(100%) scaleY(1)`,
      width: `${this.state.viewportHeight}px`
    };

    return (
      <div className="loader_vertical_container_mobile">
        <div>
          <img
            id="loading_img_1"
            className="loading_img"
            style={styleImg1}
            onLoad={() => this.handleImageLoadedLoadingScreen("loading_img_1", 0)}
            src={mockData.loadingImg[0].img}
          />
        </div>
      </div>
    )
      
  }

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

    const {
      mainCmsData
    } = this.state;

    if(!mainCmsData){
      return null;
    }

    return (
      <main>
        {this.renderDataToDivsLoading()}
        {this.renderInfo()}
        {this.renderTextSimplerVersion()}
    </main>
      
    )
  }
}

export default Mobile;