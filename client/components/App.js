import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { Helmet } from 'react-helmet'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from './header/Header'
import Navigation from './navigation/Navigation'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Roboto, sans-serif;;
  font-weight: 300;
  color: #555;
}
`

class App extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    viewer: PropTypes.shape({
      user: PropTypes.object,
    }),
    children: PropTypes.node.isRequired,
    router: routerShape.isRequired,
  }

  static defaultProps = {
    viewer: {},
    isLoading: false,
  }

  constructor() {
    super()
    this.state = {
      navigationOpen: false,
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  toggleNavigation = () => {
    const state = this.state
    state.navigationOpen = !this.state.navigationOpen
    this.setState(state)
  }

  closeNavigation = () => {
    const state = this.state
    state.navigationOpen = false
    this.setState(state)
  }

  navigateTo = (route) => {
    this.props.router.push(route)
    this.closeNavigation()
  }

  render() {
    const { viewer, children } = this.props

    return (
      <div id="container">
        <Helmet>
          <title>Universal Relay Starter Kit</title>
          <meta name="description" content="The description to be displayed in google search results" />
        </Helmet>

        <Header
          viewer={viewer}
          toggleNavigation={this.toggleNavigation}
        />

        <Navigation
          viewer={viewer}
          open={this.state.navigationOpen}
          close={this.closeNavigation}
          navigateTo={this.navigateTo}
        />

        {children}
      </div>
    )
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_viewer on Viewer {
      ...Header_viewer
      ...Navigation_viewer
    }
  `,
)
