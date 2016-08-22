var through = require('through2');
var path = require('path');
var fs = require('fs');
var parseTpl = require('parse-tpl');
var css2str = require('css2string');

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
		var content = file.contents.toString().replace(reg, function(all, name) {
			var _all = path.join(dirname, name);
			var _replace = all;
			if (fs.existsSync(_all)) {
				// source file content
				_replace = fs.readFileSync(_all, 'utf-8');
				if (/\.css$/.test(name)) {
					// css file
					_replace = transformer.css(_replace);
				} else if (/\.(html|tpl)$/.test(name)) {
					// tpl file
					_replace = transformer.html(_replace);
				} else if (/\.(png|jpg|jpeg|gif)$/.test(name)) {
					// @TODO: image file parse base64
				}
			}
			return _replace;
		});
		file.contents = new Buffer(content);
		this.push(file);
		cb();
	});
};