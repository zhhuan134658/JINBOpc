"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_ENV: '"server"',
  api: '"/api"',
  capi: '"/capi"'
});
