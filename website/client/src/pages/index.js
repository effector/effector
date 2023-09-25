import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

import {Code} from '../components/Code'

const codeExample = {
  en: `import {createEvent, createStore, createEffect, combine, sample} from 'effector'

const nextPost = createEvent()

const getCommentsFx = createEffect(async postId => {
  const url = \`posts/\${postId}/comments\`
  const base = 'https://jsonplaceholder.typicode.com'
  const req = await fetch(\`\${base}\/\${url}\`)
  return req.json()
})

const $postComments = createStore([])
  .on(getCommentsFx.doneData, (_, comments) => comments)

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
`,
  ru: `import {createEvent, createStore, createEffect, combine, sample} from 'effector'

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
    ? 'Загрузка поста...'
    : \`Пост \${postId} имеет \${comments.length} комментариев\`
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
// => Пост 1 имеет 0 комментариев

nextPost()

// => Загрузка поста...
// => Пост 2 имеет 5 комментариев
`,
  'zh-cn': `import {createEvent, createStore, createEffect, combine, sample} from 'effector'

const nextPost = createEvent()

const getCommentsFx = createEffect(async postId => {
  const url = \`posts/\${postId}/comments\`
  const base = 'https://jsonplaceholder.typicode.com'
  const req = await fetch(\`\${base}\/\${url}\`)
  return req.json()
})

const $postComments = createStore([])
  .on(getCommentsFx.doneData, (_, comments) => comments)

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
`,
  uz: `import {createEvent, createStore, createEffect, combine, sample} from 'effector'

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
    ? 'Post yuklanishi...'
    : \`Post \${postId} \${comments.length} ta komentariyaga ega\`
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
// => Post 1 0ta komentariyaga ega

nextPost()

// => Post yuklanishi...
// => Post 2 5ta komentariyaga ega
`,
}

const features = [
  {
    imageUrl: 'img/shield.svg',
    content: {
      en: {
        title: 'Type safe',
        description: 'TypeScript support out of box',
      },
      ru: {
        title: 'Типизация',
        description: 'Поддержка TypeScript в комплекте поставки',
      },
      'zh-cn': {
        title: '类型安全',
        description: '开箱即用的 TypeScript 支持',
      },
      uz: {
        title: 'Tipizatsiya',
        description: 'TypeScript ni to`la ta`minotini qo`llaydi'
      }
    },
  },
  {
    imageUrl: 'img/settings.svg',
    content: {
      en: {
        title: 'Framework agnostic',
        description: 'Can work with any UI or server framework',
      },
      ru: {
        title: 'Независимость от фреймворков',
        description: 'Работает с любыми UI и серверными фреймворками',
      },
      'zh-cn': {
        title: '与框架无关',
        description: '可以使用任何 UI 或 服务器框架',
      },
      uz: {
        title: 'Freymvorklardan mustaqil',
        description: 'Har qanday UI va server freymvorklar bilan ishlay oladi'
      }
    },
  },
  {
    imageUrl: 'img/laptop.svg',
    content: {
      en: {
        title: 'Developer-friendly',
        description: 'Simple API surface and helpful community',
      },
      ru: {
        title: 'Удобство в разработке',
        description: 'Логичный API и отзывчивое сообщество',
      },
      'zh-cn': {
        title: '开发人员友好',
        description: '简单的API 和 有用的社区',
      },
      uz: {
        title: 'Dasturchilar uchun qulay',
        description: 'Mantiqiy API va do`stona hamjamiyat'
      }
    },
  },
  {
    imageUrl: 'img/bolt.svg',
    content: {
      en: {
        title: 'Maximum performance',
        description:
          'Static initialization provides boost in performance for runtime',
      },
      ru: {
        title: 'Производительность',
        description: 'Статическая инициализация улучшает производительность',
      },
      'zh-cn': {
        title: '极致的性能',
        description: '静态初始化可提高运行时的性能',
      },
      uz: {
        title: 'Maksimal ishlash',
        description: 'Statik ishga tushishi ish faoliyatini tezlashtiradi'
      }
    },
  },
  {
    imageUrl: 'img/box.svg',
    content: {
      en: {
        title: 'Tiny bundle size',
        description: 'Effector provide small builds and support tree-shaking',
      },
      ru: {
        title: 'Малый размер',
        description: 'Эффектор - компактная библиотека и поддерживает tree-shaking',
      },
      'zh-cn': {
        title: '非常小的 bundle size',
        description: 'Effector 提供 small builds 和 支持 tree-shaking',
      },
      uz: {
        title: 'Kichik hajim',
        description: "Effector TREE SHAKING ni qo`llaydigan ixcham biblioteka"
      }
    },
  },
  {
    imageUrl: 'img/js-logo.svg',
    content: {
      en: {
        title: 'Plain, predictable javascript',
        description: 'No proxies, no classes required. Only you and your data',
      },
      ru: {
        title: 'Чистый, предсказуемый javascript',
        description: 'Никаких прокси и классов',
      },
      'zh-cn': {
        title: '简单、可预测的 JavaScript',
        description: '没有代理，不需要类。只有您和您的数据',
      },
      uz: {
        title: 'Oddiy JavaScript',
        description: 'Hechqanday proksi va klasslarsiz'
      }
    },
  },
]

const headings = {
  ru: {
    title: 'эффектор',
    tagline: 'Менеджер состояний',
  },
  'zh-cn': {
    title: 'effector',
    tagline: '轻松实现业务逻辑',
  },
  uz: {
    title: 'Effector',
    tagline: 'Holat menenjeri'
  }
}

const users = [
  {
    url: 'aviasales.png',
    alt: 'Aviasales',
    yOffset: true,
  },
  {
    url: 'healthSamurai.svg',
    alt: 'Health Samurai',
  },
  {
    url: 'raiffeisen.svg',
    alt: 'Raiffeisen Bank Russia',
  },
  {
    url: 'unicef.svg',
    alt: 'UNICEF (United Nations Children’s Fund)',
  },
  {
    url: 'joom.svg',
    alt: 'Joom Group',
  },
  {
    url: 'sber.png',
    alt: 'Sber',
  },
  {
    url: 'avito.svg',
    alt: 'Avito',
  },
  {
    url: 'mts.svg',
    alt: 'MTS',
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
    url: 'space307.svg',
    alt: 'space307',
  },
  {
    url: 'redmadrobot.png',
    alt: 'REDMADROBOT',
    yOffset: true,
  },
  {
    url: 'travelpayouts.svg',
    alt: 'Travelpayouts',
  },
  {
    url: 'junto.png',
    alt: 'Junto',
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
  {
    url: 'express24.svg',
    alt: 'Express24',
    scale: 1.6,
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
    url: 'tenpixls.png',
    alt: 'TenPixls',
  },
  {
    url: 'uptarget.png',
    alt: 'Uptarget',
  },
  {
    url: 'smartomato.svg',
    alt: 'смартомато',
  },
  {
    url: 'foxford.svg',
    alt: 'Фоксфорд',
  },
  {
    url: 'codengage.png',
    alt: 'Codengage',
  },
  {
    url: 'lunatask.png',
    alt: 'Lunatask',
  },
  {
    url: 'semrush.png',
    alt: 'Semrush',
  },
  {
    url: 'intouchHealth.png',
    alt: 'Intouch Health, a Teladoc company',
  },
]

function CompaniesUsingEffector() {
  return (
    <footer className={styles.usersSection}>
      <header data-section-header>
        <h1 data-users-header>
          <Translate
            id="landing.companies.using"
            description="companies using effector">
            Companies using effector
          </Translate>
        </h1>
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
            <Translate
              id="landing.companies.want_to_appear"
              description="Want to appear on this page">
              Want to appear on this page?
            </Translate>
          </span>{' '}
          <a href="https://github.com/effector/effector/issues/278">
            <Translate id="landing.companies.tell_us" description="Tell us">
              Tell us
            </Translate>
          </a>
        </i>
      </div>
    </footer>
  )
}

function FeatureGrid({locale}) {
  return (
    <section className={styles.features}>
      <header data-section-header>
        <h1>
          <Translate id="landing.features" description="Features">
            Features
          </Translate>
        </h1>
      </header>
      <div className="row" data-features-grid>
        {features.map((props, idx) => (
          <Feature key={idx} locale={locale} {...props} />
        ))}
      </div>
    </section>
  )
}

function Feature({imageUrl, content, locale}) {
  const imgUrl = useBaseUrl(imageUrl)
  const {title, description} = content[locale]
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
  const {siteConfig = {}, i18n: {currentLocale = 'en'} = {}} =
    useDocusaurusContext()
  const {title, tagline} = headings[currentLocale] || siteConfig
  return (
    <header className={`hero ${styles.heroBanner}`}>
      <div className="container">
        <div className="row" data-hero-row>
          <div className="col col--6 margin-bottom--md" data-hero-content>
            <h1 className="hero__title">{title}</h1>
            <p className="hero__subtitle">{tagline}</p>
            <div data-hero-controls>
              <Link
                className="button button--outline button--primary button--lg"
                to={useBaseUrl('docs/introduction/installation')}>
                <Translate id="landing.get_started" description="Get Started">
                  Get Started
                </Translate>
              </Link>
              <Link
                className="button button--outline button--secondary button--lg"
                to="https://share.effector.dev">
                <Translate id="landing.try_it" description="Playground">
                  Playground
                </Translate>
              </Link>
            </div>
            <div data-hero-explainer="first-row">
              <Link
                to="https://www.youtube.com/watch?v=rslADuhtF4Y"
                id="explainer_video_link"
                key="explainer_video_link">
                <Translate
                  id="landing.video_introduction"
                  description="Video introduction">
                  Video introduction
                </Translate>
              </Link>
            </div>
            <div data-hero-explainer="second-row">
              <Link
                to="https://dev.to/yanlobat/effector-s-beginner-guide-3jl4"
                id="explainer_article_link"
                key="explainer_article_link">
                <Translate
                  id="landing.introduction_article"
                  description="Introduction article">
                  Introduction article
                </Translate>
              </Link>
            </div>
          </div>
          <div className="col col--6" data-hero-code>
            <Code language="js">{codeExample[currentLocale]}</Code>
          </div>
        </div>
      </div>
    </header>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const {siteConfig = {}, i18n: {currentLocale = 'en'} = {}} = context
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <FeatureGrid locale={currentLocale} />
      <CompaniesUsingEffector />
    </Layout>
  )
}

export default Home
