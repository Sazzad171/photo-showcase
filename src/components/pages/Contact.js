import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';

export default class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
     mapLoad: false,
    }
   }
  //  map loading track
   handleImageLoaded() {
    this.setState({ mapLoad: true });
  }

  render() {
    return (
      <section className="contact-page">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-8 mb-3">
              { !this.state.mapLoad && <Skeleton width="100%" height={ 350 }/> }
              <iframe className={ this.state.mapLoad ? 'map' : '' } src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.82239289454!2d90.27923794728072!3d23.780887455957277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1618759570366!5m2!1sen!2sbd" loading="lazy" title="map" onLoad={this.handleImageLoaded.bind(this)}></iframe>
            </div>
            <div className="col-md-4 mb-3">
              <h1 className="text-danger">Contact Info:</h1>
              <h4>Address:</h4>
              <p>Dhaka, Bangladesh</p>
              <h4>Phone:</h4>
              <p>+8801679383667</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
