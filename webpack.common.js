const path = require('path');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/assets/styles/ant-theme-vars.less'), 'utf8'));
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
        historyApiFallback: {
            index:'dist/index.html'
        },
        open: true,
        compress: true
    },

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
            // less-loader
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader",
                        options: {
                            modifyVars: themeVariables
                        }
                    }
                ]
            },
            // css-loader
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // url-loader
            // {
            //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8000
            //         }
            //     }
            // },
            // file loader
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/images/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    }
};


module.exports = config;