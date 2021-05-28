import React, { Component } from 'react'

import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom'

export default class Photos extends Component {

  // initial state
  state = {
    photos: ['1', '2', '3', '4'],
    page: 1,
    prevPage: -1,
    loading: true,
    searched_query: '',
    searching: false,
    total_page: 0,
    total_search_result: 0
  }

  // initial get data from api
  componentDidMount() {
    axios.get('https://api.unsplash.com/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.page).then(
      res => this.setState({
        photos: res.data,
        loading: false,
        page: this.state.page + 1,
        prevPage: this.state.prevPage + 1
      })
    );
  }

  // get data with next page from api
  loadNextPage = (e) => {

    this.setState({
      loading: true
    })
    // set default value for next page
    if( this.state.searching === false ) {
      axios.get('https://api.unsplash.com/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.page).then(
        res => this.setState({
          photos: res.data,
          loading: false,
          page: this.state.page + 1,
          prevPage: this.state.prevPage + 1
        })
      );
    }
    // set searching value for next page
    else {
      axios.get('https://api.unsplash.com/search/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.page + '&query=' + this.state.searched_query).then(
        res => this.setState({
          photos: res.data.results,
          loading: false,
          page: this.state.page + 1,
          prevPage: this.state.prevPage + 1
        })
      )
    }

    window.scrollTo(0, 0)
  }

  // get data for previous page
  loadPrevPage = (prevPage) => {

    this.setState({
      loading: true
    })
    // set default value for next page
    if( this.state.searching === false ) {
      axios.get('https://api.unsplash.com/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.prevPage).then(
        res => this.setState({
          photos: res.data,
          loading: false,
          page: this.state.page - 1,
          prevPage: this.state.prevPage - 1
        })
      );
    }
    // set searching value for next page
    else {
      axios.get('https://api.unsplash.com/search/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=' + this.state.prevPage + '&query=' + this.state.searched_query).then(
        res => this.setState({
          photos: res.data.results,
          loading: false,
          page: this.state.page - 1,
          prevPage: this.state.prevPage - 1
        })
      )
    }

    window.scrollTo(0, 0);

    console.log(prevPage);
  }

  // search string set
  searchQuery = (e) => {
    this.setState({
      searched_query: e.target.value
    })
  }

  // form onsubmit show data for search
  showSearchedData = (e) => {
    e.preventDefault();

    this.setState({
      loading: true
    })

    // for show searched data
    axios.get('https://api.unsplash.com/search/photos/?client_id=dQD7FU3WqcRI9XyP6BzPuH8XpZEdvM8Y5kIBE_-wRDE&per_page=12&page=1&query=' + this.state.searched_query).then(
      res => {
        this.setState({
          photos: res.data.results,
          loading: false,
          searching: true,
          page: 2,
          prevPage: 0,
          total_page: res.data.total_pages,
          total_search_result: res.data.total
        })
      }
    )
  }

  render() {
    const { loading, photos, total_page, total_search_result, page, prevPage } = this.state;
    return (
      <>
        <div className="col-lg-8 col-md-6 mb-4">
          <h3 className="title">{ this.state.searching ? "Your Searched for: " + this.state.searched_query : "Latest Photos" }</h3>
          { this.state.searching ? <p className="total-results text-secondary">Results found: { total_search_result } | Page { page -1 } of { total_page }</p> : '' }
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <form action="" className="search-form" onSubmit={ this.showSearchedData }>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search here" value={ this.state.searched_query } onChange={ this.searchQuery } aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="input-group-text btn-danger" id="basic-addon2">Search</button>
              </div>
            </div>
          </form>
        </div>
        {
          photos.map((photo, i) => (
            <div key={i} className="col-lg-3 col-md-4 mb-3">
               <Link to={ '/photo?id=' + photo.id } >
                 { loading ? <Skeleton width="100%" height={300} /> : <img src={photo.urls.small} alt="img" className="thumb-img mb-3"/> }
                
                <h4 className="img-name">{photo.alt_description}</h4>
                { loading ? <Skeleton /> : <p className="img-owner text-secondary">by - {photo.user.first_name} {photo.user.last_name}</p> }
               </Link>
             </div>
          ))
        }

        <div className="col-12 mb-3">
          <div className="text-center">
            {
              prevPage > 0 && <button className="btn btn-secondary me-2" onClick={ () => this.loadPrevPage(prevPage) }>Goto Page {prevPage}</button>
            }
            {
              photos.length > 0 && <button className="btn btn-danger" onClick={ this.loadNextPage }>Goto Page {page}</button>
            }
          </div>
        </div>
      </>
    )
  }
}