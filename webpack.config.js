import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: path.join(__dirname, './client/index.js'),
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/public/index.html'
        })
    ]
}
