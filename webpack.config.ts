/**
 * webpack configuration
 */

 import * as fs from 'fs';
 import * as webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

const meta = require('./package.json');

class WebpackOnBuildPlugin {
	constructor(readonly callback: (stats: any) => void) {
	}

	public apply(compiler: any) {
		compiler.hooks.done.tap('WebpackOnBuildPlugin', this.callback);
	}
}

module.exports = {
	entry: {
		app: './src/client/init.tsx',
	},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
			{
				test: /\.css/,
				use: ["style-loader", "css-loader"],
			}
    ]
  },
	plugins: [
		new webpack.ProgressPlugin({}),
		new WebpackOnBuildPlugin((stats: any) => {
			fs.writeFileSync('./built/meta.json', JSON.stringify({ version: meta.version }), 'utf-8');
		}),
	],
	output: {
		path: __dirname + '/built/client/assets',
		filename: `[name].${meta.version}.js`,
		publicPath: `/assets/`
	},
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  target: ["web", "es5"],
	devtool: false, //'source-map',
	mode: isProduction ? 'production' : 'development'
};
