var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'generated'),
        filename: 'app-bundle.js'},
    resolve: {extensions: ['.js', '.jsx']},
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
	       },
	       { 
	    	      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	    	      loader: "url-loader?mimetype=application/font-woff"
	       },
	       { 
	    	      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	    	      loader: "file-loader"
	       },
	       {
	           test: /\.(css)$/,
	           loader: ['style-loader', 'css-loader']
	       },
	       {
	    	   test: /bootstrap\/dist\/js\/umd\//, 
	    	   loader: 'imports-loader?jQuery=jquery'
	       }
        ]
    },
    devServer: {
        noInfo: false,
        quiet: true,
        lazy: false,
        watchOptions: {
            poll: true
       }
    }
}