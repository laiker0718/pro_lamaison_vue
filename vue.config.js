const path = require("path");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "https://boucheronexperience.com/en/"
      : "./",
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) =>
        Object.assign(options, {
          limit: 10240,
          publicPath:
            process.env.NODE_ENV === "production"
              ? "https://boucheronexperience.com/en/"
              : "",
        })
      );

    config.resolve.alias.set("@", path.resolve(__dirname, "./src"));
  },

  configureWebpack: {
    devtool: "source-map",
  },
};
