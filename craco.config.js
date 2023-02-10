const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    style: {
        postcss: {
            plugins: [
                purgecss({
                    content: ["./src/**/*.html",
                        './**/*.html',
                        "./src/**/*.tsx",
                        "./src/**/*.ts",
                        './node_modules/mdb-ui-kit/js/mdb.min.js',
                        './node_modules/react-toastify/addons/use-notification-center/index.js'
                    ],
                    css: [
                        './node-modules/mdb-ui-kit/**/*.css',
                        './node-modules/react-toastify/dist/**/*.css',
                        './node-modules/react-toastify/scss/**/*.css',
                    ],
                }),
            ],
        },
    },
};