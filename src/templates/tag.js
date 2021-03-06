import React from 'react'
import PropTypes from 'prop-types'

import Layout from './layout'
import HeroTitle from '../components/hero-title'
import Content from './content'
import SEO from '../components/seo'

import Button from '../components/button'

import styles from '../styles/tag.module.css'

import { Link, graphql } from 'gatsby'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `Post${totalCount === 1 ? '' : 's'
    } tagged "${tag[0].toUpperCase() + tag.slice(1)}"`

  return (
    <Layout>
      <SEO title={`${tag}`} />
      <HeroTitle
        title={tagHeader}
      />
      <Content>
        <Button
          link="/tags"
          text="All Tags"
        />
        {edges.map(({ node }) => {
          const { title, path, date } = node.frontmatter
          return (
            <article key={path} className={styles.taggedPost}>
              <p className="date">
                <Link to={path}>{date}</Link>
              </p>
              <Link to={path}>
                <h3>{title}</h3>
              </Link>
            </article>
          )
        })}
      </Content>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD-MM-YYYY")
          }
        }
      }
    }
  }
`
