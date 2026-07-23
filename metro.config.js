const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { resolver } = config;

if (resolver) {
  if (resolver.sourceExts && !resolver.sourceExts.includes('wasm')) {
    resolver.sourceExts.push('wasm');
  }
  if (resolver.assetExts && !resolver.assetExts.includes('wasm')) {
    resolver.assetExts.push('wasm');
  }
}

module.exports = config;
