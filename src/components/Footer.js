import React from 'react'
import _ from 'lodash'

import { htmlToReact, Link } from 'utils'
import Social from 'components/Social'

export default class Footer extends React.Component {
  render () {
    return (
      <footer id='colophon' className='site-footer outer'>
        <div className='inner'>
          <div className='site-footer-inside'>
            <p className='site-info'>
              {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content'))}
              &nbsp;
              {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links'), (link, index) => (
                <React.Fragment key={index}>
                  <Link key={index} to={_.get(link, 'url')} {...(_.get(link, 'new_window') ? { target: '_blank', rel: 'noopener' } : null)}>{_.get(link, 'text')}</Link>.
                </React.Fragment>)
              )}
            </p>
            {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') &&
              <Social {...this.props} />}
          </div>
        </div>
      </footer>
    )
  }
}
