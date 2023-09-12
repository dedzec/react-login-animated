const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CreateFileWebpack = require('create-file-webpack');

const pathBuild = path.resolve(__dirname, '../build');

module.exports = merge(common, {
  // devtool: 'source-map',
  mode: 'production',
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CreateFileWebpack({
      // path to folder in which the file will be created
      path: pathBuild,
      // file name
      fileName: '.htaccess',
      // content of the file
      content:
        'RewriteEngine On' +
        '\nRewriteCond %{HTTPS} !=on' +
        '\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]' +
        '\nHeader always set Content-Security-Policy "upgrade-insecure-requests;"' +
        '\n# BEGIN WEBSITE' +
        '\nRewriteEngine On' +
        `\nRewriteBase /` +
        '\nRewriteRule ^index.html$ - [L]' +
        '\nRewriteCond %{REQUEST_FILENAME} !-f' +
        '\nRewriteCond %{REQUEST_FILENAME} !-d' +
        '\nRewriteCond %{REQUEST_FILENAME} !-l' +
        `\nRewriteRule . /index.html [L]\n` +
        '\n# DISABLE CACHING' +
        '\n<filesMatch ".(html|htm|js|css|jpg|png)$">' +
        '\n  FileETag None' +
        '\n  <ifModule mod_headers.c>' +
        '\n    Header unset ETag' +
        '\n    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"' +
        '\n    Header set Pragma "no-cache"' +
        '\n    Header set Expires "Wed, 08 Jan 1975 05:00:00 GMT"' +
        '\n  </ifModule>' +
        '\n</filesMatch>',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: pathBuild,
    publicPath: 'https://example.webpack.com',
    clean: true,
  },
});
