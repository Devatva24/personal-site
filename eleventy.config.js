import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";


export default function (eleventyConfig) {
    // Configure markdown-it library with attrs
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    let mdLib = markdownIt(options)
        .use(markdownItAttrs)
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({ // adds an <a> link
                placement: "after",
                symbol: "§",
                class: "heading-anchor"
            })
        });
    eleventyConfig.setLibrary("md", mdLib);

    // other config
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("projects/**/images")
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPlugin(syntaxHighlight);

}