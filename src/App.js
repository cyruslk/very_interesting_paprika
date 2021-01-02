import React from "react";
import SvgSection from "./SvgSection";
import mock_data from "./mock_data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      scrollHeight: null,
      viewportHeight: null,
      svgSectionsToDom: null
    };
  }

  componentDidMount(){

    let scrollHeight = document.documentElement.scrollHeight;
    let viewportHeight = window.innerHeight;

    this.setState({
      scrollHeight,
      viewportHeight
    })

    let svgSectionsToDom = mock_data.entries
    .map((ele, index) => {
      return (
        <SvgSection
          content={ele}
          index={index}
          {...this.state}
        />
      )
    })

    this.setState({
      svgSectionsToDom
    })

  }


  render() {

    let state = this.state;

    if(!state.svgSectionsToDom){
      return (
        <div>
          loading screen here;
        </div>
      )
    }

    return (
      <div className="main_vertical_container">
          <SvgSection
              triggerOppositeDirection={this.triggerOppositeDirection}
              index={0}
              {...this.state}
            />
          <SvgSection
              triggerOppositeDirection={this.triggerOppositeDirection}
              index={1}
              {...this.state}
            />
          <SvgSection
              triggerOppositeDirection={this.triggerOppositeDirection}
              index={2}
              {...this.state}
            />
      </div>
    );
  }
}

export default App;
