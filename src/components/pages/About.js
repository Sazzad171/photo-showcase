import React, { Component } from 'react'
import aboutImg from '../../images/about-us.jpg'
import Skeleton from 'react-loading-skeleton';

export default class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
     image: '',
    }
   }
  //  img loading track
   handleImageLoaded() {
    this.setState({ image: 'loaded' });
  }

  render() {
    return (
      <section className="about-page py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3">
              {/* img-loading track */}
              { !this.state.image && <Skeleton width="100%" height={ 400 }/> }
              <img src={ aboutImg } alt="About imge" className="img-fluid rounded" onLoad={this.handleImageLoaded.bind(this)}/>
            </div>
            <div className="col-md-6 mb-3">
              <h2 className="d-inline border-bottom border-5 border-danger">About</h2>
              <h4 className="mt-4">Hello, This is Sazzad</h4>
              <p className="text-secondary">I'm a developer based in Dhaka. This is a react app which is build by me.
                In this app I worked with "UNSPLASH API". Basically it is a photo showcase app. Here you can see all images of 
                unsplash, search any specific image, details of images like owner, description, upload time, camera, total download,
                total like. Also you can download any image from my app.<br/>
                Stay here & enjoy!
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
