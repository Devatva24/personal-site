import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import sitemap from "@quasibit/eleventy-plugin-sitemap";
import markdownItKatex from "@iktakahiro/markdown-it-katex";

export default function (eleventyConfig) {
  // ----------------------------
  // Markdown-it configuration
  // ----------------------------
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  const mdLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        symbol: "§",
        class: "heading-anchor",
      }),
    })
    .use(markdownItKatex);

  eleventyConfig.setLibrary("md", mdLib);

  // ----------------------------
  // Sitemap plugin
  // ----------------------------
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      // Update this to your GitHub Pages or custom domain
      hostname: "https://devatva24.github.io/personal-site/",
    },
  });

  // ----------------------------
  // Filters & Shortcodes
  // ----------------------------
  // Current year filter
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Filter project tags to exclude "project" tag
  eleventyConfig.addFilter("filterTags", (tags) => {
    return tags.filter(tag => tag !== "project").sort();
  });

  // Shortcode for current year (for footer)
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  // ----------------------------
  // Passthrough copy
  // ----------------------------
  eleventyConfig.addPassthroughCopy("assets"); // PDFs, images, etc.
  eleventyConfig.addPassthroughCopy("projects/**/images"); // project images
  eleventyConfig.addPassthroughCopy("CNAME"); // custom domain
  eleventyConfig.addPassthroughCopy("robots.txt"); // SEO

  // ----------------------------
  // Syntax highlighting
  // ----------------------------
  eleventyConfig.addPlugin(syntaxHighlight);
}
