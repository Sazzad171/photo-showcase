import React, { Component } from 'react'

class Header extends Component {

  state = {
    navItems: [
      {
        id: 1,
        name: 'Home',
        link: '/'
      },
      {
        id: 2,
        name: 'About',
        link: '/about'
      },
      {
        id: 3,
        name: 'Contact',
        link: '/contact'
      }
    ]
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <a href="/" className="logo">
                <h3>Photo Showcase</h3>
              </a>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="nav-items">
                <ul className="list-unstyled">
                  {
                    this.state.navItems.map(( navitem ) => (
                      <li key={ navitem.id }>
                        <a href={ navitem.link }> { navitem.name } </a>
                      </li>  
                    ))
                  }
                </ul>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <form action="" className="search-form">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search here" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="input-group-text btn-danger" id="basic-addon2">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;