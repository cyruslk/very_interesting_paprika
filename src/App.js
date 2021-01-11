import React from "react";
import Desktop from "./Desktop.js";
import Mobile from "./Mobile.js";
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: null
    };
  }

  componentDidMount(){

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

    let viewportWidth = this.state.viewportWidth;
    if(!viewportWidth){
      return "loading"
    }

    console.log(viewportWidth);

    if(viewportWidth > 600){
      return (
        <div>
          <Desktop />
        </div>
      );
    }else{
      return (
        <div>
          <Mobile />
        </div>
      );
    }
  }
}

export default App;
