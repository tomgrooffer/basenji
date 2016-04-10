import React from 'react'
import { Route } from 'react-router'
import { boot } from 'basenji'

import Index from './views/Index/Index'

boot((history, store, callback) => {
  callback(
    <Route path='/' component={Index} />
  )
})