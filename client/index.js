// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { createClientRouter, createClientResolver } from './Router'

injectTapEventPlugin()

async function render(createRouter) {
  const resolver = createClientResolver()
  const Router = await createRouter(resolver)
  ReactDOM.render(
    <AppContainer>
      <Router resolver={resolver} />
    </AppContainer>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
  )
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./Router.js', () => {
    render(require('./Router').createClientRouter)
  })
}

render(createClientRouter)
