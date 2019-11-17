import React from 'react'
import Helmet from 'react-helmet'
import Purchases from './Purchases'
import OpenRecommendations from './OpenRecommendations'

export default () => (
  <>
    <Helmet title="Maintainer Dashboard" />
    <Purchases />
    <OpenRecommendations />
  </>
)
