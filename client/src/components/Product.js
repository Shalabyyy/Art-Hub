import React, { Component } from "react";
import TestImage from "../../src/noimage.png";
import M from "materialize-css";
class ProductCard extends Component {
  state = {
    likeIcon: "favorite_border"
  };
  resize = () => {
    var height = document.getElementById("test").style.height;
    var width = document.getElementById("test").style.width;
    var min = Math.min(width, height);
    var result = Math.max(min * (50 / 100), 350);
    var newHeight = (result / min) * height;
    var newWidth = (result / min) * width;
    document.getElementById("test").style.height = newHeight;
    document.getElementById("test").style.width = newWidth;
  };
  like = event => {
    const icon = event.target.innerText;
    if (icon === "favorite_border") {
      this.setState({ likeIcon: "favorite" });
      //like ++
    } else {
      this.setState({ likeIcon: "favorite_border" });
    }
  };
  componentDidMount = () => {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".carousel");
      var instances = M.Carousel.init(elems, { fullWidth: true, indicators:true});
    });
    //liked or not?
    // this.resize();
  };
  render() {
    return (
      <div>
        <h1>Product Card</h1>

        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image" style={{marginBottom:'0px'}}>
                <div class="carousel carousel-slider">
                  <a class="carousel-item" href="#one!">
                    <img src="https://lorempixel.com/800/400/food/1" />
                  </a>
                  <a class="carousel-item" href="#two!">
                    <img src="https://lorempixel.com/800/400/food/2" />
                  </a>
                  <a class="carousel-item" href="#three!">
                    <img src="https://lorempixel.com/800/400/food/3" />
                  </a>
                  <a class="carousel-item" href="#four!">
                    <img src="https://lorempixel.com/800/400/food/4" />
                  </a>
                </div>
                <span class="card-title white-text text-darken-3">
                  Used Paint Brush
                </span>
                <a
                  class="btn-floating halfway-fab  yellow"
                  style={{ marginRight: "84px" }}
                >
                  <i class="material-icons">view_carousel</i>
                </a>
                <a
                  class="btn-floating halfway-fab  red"
                  style={{ marginRight: "42px" }}
                >
                  <i class="material-icons" onClick={this.like}>
                    {this.state.likeIcon}
                  </i>
                </a>
                <a class="btn-floating halfway-fab waves-effect waves-light green">
                  <i class="material-icons">add_shopping_cart</i>
                </a>
              </div>
              <div class="card-content">
                <h6>
                  Artist: <a href="#">Marwan Mohsen</a>
                </h6>
                <p>Likes: 37</p>
                <p>Price: $300</p>
                <p>
                  Description: The Painbrushes were only used once and I don't
                  think that I.. <a>etc</a>
                </p>
                <p>dimensions: 40 X 5 X 2</p>
                <p>
                  Tags: <a>#Brush, #Paint</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
