import React from 'react';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Photos from './components/Photos';

import About from './components/pages/About'
import Contact from './components/pages/Contact'
import ImageDetails from './components/pages/ImageDetails'

import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path="/" render = { () =>
        <>
          <section className="photo-show-area">
            <div className="container">
              <div className="row">
                <Photos/>
              </div>
            </div>
          </section>       
        </>
      }
      />

      <Route path="/about" component={ About } />
      <Route path="/contact" component={ Contact } />
      <Route path="/photo" component={ ImageDetails } />

      <Footer/>
    </Router>
  );
}

export default App;