import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
// import CodeBlock from '@theme/CodeBlock'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

import {Code} from '../components/Code'

const codeExample = `
import {createStore, createEvent} from 'effector'

const add = createEvent()
const sub = createEvent()
const reset = createEvent()

const counter = createStore(0)
  .on(add, (count, n) => count + n)
  .on(sub, (count, n) => count - n)
  .reset(reset)

counter.watch(n => console.log('counter:', n))
// counter: 0
add.watch(n => console.log('add', n))
sub.watch(n => console.log('subtract', n))
reset.watch(() => console.log('reset counter'))

add(5)
// add 5
// counter: 5
sub(1)
// subtract 1
// counter: 4
reset()
// reset counter
// counter: 0
`

const features = [
  {
    title: 'Type safe',
    imageUrl: 'img/shield.svg',
    description: 'TypeScript and Flow support out of box.',
  },
  {
    title: 'Framework agnostic',
    imageUrl: 'img/settings.svg',
    description: 'Can work with any UI or server framework.',
  },
  {
    title: 'Developer-friendly',
    imageUrl: 'img/laptop.svg',
    description: 'Simple API surface and helpful community.',
  },
  {
    title: 'Maximum performance',
    imageUrl: 'img/bolt.svg',
    description:
      'Static initialization provides boost in performance for runtime.',
  },
  {
    title: 'Tiny bundle size',
    imageUrl: 'img/box.svg',
    description: 'Effector uses Rollup and Terser to provide small builds.',
  },
  {
    title: 'Plain javascript',
    imageUrl: 'img/laptop.svg',
    description:
      'No decorators, no proxies, no classes required. Only you and your data.',
  },
]

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const {siteConfig = {}} = context
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={classnames('hero ', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <Code language="js">{codeExample}</Code>
            </div>
            <div className={classnames('col col--6', styles.buttons)}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button button--outline button--primary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/introduction/installation')}>
                  Get Started
                </Link>
                <Link
                  className={classnames(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted,
                  )}
                  to="https://share.effector.dev">
                  Try it out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
