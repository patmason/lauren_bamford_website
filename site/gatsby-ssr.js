/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
//Fixes SSR rehydration issue
exports.replaceRenderer = ({ replaceBodyHTMLString }) => {
  replaceBodyHTMLString('<div id="SSR_wrapper"></div>')
}
