import React, { Component } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom'
import { BsDownload } from "react-icons/bs";
import { BiLike } from "react-icons/bi";


export default class ImageDetails extends Component {

  // all stats
  constructor(props) {
    super(props);
    this.state = {
      full_img: ['1'],
      loading: false
    }
  }

  // get single photo id
  componentDidMount() {
    this.setState({
      loading: true
    })

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');

    axios.get('https://api.unsplash.com/photos/' + id + '?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE').then(
      res => this.setState({
        full_img: res.data,
        loading: false
      })
    );

    window.scrollTo(0, 0);

    
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.props.match !== prevProps.match) {

      let search = window.location.search;
      let params = new URLSearchParams(search);
      let id = params.get('id');

      this.gotoSimilar(id);
    }
  }

  // fetch similar photos
  gotoSimilar = (id) => {
    this.setState({
      full_img: ['1'],
      loading: true
    })

    axios.get('https://api.unsplash.com/photos/' + id + '?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE').then(
      res => this.setState({
        full_img: res.data,
        loading: false,
      })
    );

    window.scrollTo(0, 0)
  }

  render() {
    const { full_img, loading } = this.state;
    let related_collection = full_img.related_collections;

    if(loading === true) {
      return (
        <div className="container my-3">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <Skeleton width="100%" height={700} />
            </div>
          </div>
        </div>
      )
    }

    else {
      return (
        <section className="photo-details-area">
          {/* details info */}
          <div className="photo-details-wrap">
            <div className="container-fluid p-0">
              <div className="img-full-area position-relative">
                { full_img.urls && <img src={ full_img.urls.full } alt="full" className="full-imge"/> }
                <div className="description-area position-absolute p-4">
                  <h2> { full_img.alt_description } </h2>
                  <p className="mb-1">Author: { full_img.user && full_img.user.first_name } { full_img.user && full_img.user.last_name }</p>
                  <p className="mb-1">Upload  Date: { full_img.created_at }</p>
                  <p className="mb-1">Camera: { full_img.exif && full_img.exif.make }</p>
                  <p className="mb-1"><i className="me-2"> <BsDownload/> </i> { full_img.downloads }</p>
                  <p><i className="me-2"> <BiLike/> </i> { full_img.likes }</p>
                  <a href={ full_img && 'https://unsplash.com/photos/' +full_img.id+ '/download?force=true' } className="btn btn-danger">Download</a>
                </div>
              </div>
            </div>
          </div>

          {/* related items */}
          <div className="photo-show-area">
            <div className="container my-4">
              <h3 className="mb-3">Related Photos</h3>
              <div className="row">
                {
                  related_collection && related_collection.results.map( (photo, i) => (
                    <div key={i} className="col-lg-4 col-md-4 mb-3">
                      <Link to={ '/photo?id=' + photo.cover_photo.id } >
                        { loading ? <Skeleton width="100%" height={300} /> : <img src={photo.cover_photo && photo.cover_photo.urls.small} alt="img" className="thumb-img mb-3"/> }
                        
                        <h4 className="img-name">{photo.cover_photo && photo.cover_photo.alt_description}</h4>
                      </Link>
                    </div>
                  )
                  )
                }
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
}
