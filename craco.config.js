const {PurgeCSSPlugin} = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // Add this line

const pathExtractor = class {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    }
};

module.exports = {
    style: {
        postcss: {
            plugins: [require("autoprefixer")],
        },
    },
    webpack: {
        plugins: [
            new PurgeCSSPlugin({
                paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {nodir: true}),
                extractors: [
                    {
                        extractor: pathExtractor,
                        extensions: ["html", "js", "jsx", "ts", "tsx"],
                    },
                ],
                whitelist: ["html", "body"],
                whitelistPatterns: [
                    /^antd-/,
                    /^bootstrap-/,
                    /^react-bootstrap-/,
                    /^mdb-react-ui-kit-/,
                    /^react-toastify-/,
                ],
                whitelistPatternsChildren: [
                    /^antd-/,
                    /^bootstrap-/,
                    /^react-bootstrap-/,
                    /^mdb-react-ui-kit-/,
                    /^react-toastify-/,
                ],
            }),
            new BundleAnalyzerPlugin(),
        ],
    },
};

