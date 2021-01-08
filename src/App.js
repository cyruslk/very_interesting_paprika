import React from "react";
import Desktop from "./Desktop.js"
import SvgSection from "./SvgSection.js"
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {


    return (
      <div>
        <Desktop />
      </div>
    );
  }
}

export default App;
