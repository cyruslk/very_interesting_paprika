import React from "react";
import "./App.css";

class SvgSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loopCounter: 0,
      remainingScroll: null,
      translateYPercent: null,
      originalImageStretch: null
    };
  }
  componentDidMount() {

    let props = this.props;
    if(props.index === props.counter){
      document.addEventListener("scroll", this.scrollHandler);
    }else{
      return;
    }
  }



  handleImageLoaded = () => {


    // define the props here;
    let props = this.props;

    // get the scrollHeight and viewportHeight;
    let scrollHeight = this.props.scrollHeight;
    let viewportHeight = this.props.viewportHeight;

    // no need to repeat?
    let index = this.props.index;
    let divID = `container_div_${index}`;

    // retrieve the imgContainer and img;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);


    let imageOriginalHeight = img.getBoundingClientRect().height;
    let originalImageStretch = viewportHeight/imageOriginalHeight;
    imgContainer.style.height = viewportHeight + "px";
    img.style.transform = `scaleY(${originalImageStretch})`;

      this.setState({
        loaded: true,
        originalImageStretch,
        imgContainer,
        img
      })

  };

  scrollHandler = () => {

    // define the state and the props here;
    let state = this.state;
    let props = this.props;

    // if it has not been loaded, return;
    if (!state.loaded) {
      return;
    }

    // get the imgContainer and img from the state;
    let imgContainer = state.imgContainer;
    let img = state.img;

    // get the body to calculate the scroll;
    let body = document.body.parentNode;

    // what has been scrolled
    let bodyScroll = (
      body.scrollTop || body.scrollTop)
      / (body.scrollHeight - body.clientHeight
    ) * 100;

    // what need to be scrolled;
    let remainingScroll = 100 - bodyScroll;

    // get the % to operate on the image, descending;
    let translateYPercentDesc = this.definePorcentage(
        remainingScroll, state.originalImageStretch
    );

    // get the % to operate on the image, ascending;
    let translateYPercentAsc = this.definePorcentage(
        bodyScroll, state.originalImageStretch
    );


    let translateYPercentDescNumbered = Number(translateYPercentDesc);

    if(translateYPercentDescNumbered < 1){
      return this.props.triggerOppositeDirection;
    }

      // if the animation if the SvgSection one;
      img.style.transform = `scaleY(${translateYPercentDesc})`;
      let newImgContainerHeight = img.getBoundingClientRect().height;
      imgContainer.style.height = newImgContainerHeight + "px";


  };

   definePorcentage = (percent, total) => {
        return ((percent/ 100) * total).toFixed(2)
    }



  render() {
    if(!this.props){
      return null;
    }

  let index = this.props.index;
  let divID = `container_div_${index}`;


    return (
        <div className="main_vertical_container_inner">
          <div id={divID}>
            <img
              onLoad={this.handleImageLoaded}
              src="https://bit.ly/3nXBlMo"
              alt="XXI"
            />
          </div>
          <div className="text_container">
            <h1>SvgSection</h1>
            <p>fvdfv</p>
          </div>
        </div>
    );
  }
}

export default SvgSection;
