const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    externals: [nodeExternals()],
};