module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'], // Specify your source directory
        alias: {
          '@': './src', // Map '@/*' imports to the src directory
          "@assets": "./src/assets", // Resolve `@assets` to the `assets` folder within `src`

        },
      },
    ],
  ],
};
