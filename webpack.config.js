const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
    context: path.resolve(__dirname, "src"),
    entry: ['babel-polyfill', './index.js'],
    output: {        
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        compress: true
    },
    devtool: 'inline-source-map',
    // plugins: [
    //     new CleanWebpackPlugin(['dist'])
    // ],
    module: {
        rules: [
            // babel-loader
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                                       
                }
            },
            // css-loader
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // url-loader
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            }
        ]  
    }
};


module.exports = config;