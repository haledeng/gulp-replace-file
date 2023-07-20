# gulp-replace-file
A gulp plugin to parse reference files in JS files. Different files will be parsed into different contents.
+ Template files (with a file extension name `.html` or `.tpl`) => JS functions.
+ Css files => string.
+ Other files => its file content.

## Install
```
npm i gulp-replace-file
```

## Usage
```
// __inline is the key function to reference file, which can be configed in gulpfile.
var htmlFunc = __inline('./temp.html');
var htmlStr = htmlFunc(data);
var cssText = __inline('./test.css');
```

## Config in gulpfile
```
var replace = require('gulp-replace-file');
gulp.task('replace', function() {
	gulp.src('replace/test.js')
		.pipe(replace())
		.pipe(gulp.dest('./build/'))
});
```

## config option
**prefix** : The key value to reference file. `__inline` is a default value.


## 捐赠
如果你觉得该项目对你有所帮助，就请开发者喝杯咖啡吧！你的每次慷慨捐赠，都是我贡献开源社区的不竭动力。

| 微信赞赏      | 
| ------------ | 
|<img src="https://github.com/haledeng/gulp-replace-file/assets/3880323/44afe76f-844f-4c88-8fb5-9fd3e2ffc26f" width="300"/> ||
