var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, "front_end"),
	devtool: debug ? "inline-sourcemap" : false,
	entry: "./index.js",
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					extends: './.babelrc',
					plugins: ['react-html-attrs', 'transform-class-properties'],
					cacheDirectory: true,
				}
			},
			{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        // https://github.com/react-boilerplate/react-boilerplate/issues/1648
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
		]
	},
	output: {
		path: __dirname + "/public/",
		filename: "index.min.js"
	},
	plugins: debug ? [] : [
		new webpack.optimize.OccurrenceOrderPlugin(),
	],
};
