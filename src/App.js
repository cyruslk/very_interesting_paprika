import React from "react";
import Tabletop from "tabletop";
import Desktop from "./Desktop.js";
import Mobile from "./Mobile.js";
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: null,
      mockData: mock_data,
      loaded: false,
      cmsData: null,
      toggleEN: false,
      mainCmsDataFR: null,
      mainCmsDataEN: null
    };
  }

  componentDidMount(){

    setTimeout(() => {
      this.setState({
        loaded: true
      });
    });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

      Tabletop.init({
      key: '1N5WFhAZpqz6Spgr6pQowDRJLmr_Ni99_sh95TCArGQ8',
      callback: googleData => {
        this.setState({
          cmsData: googleData
        }, () => {

          let {cmsData} = this.state;
          let mainCmsDataFR = cmsData
          .slice(0, 9)
          .map((ele, index) => {
            return {
              headlines: ele.headlines_fr,
              paragraph: ele.paragraph_fr
            }
          })

          let mainCmsDataEN = cmsData
          .slice(0, 9)
          .map((ele, index) => {
            return {
              headlines: ele.headlines_en,
              paragraph: ele.paragraph_en
            }
          })

          this.setState({
            mainCmsDataFR,
            mainCmsDataEN
          })

        })
      },
      simpleSheet: true
    })


    window.addEventListener("resize", this.resizeHandler);
    let viewportWidth = window.innerWidth;

    this.setState({
      viewportWidth
    });
  }


  resizeHandler = () => {

    let viewportWidth = window.innerWidth;
    this.setState({
      viewportWidth
    });
  }

  handleImageLoadedLoadingScreen = () => {

    let viewportHeight = window.innerHeight;

    let aligningThirdDiv = this.defineValueFromPorcentage(2, viewportHeight);
    let loadingImg = document.getElementById("loading_img");
    let loadingImgInitialHeight = loadingImg.getBoundingClientRect().height;
    let loadingImgStrech = (viewportHeight + 1.4 * aligningThirdDiv)/loadingImgInitialHeight;
    loadingImg.style.transform = `scaleY(${loadingImgStrech})`;

    // loadingImg.animate(
    //   [
    //     { transform: `scaleY(1)` },
    //     { transform: `scaleY(${loadingImgStrech})` },
    //   ], {
    //     duration: 500,
    //   }
    // );
  }

  defineValueFromPorcentage = (percentage, total) => {
    let value = (percentage * total) / 100;
    return value;
  };

  toggleEN = () => {
    this.setState({
      toggleEN: !this.state.toggleEN
    })
  }

  render() {

    let {mockData, viewportWidth, cmsData} = this.state;

    if(!cmsData || !this.state.loaded){
      return (
        <div className="loading_screen">
          <img
            id="loading_img"
            onLoad={this.handleImageLoadedLoadingScreen}
            src={mockData.loadingImg[0].img} />
        </div>
      )
    }

    if(viewportWidth > 600){
      return (
        <div>
          <Desktop
            toggleEN={this.toggleEN}
            {...this.state}/>
        </div>
      );
    }else{
      return (
        <div>
          <Mobile
            toggleEN={this.toggleEN}
            {...this.state}/>
        </div>
      );
    }
  }
}

export default App;
