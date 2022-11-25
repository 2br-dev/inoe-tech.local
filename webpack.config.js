const { webpack, ProvidePlugin } = require("webpack");

module.exports = {
	output: {
		filename: 'master.js'
	},
	mode: "development",
	module: {
		rules:[{
			loader: 'babel-loader',
		}]
	},
	plugins: [
		new ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		})
	]
}