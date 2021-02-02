import React from "react";
import mockData from "./mock_data.js";
import "./App.css";

class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      counter: 0,
      selectedDivId: 0,
      scrollDirection: null,
      updatedHeightOfPage: null,
      viewportHeight: null,
      viewportWidth: null,
      mockData: null,
      dataToDivs: null,
      mockDataTextSubArrays: null,
      originalImageHeight: null,
      originalImageStretch: null,
      originalImageStretchArray: [],
      isTriggeredInfoContent: false,
      imagesMobileToDiv: null
    };
  }


  componentDidMount(){

     document.addEventListener("scroll", this.scrollHandler);
     window.addEventListener("resize", this.resizeHandler);


     let viewportHeight = window.innerHeight;
     let viewportWidth = window.innerWidth;


     let updatedHeightOfPage = viewportHeight*15;
     document.body.style.height = `${updatedHeightOfPage}px`;


     this.setState({
       updatedHeightOfPage,
       viewportHeight,
       viewportWidth,
       mockData,
     }, () => {

       let mockDataText = this.state.mockData.entriesText;


       let mockDataTextSubArrays = [
           mockDataText.slice(0, 2),
           mockDataText.slice(2, 4),
           mockDataText.slice(4, 6),
           mockDataText.slice(6, 8),
           mockDataText.slice(9,10),
       ];

       this.setState({
         mockDataTextSubArrays
       }, () => {
         this.renderDataToDivs();
       })
     })
   };


   renderDataToDivs = () => {

      let mockData = this.state.mockData;
      let dataToDivs = mockData.entriesMobile.map((ele, index) => {

        let divID = `container_mobile_div_${index}`;
        let divIDText = `container_mobile_text_${index}`;
        let divIDH1 = `container_mobile_div_h1_${index}`;
        let divIP = `container_mobile_div_p_${index}`;

        return (
          <div
            id={divID}
            className="img_mobile_container">
              <div
                  id={divIDText}
                  className="mobile_text_content">
                  <h1>
                    « Very Interesting » ajoute un élément de surprise, de joie, d’incongru.
                  </h1>
              </div>
              <img
                onLoad={() => {this.handleImageLoaded(divID)}}
                alt={ele.img}
                src={ele.img}
              />
          </div>
        )
      })
      this.setState({
        dataToDivs
      })
  };


  resizeHandler = () => {

  let viewportHeight = window.innerHeight;
  this.setState({
    viewportHeight
  })

}


  handleImageLoaded = (divID) => {
    this.setState({
      loaded: true
    }, () => {

      let viewportWidth = this.state.viewportWidth;

      let imgContainer = document.querySelector(`#${divID}`);
      let img = document.querySelector(`#${divID} img`);
      // because it's rotated();

      let originalImageHeight = img.getBoundingClientRect().width;
      let originalImageStretch = viewportWidth/originalImageHeight;
      img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${originalImageStretch})`;

      this.setState({
        originalImageHeight,
        originalImageStretch
      }, () => {
        // there's a bug here;
        // console.log(originalImageStretch);
      })

    })
  }


  // scrollHandler here;
  scrollHandler = (event) => {
    if(!this.state.originalImageStretch){
      return null;
    }

    let deltaY = event.deltaY;
    if (deltaY < 0){
      this.setState({
        scrollDirection: "up"
      })
    }else{
      this.setState({
        scrollDirection: "down"
      })
    }

    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;



    if (numberOfPixelScrolled > 0
      && numberOfPixelScrolled < viewportHeight) {


        this.setState({
          counter: 0,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight
      && numberOfPixelScrolled < viewportHeight*2) {


        this.setState({
          counter: 1,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*2
      && numberOfPixelScrolled < viewportHeight*3) {

        this.handleResetDivUp(0);

        this.setState({
          counter: 2,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*3
      && numberOfPixelScrolled < viewportHeight*4) {

        this.setState({
          counter: 3,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*4
      && numberOfPixelScrolled < viewportHeight*5) {

        this.handleResetDivUp(1);

        this.setState({
          counter: 4,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*5
      && numberOfPixelScrolled < viewportHeight*6) {

        this.setState({
          counter: 5,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*6
      && numberOfPixelScrolled < viewportHeight*7) {

        this.handleResetDivUp(0);

        this.setState({
          counter: 6,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*7
      && numberOfPixelScrolled < viewportHeight*8) {

        this.setState({
          counter: 7,
          selectedDivId: 1,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*8
      && numberOfPixelScrolled < viewportHeight*9) {

        this.handleResetDivUp(1);

        this.setState({
          counter: 8,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*9
      && numberOfPixelScrolled < viewportHeight*10) {

        this.setState({
          counter: 9,
          selectedDivId: 0,
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })

    }

    if (numberOfPixelScrolled > viewportHeight*10
      && numberOfPixelScrolled < viewportHeight*11) {

        this.handleResetDivUp(0);

        this.setState({
          counter: 10,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*11
      && numberOfPixelScrolled < viewportHeight*12) {

        this.setState({
          counter: 11,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, selectedDivId, "down");
        })
    }

    if (numberOfPixelScrolled > viewportHeight*12
      && numberOfPixelScrolled < viewportHeight*13) {

        this.setState({
          counter: 12,
          selectedDivId: 1
        }, () => {
          let counter = this.state.counter;
          let selectedDivId = this.state.selectedDivId;
          this.handleAnimation(counter, 0, "up");
          this.handleAnimation(counter, selectedDivId, "up");
        })
    }
  };

  handleAnimation = (counter, selectedDivId, animDirection, single) => {


    // div for img;
    let divID = `container_mobile_div_${selectedDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);

    // div for text;
    let divTextID = `container_mobile_text_${selectedDivId}`;
    let divText = document.querySelector(`#${divTextID}`);


    let numberOfPixelScrolled = window.scrollY;
    let viewportHeight = this.state.viewportHeight;

    let originalImageStretch = this.state.originalImageStretch;

    // to optimize;
    let divTextOriginalOffset = -80;

    let scrolledPorcentage = this.definePorcentage(
     (numberOfPixelScrolled - this.state.counter * viewportHeight), viewportHeight
    );

   let remainingScrollPorcentage = 100-scrolledPorcentage;

   let translateYPorcentageUp = this.defineValueFromPorcentage(
       remainingScrollPorcentage,
       originalImageStretch
   );


   let translateYPorcentageDown = this.defineValueFromPorcentage(
       scrolledPorcentage,
       originalImageStretch
   );

   let textLeftUp = this.defineValueFromPorcentage(
       remainingScrollPorcentage,
       80
   );

   let textLeftDown = this.defineValueFromPorcentage(
       scrolledPorcentage,
       80
   );


   if(animDirection === "up"){

     img.style.transform = `
        rotateZ(90deg)
        translate(100%)
        scaleY(${translateYPorcentageUp})`;

      divText.style.left = `-${textLeftUp}vw`

       if(translateYPorcentageUp < 1){
         img.style.transform = `
              rotateZ(90deg)
              translate(100%)
              scaleY(1)`;

        divText.style.left = `0vw`

       }
   }
   if(animDirection === "down"){

     img.style.transform = `
          rotateZ(90deg)
          translate(100%)
          scaleY(${translateYPorcentageDown})
      `;

     divText.style.left = `-${textLeftDown}vw`

     if(translateYPorcentageDown < 1){
       img.style.transform = `
            rotateZ(90deg)
            translate(100%)
            scaleY(1)
        `;
     }
   }
  }

  handleResetDivUp = (id) => {

    console.log(id, "here");
    let scrollDirection = this.state.scrollDirection;
    let previousDivId = id;
    let divID = `container_mobile_div_${previousDivId}`;
    let imgContainer = document.querySelector(`#${divID}`);
    let img = document.querySelector(`#${divID} img`);

    let originalImageStretch = this.state.originalImageStretch;
    img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${10})`;
  };


  handleResetDivDown = (id) => {
    // console.log(id, "here");
    // let scrollDirection = this.state.scrollDirection;
    // let previousDivId = id;
    // let divID = `container_mobile_div_${previousDivId}`;
    // let imgContainer = document.querySelector(`#${divID}`);
    // let img = document.querySelector(`#${divID} img`);
    //
    // let originalImageStretch = this.state.originalImageStretch;
    // img.style.transform = `rotateZ(90deg) translate(100%) scaleY(${10})`;
  };


  definePorcentage = (percent, total) => {
      let porcentage = (percent/total)*100;
      return porcentage
   }

  defineValueFromPorcentage = (percentage, total) => {
    let value =  ((percentage * total)/100);
    return value;
  }



  render() {
    if(!this.state.dataToDivs){
      return null;
    };
    return (
      <div className="main_vertical_container_mobile">
            <div style={{position: "fixed"}}>
              {this.state.counter}
              <hr />
              {this.state.scrollDirection}
              <hr />
              {this.state.selectedDivId}
            </div>
            {this.state.dataToDivs}
      </div>
    );
  }
}

export default Desktop;
