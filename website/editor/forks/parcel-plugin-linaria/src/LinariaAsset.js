const path = require('path');
const Module = require('module');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const transform = require('linaria/lib/transform');

const RESULT = Symbol('linaria-transform-result');

class LinariaAsset extends JSAsset {
  async pretransform() {
    if (!/node_modules/.test(this.name)) {
      const result = transform(this.contents, {
        filename: this.name,
      });

      this[RESULT] = result;
      this.contents = result.code;
      this.ast = null;
    } else {
      this[RESULT] = {};
    }

    await super.pretransform();
  }

  collectDependencies() {
    const { dependencies } = this[RESULT];

    if (dependencies) {
      dependencies.forEach(dep => {
        try {
          const resolved = Module._resolveFilename(dep, {
            id: this.name,
            filename: this.name,
            paths: Module._nodeModulePaths(path.dirname(this.name)),
          });

          this.addDependency(resolved, { includedInParent: true });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(`Failed to add dependency '${dep}' for ${this.name}`, e);
        }
      });
    }

    super.collectDependencies();
  }

  async generate() {
    const { cssText } = this[RESULT];
    const output = [...((await super.generate()) || [])];

    if (cssText) {
      output.push({
        type: 'css',
        value: cssText,
        final: true,
      });

      if (this.options.hmr) {
        this.addDependency('_css_loader');

        const js = output.find(o => o.type === 'js');

        if (js) {
          js.value += `
            ;(function() {
              var reloadCSS = require('_css_loader');
              module.hot.dispose(reloadCSS);
              module.hot.accept(reloadCSS);
            })();
          `;
        }
      }
    }

    return output;
  }
}

module.exports = LinariaAsset;