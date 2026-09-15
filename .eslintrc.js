/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    // The site is a static export with `images: { unoptimized: true }`, so
    // next/image would add a runtime wrapper and nothing else: there is no
    // optimizer to call. Bare <img> is the deliberate choice, and it is what
    // lets the same markup lift into Elementor later. The rule only nags.
    "@next/next/no-img-element": "off",
  },
};
