var webpack = require('webpack');
var path = require('path');



module.exports = {
    entry: __dirname + '/src/index.js',
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/dist'
    }
};