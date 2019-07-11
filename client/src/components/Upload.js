import React, { Component } from "react";
import axios from 'axios'
import DefaultImg from '../noimage.png'
class UploadTest extends Component {
  state = {
    multerImage: DefaultImg,
    fierebaseImage: DefaultImg,
    baseImage: DefaultImg
  };

  setDefaultImage = uploadType => {
    if (uploadType === "multer") {
      this.setState({ multerImage: DefaultImg });
    } else if (uploadType === "firebase") {
      this.setState({ fierebaseImage: DefaultImg });
    } else {
      this.setState({ baseImage: DefaultImg });
    }
  };
  uploadImage = (e, method) => {
    let imageObj = {};
    if (method === "multer") {
      let imageFromObj = new FormData();
      imageFromObj.append('imageName','multer-image-'+Date.now())
      imageFromObj.append('imageData',e.target.files[0]);

      this.setState({multerImage:URL.createObjectURL(e.target.files[0])})

      axios.post("http://localhost:4000/api/uploads/uploadmulter",imageFromObj)
        .then((data)=>{
            if(data.data.success){
                alert('The Image has been successfully uploaded')
                this.setDefaultImage("multer")
            }
        })
        .catch((err)=>{
                console.log(err)
                alert("Error while uploading the image via multer")
                this.setDefaultImage("multer")
        })
    }
  };
  render() {
    return (
      <div>
        <div>
          <h4>Proccess: Using Multer</h4>
          <p>upload image to a node server</p>
          <input type="file" onChange={e => this.uploadImage(e, "multer")} />
          <img src={this.state.multerImage} alt="upload-image" />
        </div>
        <div>
          <h4>Proccess: Using FireBase storage</h4>
          <p>upload image to a node server</p>
          <input type="file" onChange={e => this.uploadImage(e, "firebase")} />
          <img src={this.state.fierebaseImage} alt="upload-image" />
        </div>
        <div>
          <h4>Proccess: Using Base64</h4>
          <p>upload image to a node server</p>
        </div>
      </div>
    );
  }
}

export default UploadTest;
