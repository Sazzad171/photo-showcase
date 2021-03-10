import React, { Component } from 'react'

import axios from 'axios'

export default class Photos extends Component {

  state = {
    photos: [],
    page: 1
  }

  componentDidMount() {
    axios.get('https://api.unsplash.com/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.page).then(
      res => this.setState({
        photos: res.data
      })
    );

    this.setState({
      page: this.state.page + 1
    });
  }

  loadNextPage = (e) => {
    this.setState({
      page: this.state.page + 1
    });

    axios.get('https://api.unsplash.com/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.page).then(
      res => this.setState({
        photos: res.data
      })
    );
  }

  render() {
    console.log(this.state.photos)

    return (
      <React.Fragment>
        {
          this.state.photos.map((photo) => (
            <div key={photo.id} className="col-lg-3 col-md-4 mb-3">
               <a href="/">
                <img src={photo.urls.small} alt="img" className="thumb-img mb-3"/>
                <h3 className="img-name">{photo.alt_description}</h3>
                <p className="img-category">by - {photo.user.first_name} {photo.user.last_name}</p>
               </a>
             </div>
          ))
        }

        <div className="col-12 mb-3">
          <div className="text-center">
            <button className="btn btn-danger" onClick={ this.loadNextPage }>Page {this.state.page}</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
