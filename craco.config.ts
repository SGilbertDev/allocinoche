const cracoAlias = require('craco-alias')

export default module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
}
