/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const pre = '```'

const codeExample = `${pre}js
import {createStore, createEvent} from 'effector'

const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(n => console.log('counter: ', n))
increment.watch(() => console.log('increment'))
decrement.watch(() => console.log('decrement'))

increment()
// increment
// counter: 1
decrement()
// decrement
// counter: 0
${pre}`

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props
    const {baseUrl, docsUrl} = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeWrapperWrapper">
          <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
          </div>
        </div>
      </div>
    )

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    )

    const ProjectTitle = () => (
      <div className="projectTitleWrapper">
        <img
          alt={siteConfig.title}
          src={`${siteConfig.baseUrl}img/comet.png`}
        />
        <h2 className="projectTitle">{siteConfig.title}</h2>
      </div>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a
          className={`button ${props.className}`}
          href={props.href}
          target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <ProjectTitle siteConfig={siteConfig} />
        <div className="homeWrapperInner">
          <p className="homeTagLine">{siteConfig.tagline}</p>
          <div className="homeCodeSnippet">
            <MarkdownBlock>{codeExample}</MarkdownBlock>
          </div>
        </div>
        <PromoSection>
          <Button
            className="getStarted"
            href={docUrl('introduction/installation')}>
            Get started
          </Button>
          <Button href="/try">Try it out</Button>
        </PromoSection>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props
    const {baseUrl} = siteConfig

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const FeatureCallout = () => (
      <div
        className="container productShowcaseSection paddingTop paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    )

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: 'Talk about trying this out',
            image: `${baseUrl}img/comet.png`,
            imageAlign: 'left',
            title: 'Get started',
          },
        ]}
      </Block>
    )

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/comet.png`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    )

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Talk about learning how to use this',
            image: `${baseUrl}img/comet.png`,
            imageAlign: 'right',
            title: 'Learn How',
          },
        ]}
      </Block>
    )

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content:
              'TypeScript and Flow support out of box, simple API surface and helpful community.',
            title: 'Developer-friendly',
          },
          {
            content:
              'Static initialization provides boost in performance for runtime.',
            title: 'Maximum performance',
          },
          {
            content: 'Effector uses Rollup and Terser to provide small builds.',
            title: 'Tiny bundle size',
          },
          // {
          //   content: '...',
          //   title: 'Decentralized',
          // },
          {
            content: 'Can work with any UI or server framework.',
            title: 'Flexible',
          },
        ]}
      </Block>
    )

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ))

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      )
    }

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          {/*<FeatureCallout />*/}
          {/*<LearnHow />*/}
          {/*<TryOut />*/}
          {/*<Description />*/}
          {/*<Showcase />*/}
        </div>
      </div>
    )
  }
}

module.exports = Index
