/* eslint-disable import/no-extraneous-dependencies -- this file is a devDependency*/
const cheerio = require("cheerio");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'crypto'.
const crypto = require("crypto");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'HtmlWebpac... Remove this comment to see the full error message
const HtmlWebpackPlugin = require("html-webpack-plugin");

const digest = (str: any) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'createHash' does not exist on type 'Cryp... Remove this comment to see the full error message
  const hash = crypto.createHash("sha256").update(str, "utf8").digest("base64");
  return `sha256-${hash}`;
};
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CspHashPlu... Remove this comment to see the full error message
class CspHashPlugin {
  opts: any;
  constructor(opts: any) {
    this.opts = { ...opts };
  }

  apply(compiler: any) {
    compiler.hooks.compilation.tap("CspHashPlugin", (compilation: any) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "CspHashPlugin",
        (data: any, cb: any) => {
          const { filename } = this.opts;

          const $ = cheerio.load(data.html, { decodeEntities: false });

          if (filename) {
            const results = {};
            // @ts-expect-error ts-migrate(7053) FIXME: Property 'script-hashes' does not exist on type '{... Remove this comment to see the full error message
            results["script-hashes"] = $("script:not([src]):not([no-csp-hash])")
              .map((i: any, elmt: any) => digest($(elmt).html()))
              .get();

            const json = JSON.stringify(results);
            compilation.assets[filename] = {
              source: () => json,
              size: () => json.length,
            };
          }

          // Remove no-csp-hash attributes. Cheerio does not parse Jinja templates
          // correctly, so we brute force this with a regular expression.
          data.html = data.html.replace(
            /(<script .*)no-csp-hash(.*>)/,
            (match: any, p1: any, p2: any) => [p1, p2].join("")
          );

          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = CspHashPlugin;
/* eslint-enable import/no-extraneous-dependencies -- enable*/
