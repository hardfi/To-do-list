// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ["whatwg-fetch", "./js/app.jsx"],
    output: {
        filename: "./js/out.js"
    },
    devServer: {
        inline: true,
        contentBase: "./",
        port: 3001
    },

    watch: true,
    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        }]
    },

    // plugins: [
    //     new UglifyJsPlugin({
    //         sourceMap: true,
    //         exclude: /node_modules/
    //     })
    // ]
};
