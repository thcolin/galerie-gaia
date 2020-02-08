import React from 'react'
import _ from 'lodash'

import components, { Layout } from '../components/index'

export default class Home extends React.Component {
  render () {
    return (
      <Layout {...this.props}>
        {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, index) => {
          const GetSectionComponent = components[_.get(section, 'component')]
          return (
            <GetSectionComponent key={index} {...this.props} section={section} site={this.props.pageContext.site} />
          )
        })}
      </Layout>
    )
  }
}
