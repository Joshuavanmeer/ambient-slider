module.exports = {

    entry: {
        app: __dirname + '/src/js/ambient-sliders.js',

    },

    output: {
        path: __dirname + '/build/js',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }

};


