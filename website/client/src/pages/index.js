import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
// import CodeBlock from '@theme/CodeBlock'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

import {Code} from '../components/Code'

import sberLogo from './logo/sber.png'
import MtsLogo from './logo/mts.svg'
import Raiffeisen from './logo/raiffeisen.svg'
import Avito from './logo/avito.svg'
import AutomationHeroLogo from './logo/automationhero.svg'
import docsvisionLogo from './logo/docsvision.png'
import redmadrobotLogo from './logo/redmadrobot.png'
import radityLogo from './logo/radity.png'
import okooLogo from './logo/okoo.png'
import globalCtoForumLogo from './logo/globalCtoForum.png'
import stmLabsLogo from './logo/stmLabs.png'

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
    url: sberLogo,
    alt: 'Sber',
  },
  {
    view: MtsLogo,
    alt: 'MTS',
  },
  {
    view: Raiffeisen,
    alt: 'Raiffeisen Bank Russia',
  },
  {
    view: Avito,
    alt: 'Avito',
  },
  {
    url: redmadrobotLogo,
    alt: 'REDMADROBOT',
    yOffset: true,
  },
  {
    view: AutomationHeroLogo,
    alt: 'automation hero',
  },
  {
    url: docsvisionLogo,
    alt: 'Docsvision',
  },
  {
    url: radityLogo,
    alt: 'Radity',
  },
  {
    url: okooLogo,
    alt: 'Okoo',
    yOffset: true,
  },
  {
    url: globalCtoForumLogo,
    alt: 'Global CTO Forum',
  },
  {
    url: stmLabsLogo,
    alt: 'STM Labs',
  },
]

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt="" />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const {siteConfig = {}} = context
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <div className={clsx('row', styles.rowRevers)}>
            <div
              className={clsx('col col--6 margin-bottom--md', styles.buttons)}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    'button button--outline button--primary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/introduction/installation')}>
                  Get Started
                </Link>
                <Link
                  className={
                    'button button--outline button--secondary button--lg'
                  }
                  to="https://share.effector.dev">
                  Try it out
                </Link>
              </div>
              <div style={{marginTop: '30px'}}>
                Explainer{' '}
                <Link
                  to="https://www.youtube.com/watch?v=rslADuhtF4Y"
                  id="explainer_video_link"
                  key="explainer_video_link">
                  video
                </Link>
              </div>
              <div style={{marginTop: '10px'}}>
                Explainer{' '}
                <Link
                  to="https://dev.to/yanlobat/effector-s-beginner-guide-3jl4"
                  id="explainer_article_link"
                  key="explainer_article_link">
                  article
                </Link>
              </div>
            </div>
            <div
              className="col col--6"
              style={{fontSize: 'calc(var(--ifm-code-font-size) * 0.9)'}}>
              <Code language="js">{codeExample}</Code>
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
      <footer className={styles.usersSection}>
        <header>
          <h1 data-users-header>Companies using effector</h1>
        </header>
        <section data-users-logos>
          {users.map(({url, alt, view: View, yOffset}, i) => {
            if (!View)
              return (
                <div key={i} data-users-logo data-logo-offset={yOffset}>
                  <img alt={alt} src={url} title={alt} />
                </div>
              )
            return (
              <div key={i} data-users-logo>
                <View title={alt} />
              </div>
            )
          })}
        </section>
        <div data-users-add-yours>
          <i>
            <span data-users-add-yours-plain-text>
              Want to appear on this page?
            </span>{' '}
            <a href="https://github.com/effector/effector/issues/278">
              Tell us
            </a>
          </i>
        </div>
      </footer>
    </Layout>
  )
}

export default Home
