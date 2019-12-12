/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    const docsUrl = this.props.config.docsUrl
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    return `${baseUrl}${docsPart}${doc}`
  }

  pageUrl(doc, language) {
    return `${this.props.config.baseUrl}${doc}`
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('introduction/installation')}>
              Getting Started
            </a>
            <a href={this.docUrl('api/effector/effector')}>API Reference</a>
            <a href="https://changelog.effector.dev">Changelog</a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="https://twitter.com/effectorjs"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
            <a href="https://t.me/effector_ru">Telegram 🇷🇺</a>
            <a href="https://t.me/effector_en">Telegram</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/zerobias/effector">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/zerobias/effector/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer
