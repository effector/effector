import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
// import CodeBlock from '@theme/CodeBlock'
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
            <div className="col col--6" style={{fontSize: 'calc(var(--ifm-code-font-size) * 0.9)'}}>
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
    </Layout>
  )
}

export default Home
