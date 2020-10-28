import React from 'react'
import PropTypes from 'prop-types'

import '../styles/utils.css'
import styles from '../styles/content.module.css'

const Layout = ({ children }) => {

  return (
    <section className={styles.mainContent}>
      {children}
    </section>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout