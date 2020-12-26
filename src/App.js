import React, { Component } from "react";
import './App.css';

class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    loaded: false,
    viewportHeight: null,
    scrollHeight: null,
    scrollable: null,
    currentImgHeight: null,
    maxScale: null
  };
}
  componentDidMount(){
    document.addEventListener("scroll", this.scrollHandler)
  }


  handleImageLoaded = () => {

    this.setState({
      loaded: true,
      viewportHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      scrollable: this.state.scrollHeight - this.state.viewportHeight
    }, () => {

      // to optimze as refs;
      let main_container = document.querySelector(".main_container");
      let imgContainer = document.querySelector(".img_container");
      let img = document.querySelector(".img_container img");
      let currentImgHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = currentImgHeight+"px";

      this.setState({
        currentImgHeight
      })
    })
  }

  scrollHandler = () => {

    let state = this.state;
    if(!state.loaded){
      return;
    }

    // to optimze as refs;
    let main_container = document.querySelector(".main_container");
    let imgContainer = document.querySelector(".img_container");

    let img = document.querySelector(".img_container img");

    let currentImgHeight = img.getBoundingClientRect().height;

    let newScale = state.scrollable/(state.scrollable + 1 - document.documentElement.scrollTop);
    let scale = (newScale>state.maxScale)?state.maxScale:newScale;
    img.style.transform = `scaleY(${scale.toFixed(3)})`
    imgContainer.style.height = currentImgHeight+"px"

  }


  render() {
    return (
      <div className="main_container">
        <div className="main_container_inner">
          <div className="img_container">
            <img
              onLoad={this.handleImageLoaded}
              src="https://bit.ly/38xHzMk" />
          </div>
          <div className="text_container">
            <h1>fvdfv</h1>
            <p>fvdfv</p>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
