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
      cmsData: null
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
          <Desktop {...this.state}/>
        </div>
      );
    }else{
      return (
        <div>
          <Mobile {...this.state}/>
        </div>
      );
    }
  }
}

export default App;
