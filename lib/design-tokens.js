const StyleDictionary = require("style-dictionary");

function generate(outputPath) {
  StyleDictionary.registerTransform({
    name: "typography/shorthand",
    type: "value",
    transitive: true,
    matcher: function(token) {
      return token.type === "typography";
    },
    transformer: function(token) {
      const { fontWeight, fontSize, lineHeight, fontFamily } =
        token.original.value;
      return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
    },
  });

  try {
    StyleDictionary.extend({
      source: [`./data/**/*.json`],
      platforms: {
        scss: {
          prefix: "goa",
          transforms: [
            ...StyleDictionary.transformGroup.scss,
            "typography/shorthand",
          ],
          buildPath: `${outputPath}/scss/`,
          files: [
            {
              destination: "tokens.scss",
              format: "scss/variables",
            },
          ],
        },
        css: {
          prefix: "goa",
          transforms: [
            ...StyleDictionary.transformGroup.css,
            "typography/shorthand",
          ],
          buildPath: `${outputPath}/css/`,
          files: [
            {
              destination: "tokens.css",
              format: "css/variables",
            },
          ],
        },
      },
    }).buildAllPlatforms();
  } catch (e) {
    console.error("ERROR", e.message);
  }
}

module.exports = {
  generate: generate,
};
