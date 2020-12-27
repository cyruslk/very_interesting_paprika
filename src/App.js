import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
      // Useless to define more properties here,
      // since the rest will be defined later, on img load.
      // If the image never loads, those will be useless anyway...
      // Except if you plan on checking from another component.
    };
  }
  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
  }

  handleImageLoaded = () => {
    let imgContainer = document.querySelector(".img_container");
    let img = document.querySelector(".img_container img");
    let currentImgHeight = img.getBoundingClientRect().height;
    imgContainer.style.height = currentImgHeight + "px";

    let scrollHeight = document.documentElement.scrollHeight;
    let viewportHeight = window.innerHeight;

    let newState = {
      loaded: true,

      // Values
      viewportHeight,
      scrollHeight,
      scrollable: scrollHeight - viewportHeight,
      currentImgHeight,
      maxScale: viewportHeight / currentImgHeight,
      scrollTop: 0,

      // Elements - Save them! It will useless DOM queries in the scroll handler.
      imgContainer,
      img
    };

    console.log("This is the state on image load.");
    console.log(newState);

    this.setState(newState);
  };

  scrollHandler = () => {
    let state = this.state;

    if (!state.loaded) {
      return;
    }

    // Get values and elements from the state
    // This only is for below code readabillity
    let scrollable = state.scrollable;
    let maxScale = state.maxScale;
    let imgContainer = state.imgContainer;
    let img = state.img;

    // Calculate a new scaling based on scrollTop
    let scrollTop = document.documentElement.scrollTop;
    let newScale = scrollable / (scrollable + 1 - scrollTop);

    // Apply if below the maxScale limit
    let scale = newScale > maxScale ? maxScale : newScale;
    img.style.transform = `scaleY(${scale.toFixed(3)})`;
    console.log("scale applied:", scale);

    // Get the new image height after the scaling
    // And update its container height
    let currentImgHeight = img.getBoundingClientRect().height;
    imgContainer.style.height = currentImgHeight + "px";

    // If you wish to have the currentImgHeight updated
    // and the scrollTop value
    // in the state (optionnal here, since unused yet)
    let newState = { ...state, currentImgHeight, scrollTop };
    console.log("New state:", newState);
    this.setState(newState);
  };

  render() {
    return (
      <div className="main_container">
        <div className="main_container_inner">
          <div className="img_container">
            <img
              onLoad={this.handleImageLoaded}
              src="https://bit.ly/38xHzMk"
              alt="XXI"
            />
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
