//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', // エントリーポイント
    output: {
        path: path.resolve(__dirname, 'dist'), // 出力ディレクトリ
        filename: 'bundle.js', // 出力ファイル名
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // 解決する拡張子
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // TypeScript/TSXファイルの正規表現
                use: 'ts-loader', // ts-loaderを使用してTypeScriptをコンパイル
                exclude: /node_modules/, // node_modulesは除外
            },
            {
                test: /\.js$/, // JavaScriptファイルの正規表現
                exclude: /node_modules/, // node_modulesは除外
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.css$/, // CSSファイルの正規表現
                use: ['style-loader', 'css-loader'], // CSSを処理するためのローダー
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // 開発サーバのコンテンツベース
        compress: true, // gzip圧縮を有効に
        port: 9000, // ポート番号
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // HTMLテンプレートファイル
        })
    ]
};
