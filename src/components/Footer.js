import React, { Component } from 'react'

export default class Footer extends Component {

  state = {
    socialLinks: [
      {
        id: 1,
        name: "Facebook",
        link: "/"
      },
      {
        id: 2,
        name: "Twitter",
        link: "/"
      },
      {
        id: 3,
        name: "Instagram",
        link: "/"
      }
    ]
  }

  render() {
    return (
      <footer className="footer">
        <div className="container text-center">
          <h6 className="tag text-danger text-uppercase mb-4">I Work Worldwide</h6>
          <h1 className="email">Hello@photography.com</h1>
          <h5 className="contact py-2">(+880)18280101010</h5>
          <ul className="social-icon list-unstyled">

            {
              this.state.socialLinks.map( (socialLink) => (
                <li key={ socialLink.id }><a href={ socialLink.link }> { socialLink.name } </a></li>
              ) )
            }
            
          </ul>
          <hr/>
          <small className="copyright">&copy; 2020 Photograpy. Allright reserved</small>
        </div>
      </footer>
    )
  }
}
