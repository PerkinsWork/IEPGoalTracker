const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig();
  config.resolver = config.resolver || {};
  config.resolver.extraNodeModules = {
    'react-native': require.resolve('react-native-web'),
  };
  return config;
})();
