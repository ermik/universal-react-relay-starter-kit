import BrowserProtocol from 'farce/lib/BrowserProtocol'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import { ClientFetcher } from './fetcher'
import routes from './Routes'

export const historyMiddlewares = [queryMiddleware]

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  })

  return new Resolver(environment)
}

export const render = createRender({})

export function createClientResolver() {
  // eslint-disable-next-line no-underscore-dangle, no-undef
  const fetcher = new ClientFetcher('/graphql', window.__RELAY_PAYLOADS__)
  return createResolver(fetcher)
}

export async function createClientRouter(resolver) {
  const historyProtocol = new BrowserProtocol()
  const Router = await createInitialFarceRouter({
    historyProtocol,
    historyMiddlewares,
    routeConfig: routes,
    resolver,
    render,
  })

  return Router
}
