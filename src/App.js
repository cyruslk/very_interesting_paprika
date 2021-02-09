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
      cmsData: null,
      toggleEN: false,
      mainCmsDataFR: null,
      mainCmsDataEN: null
    };
  }


  componentDidMount(){

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

  toggleEN = () => {
    alert("here")
    this.setState({
      toggleEN: !this.state.toggleEN
    })
  }

  render() {

    let {viewportWidth, cmsData} = this.state;

    if(!viewportWidth || !cmsData){
      return (
        <div className="loading_screen">
          <h1>LOADING</h1>
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
