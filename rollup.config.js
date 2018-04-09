import flow from 'rollup-plugin-flow';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import path from 'path';
import progress from 'rollup-plugin-progress';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';


export default {
    external: ['lodash'],
    globals: {
        'lodash': '_'
    },
    input: 'src/main.js',
    output: {
        dir: 'dist',
        file: 'dist/tig.core.js',
        format: 'umd',
        name: 'tig.core',
        sourcemap: true,
    },

    plugins: [
        license({
            sourceMap: true,

            banner: {
                file: path.join(__dirname, 'LICENSE'),
                encoding: 'utf-8', // Default is utf-8
            },

            thirdParty: {
                output: path.join(__dirname, 'dist', 'dependencies.txt'),
                includePrivate: true, // Default is false.
                encoding: 'utf-8', // Default is utf-8.
            },
        }),
        json({
            preferConst: true, // Default: false
        }),
        flow({'pretty': true}),
        babel({
            exclude: 'node_modules/**'
        }),
        nodeResolve({
            jsnext: true,
            main: true,
            module: true,
            extensions: [ '.js', '.json' ],
        }),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**',  // Default: undefined

            extensions: [ '.js', '.json' ],

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: true,  // Default: true

            exclude: [ 'node_modules/lodash/package.json'],
        }),

        /*uglify(
            {
                output: {
                    comments: function(node, comment) {
                        var text = comment.value;
                        var type = comment.type;
                        if (type == "comment2") {
                            // multiline comment
                            return /@preserve|@license|@cc_on|MIT License|Copyright \(c\)/i.test(text);
                        }
                    }
                }
            }
        ),*/
        clear({
            // required, point out which directories should be clear.
            targets: ['dist'],
            // optional, whether clear the directores when rollup recompile on --watch mode.
            watch: true, // default: false
        }),
        filesize({
            showGzippedSize: true,
        }),
        progress({
            clearLine: true // default: true
        }),
    ]
};