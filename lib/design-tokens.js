const StyleDictionary = require("style-dictionary");

function generate(outputPath) {

  // Typography
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

  // Drop Shadow
  StyleDictionary.registerTransform({
    name: "box-shadow",
    type: "value",
    transitive: true,
    matcher: function(token) {
      return token.type === "boxShadow";
    },
    transformer: function(token) {
      const { x, y, blur, spread, color } = token.original.value;
      return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
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
            "box-shadow",
          ],
          buildPath: `${outputPath}/scss/`,
          files: [
            {
              destination: "index.scss",
              format: "scss/variables",
            },
          ],
        },
        css: {
          prefix: "goa",
          transforms: [
            ...StyleDictionary.transformGroup.css,
            "typography/shorthand",
            "box-shadow",
          ],
          buildPath: `${outputPath}/css/`,
          files: [
            {
              destination: "index.css",
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
