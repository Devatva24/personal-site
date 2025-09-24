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
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  const mdLib = markdownIt(mdOptions)
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
      hostname: "https://devatva24.github.io/personal-site/", // GitHub Pages URL
    },
  });

  // ----------------------------
  // Filters & Shortcodes
  // ----------------------------
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("filterTags", (tags) => tags.filter(tag => tag !== "project").sort());
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  // ----------------------------
  // Passthrough copy
  // ----------------------------
  eleventyConfig.addPassthroughCopy("assets"); 
  eleventyConfig.addPassthroughCopy("projects/**/images");
  eleventyConfig.addPassthroughCopy("CNAME"); 
  eleventyConfig.addPassthroughCopy("robots.txt");

  // ----------------------------
  // Syntax highlighting
  // ----------------------------
  eleventyConfig.addPlugin(syntaxHighlight);

  // Optional: Watch for changes in projects/images folder
  eleventyConfig.addWatchTarget("projects/**/images");
}
