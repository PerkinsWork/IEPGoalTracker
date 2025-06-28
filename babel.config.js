module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './screens',
          'react-native$': 'react-native-web',
        },
      },
    ],
  ],
};
