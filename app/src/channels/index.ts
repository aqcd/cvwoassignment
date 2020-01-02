// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.ts.

// @ts-ignore: Require @types/webpack-env to remedy but it have global var conflict with @types/node
const channels = require['context']('.', true, /_channel\.ts$/)
channels.keys().forEach(channels)
