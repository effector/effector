const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const pre = '```'

const codeExample = `${pre}js
import {createStore, createEvent} from 'effector'

const increment = createEvent()
const decrement = createEvent()
const resetCounter = createEvent()

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(n => console.log('counter: ', n))
// counter: 0
increment.watch(() => console.log('increment'))
decrement.watch(() => console.log('decrement'))

increment()
// counter: 1
// increment
decrement()
// counter: 0
// decrement
${pre}`

module.exports = function Index({config: siteConfig}) {
  const {baseUrl, docsUrl} = siteConfig

  return (
    <div>
      <div className="homeContainer">
        <div className="homeWrapperWrapper">
          <div className="homeSplashFade">
            <div className="wrapper homeWrapper">
              <div className="projectTitleWrapper">
                <img
                  alt={siteConfig.title}
                  src={`${siteConfig.baseUrl}img/comet.png`}
                />
                <h2 className="projectTitle">{siteConfig.title}</h2>
              </div>
              <div className="homeWrapperInner">
                <p className="homeTagLine">{siteConfig.tagline}</p>
                <div className="homeCodeSnippet">
                  <MarkdownBlock>{codeExample}</MarkdownBlock>
                </div>
              </div>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <div className="pluginWrapper buttonWrapper">
                      <a
                        className="button getStarted"
                        href={`${baseUrl}${
                          docsUrl ? `${docsUrl}/` : ''
                        }introduction/installation`}>
                        Get started
                      </a>
                    </div>
                    <div className="pluginWrapper buttonWrapper">
                      <a className="button" href="https://share.effector.dev">
                        Try it out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <GridBlock
            align="center"
            contents={[
              {
                content: 'TypeScript and Flow support out of box.',
                title: 'Type safe',
                image: baseUrl + 'img/shield.svg',
                imageAlign: 'top',
              },
              {
                content: 'Can work with any UI or server framework.',
                title: 'Framework agnostic',
                image: siteConfig.baseUrl + 'img/settings.svg',
                imageAlign: 'top',
              },
              {
                content: 'Simple API surface and helpful community.',
                title: 'Developer-friendly',
                image: baseUrl + 'img/laptop.svg',
                imageAlign: 'top',
              },
              {
                content:
                  'Static initialization provides boost in performance for runtime.',
                title: 'Maximum performance',
                image: baseUrl + 'img/bolt.svg',
                imageAlign: 'top',
              },
              {
                content:
                  'Effector uses Rollup and Terser to provide small builds.',
                title: 'Tiny bundle size',
                image: baseUrl + 'img/box.svg',
                imageAlign: 'top',
              },
            ]}
            layout="threeColumn"
          />
        </Container>
      </div>
    </div>
  )
}
