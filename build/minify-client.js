const compressor = require('node-minify');
const fs = require('fs');
const jsdom = require('jsdom').JSDOM;
const rimraf = require('rimraf');

const directory = `${__dirname}/dist/client`;
const index = `${directory}/index.html`;
const scripts = [
    `/components`,
    `/systems`,
    `/splash-screen`,
];

compressor.minify({
    compressor: 'uglify-es',
    input: scripts.map((script) => {
        return `${directory}${script}/*.js`
    }),
    output: `${directory}/app.js`
});

fs.readFile(index, 'utf8', function(err, data) {
    const dom = new jsdom(data);
    const document = dom.window.document;
    Array.from(document.body.children).forEach((child) => {
        if (child.nodeName !== 'SCRIPT') {
            return;
        }

        scripts.forEach((script) => {
            if (child.src.indexOf(script) !== -1) {
                child.parentElement.removeChild(child);
            }
        });
    });

    const script = document.createElement('script');
    script.setAttribute('src', './app.js');
    document.body.appendChild(script);

    const html = dom.window.document.body.outerHTML;
    fs.writeFile(index, html, () => {
        compressor.minify({
            compressor: 'html-minifier',
            input: index,
            output: index,
            callback: function(err, min) {}
        });

        scripts.forEach((script) => {
            rimraf(`${directory}${script}`, () => {});
        });
    });
});