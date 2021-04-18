import React, { Component } from 'react'

import { Link } from 'react-router-dom'

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
            <div className="col-md-6 mb-3">
              <Link to="/" className="logo">
                <h2 className="d-inline">SB Photography</h2>
              </Link>
            </div>
            
            <div className="col-md-6 mb-3">
              <div className="nav-items text-md-end text-center">
                <ul className="list-unstyled">
                  {
                    this.state.navItems.map(( navitem ) => (
                      <li key={ navitem.id }>
                        <Link to={ navitem.link }> { navitem.name } </Link>
                      </li>  
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;