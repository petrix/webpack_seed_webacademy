const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const baseConf = (_path) => {
    // NEW pages should be added here i.g. if you need to create
    // contacts page you need add folder to src,
    // and add path and name to entry array
    const VENDORS_NAME = 'vendors';
    const entry = {
        index: ['babel-polyfill', './src/index/index.js'],
        'ex-cast': ['./src/ex-cast/ex-cast.js'],
        'pmf': ['./src/pmf/pmf.js'],
        'lesson-8': ['./src/lesson-8/lesson-8.js'],
        'lesson-9': ['./src/lesson-9/lesson-9.js'],
        'lesson-10': ['./src/lesson-10/lesson-10.js'],
        'lesson-11': ['./src/lesson-11/lesson-11.js'],
        'lesson-12': ['./src/lesson-12/lesson-12.js'],
        'lesson-13': ['./src/lesson-13/lesson-13.js'],
        'lesson-14': ['./src/lesson-14/lesson-14.js'],
        'hw-8': ['./src/hw-8/hw-8.js'],
        'hw-11': ['./src/hw-11/hw-11.js'],
        'hw-12': ['./src/hw-12/hw-12.js'],
        'hw-12-j': ['./src/hw-12-j/hw-12-j.js'],
        'hw-12-2': ['./src/hw-12-2/hw-12-2.js'],
        'hw-13': ['./src/hw-13/hw-13.js'],
    };

    const plugins = Object.keys(entry).reduce((acc, name) => {
        acc.push(new HtmlWebpackPlugin({
            chunksSortMode: 'manual',
            title: `${name}`,
            template: `./src/${name}/${name}.html`,
            chunks: [VENDORS_NAME, name],
            filename: `./${name}.html`,
        }));
        acc.push(new ExtractTextPlugin({
            filename: `[name].css`,
            allChunks: false
        }));

        return acc;
    }, []);

    plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: VENDORS_NAME,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            'typeof window': JSON.stringify('object')
        })
    ]);

    entry.vendors = `./src/common/scripts/${VENDORS_NAME}.js`;

    return {
        entry,
        output: {
            filename: '[name].js',
        },
        module: {
            rules: [{
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader'
                    }]
                },
                {
                    test: /\.js/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }]
                },
                {
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'autoprefixer-loader?browsers=last 5 version', 'sass-loader']
                    })
                },
                {

                    /**
                     * ASSET LOADER
                     * Reference: https://github.com/webpack/file-loader
                     * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                     * Rename the file using the asset hash
                     * Pass along the updated reference to your code
                     * You can add here any file extension you want to get copied to your output
                     */
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'file-loader?publicPath=./&name=assets/images/[name].[ext]'
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?publicPath=./&name=assets/fonts/[name].[ext]'
                }
            ]
        },
        plugins
    };
};

module.exports = baseConf;