import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

import {Code} from '../components/Code'

const codeExample = `import {createEvent, createStore, createEffect, sample} from 'effector'

const nextPost = createEvent()

const getCommentsFx = createEffect(async postId => {
  const url = \`posts/\${postId}/comments\`
  const base = 'https://jsonplaceholder.typicode.com'
  const req = await fetch(\`\${base}\/\${url}\`)
  return req.json()
})

const $postComments = createStore([])
  .on(getCommentsFx.doneData, (_, posts) => posts)

const $currentPost = createStore(1)
  .on(getCommentsFx.done, (_, {params: postId}) => postId)

const $status = combine(
  $currentPost, $postComments, getCommentsFx.pending,
  (postId, comments, isLoading) => isLoading
    ? 'Loading post...'
    : \`Post \${postId} has \${comments.length} comments\`
)

sample({
  source: $currentPost,
  clock: nextPost,
  fn: postId => postId + 1,
  target: getCommentsFx,
})

$status.watch(status => {
  console.log(status)
})
// => Post 1 has 0 comments

nextPost()

// => Loading post... 
// => Post 2 has 5 comments 
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
    imageUrl: 'img/js-logo.svg',
    description:
      'No decorators, no proxies, no classes required. Only you and your data.',
  },
]

const users = [
  {
    url: 'sber.png',
    alt: 'Sber',
  },
  {
    url: 'mts.svg',
    alt: 'MTS',
  },
  {
    url: 'raiffeisen.svg',
    alt: 'Raiffeisen Bank Russia',
  },
  {
    url: 'avito.svg',
    alt: 'Avito',
  },
  {
    url: 'docsvision.png',
    alt: 'Docsvision',
    scale: 1.2,
  },
  {
    url: 'okoo.png',
    alt: 'Okoo',
    yOffset: true,
  },
  {
    url: 'redmadrobot.png',
    alt: 'REDMADROBOT',
    yOffset: true,
  },
  {
    url: 'junto.png',
    alt: 'Junto',
  },
  {
    url: 'space307.svg',
    alt: 'space307',
  },
  {
    url: 'stellarX.svg',
    alt: 'StellarX',
  },
  {
    url: 'stmLabs.png',
    alt: 'STM Labs',
  },
  {
    url: 'automationhero.svg',
    alt: 'automation hero',
  },
  {
    url: 'radity.png',
    alt: 'Radity',
  },
  {
    url: 'globalCtoForum.png',
    alt: 'Global CTO Forum',
  },
]

function CompaniesUsingEffector() {
  return (
    <footer className={styles.usersSection}>
      <header data-section-header>
        <h1 data-users-header>Companies using effector</h1>
      </header>
      <section data-users-logos>
        {users.map(({url, alt, yOffset, scale}, i) => {
          return (
            <div
              key={i}
              data-users-logo
              data-logo-offset={yOffset}
              style={scale ? {'--logoScale': scale} : null}>
              <img alt={alt} src={useBaseUrl(`img/logo/${url}`)} title={alt} />
            </div>
          )
        })}
      </section>
      <div data-users-add-yours>
        <i>
          <span data-users-add-yours-plain-text>
            Want to appear on this page?
          </span>{' '}
          <a href="https://github.com/effector/effector/issues/278">Tell us</a>
        </i>
      </div>
    </footer>
  )
}

function FeatureGrid() {
  return (
    <section className={styles.features}>
      <header data-section-header>
        <h1>Features</h1>
      </header>
      <div className="row" data-features-grid>
        {features.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className="col col--4">
      <div className="text--center">
        <img data-feature-image src={imgUrl} alt={title} />
      </div>
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  )
}

function Hero() {
  const {siteConfig = {}} = useDocusaurusContext()
  return (
    <header className={`hero ${styles.heroBanner}`}>
      <div className="container">
        <div className="row" data-hero-row>
          <div className="col col--6 margin-bottom--md" data-hero-content>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div data-hero-controls>
              <Link
                className="button button--outline button--primary button--lg"
                to={useBaseUrl('docs/introduction/installation')}>
                Get Started
              </Link>
              <Link
                className="button button--outline button--secondary button--lg"
                to="https://share.effector.dev">
                Try it out
              </Link>
            </div>
            <div data-hero-explainer="first-row">
              Explainer{' '}
              <Link
                to="https://www.youtube.com/watch?v=rslADuhtF4Y"
                id="explainer_video_link"
                key="explainer_video_link">
                video
              </Link>
            </div>
            <div data-hero-explainer="second-row">
              Explainer{' '}
              <Link
                to="https://dev.to/yanlobat/effector-s-beginner-guide-3jl4"
                id="explainer_article_link"
                key="explainer_article_link">
                article
              </Link>
            </div>
          </div>
          <div className="col col--6" data-hero-code>
            <Code language="js">{codeExample}</Code>
          </div>
        </div>
      </div>
    </header>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const {siteConfig = {}} = context
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <FeatureGrid />
      <CompaniesUsingEffector />
    </Layout>
  )
}

export default Home
