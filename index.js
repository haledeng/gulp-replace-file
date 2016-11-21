var through = require('through2');
var path = require('path');
var fs = require('fs');
var parseTpl = require('parse-tpl');
var css2str = require('css2string');
var decomment = require('decomment');

var transformer = {
	html: parseTpl.compileTmpl,
	css: css2str.parse
};

module.exports = function(opts) {
	opts = opts || {};
	return through.obj(function(file, enc, cb) {
		var prefix = opts.prefix || '__inline';
		var dirname = path.dirname(file.path);
		var reg = new RegExp(prefix + '\\\([\\\'\\\"]([^\\\'\\\"]+)[\\\'\\\"]\\\)', 'g');

		var content = decomment(file.contents.toString()).replace(reg, function(all, name) {
			// real file path
			var realPath = path.join(dirname, name);
			//  to replace content
			var content = all;
			if (fs.existsSync(realPath)) {
				// source file content
				content = fs.readFileSync(realPath, 'utf-8');
				// remove comment in file.
				if (/\.css$/.test(name)) {
					// css file
					content = transformer.css(content);
				} else if (/\.(html|tpl)$/.test(name)) {
					// tpl file
					content = transformer.html(content);
				} else if (/\.(png|jpg|jpeg|gif)$/.test(name)) {
					// @TODO: image file parse base64
				}
			}
			return content;
		});
		file.contents = new Buffer(content);
		this.push(file);
		cb();
	});
};