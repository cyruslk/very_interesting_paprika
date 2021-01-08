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
      viewportHeight: null
    };
  }

  componentDidMount(){

    window.addEventListener("resize", this.resizeHandler);
    let viewportHeight = window.innerHeight;
    this.setState({
      viewportHeight
    });

  }


  resizeHandler = () => {

    let viewportHeight = window.innerHeight;
    this.setState({
      viewportHeight
    });

  }

  render() {

    let viewportHeight = this.state.viewportHeight;
    if(!viewportHeight){
      return "loading"
    }

    return (
      <div>
        {window.innerWidth > 550 ?
          <Desktop /> :
          <Mobile />
        }
      </div>
    );
  }
}

export default App;
