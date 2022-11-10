const webpack = require("@nativescript/webpack");
const {
  getPlatformName,
} = require("@nativescript/webpack/dist/helpers/platform");

const svelte = (config, env) => {
  const platform = getPlatformName();
  const mode = env.production ? "production" : "development";
  const production = mode === "production";
  // target('node') is the default but causes svelte-loader to detect it as a "server" render, disabling HMR
  // electron-main sneaks us past the target == 'node' check and gets us HMR
  config.target("electron-main");
  // turns out this isn't enough now. svelte uses "node" of which "electron-main" is a subset in its export map forcing imports
  // for 'svelte' to 'ssr.mjs'. We define an alias here to force it back.
  config.resolve.alias.set("svelte$", "svelte/internal");
  // svelte-hmr still references tns-core-modules, so we shim it here for compat.
  config.resolve.alias.set("tns-core-modules", "@nativescript/core");
  // resolve .svelte files
  // the order is reversed because we are using prepend!
  config.resolve.extensions.prepend(".svelte").prepend(`.${platform}.svelte`);

  config.module
    .rule("svelte")
    .test(/\.svelte$/)
    .exclude.add(/node_modules/)
    .end()
    .use("svelte-loader")
    .loader("svelte-loader")
    .tap((options) => {
      return {
        ...options,
        hotReload: !production,
        compilerOptions: {
          namespace: 'foreign'
        },
        hotOptions: {
          injectCss: false,
          native: true,
        },
      };
    });
};

module.exports = (env) => {
  webpack.init(env);
  webpack.chainWebpack(svelte);
  return webpack.resolveConfig();
};
//svelte bench:
