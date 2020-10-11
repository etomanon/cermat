import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ScrollToTop } from './scroll-to-top'
import { routes } from './routes'
import { Error404 } from '../pages/error404/error404'
import { Navbar } from '@/components/navbar/navbar'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Switch>
        {routes.map((r) => (
          <Route
            key={r.path}
            exact={r.disableExact ? false : true}
            path={r.path}
            component={r.component}
          />
        ))}

        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  )
}
