import React from 'react';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Photos from './components/Photos';

function App() {
  return (
    <div className="App">
      <Header/>
      <section className="photo-show-area">
        <div className="container">
          <h1 className="title text-center mb-4">Latest Photos</h1>
          <div className="row">
            <Photos/>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;