var css = 'body,html{width:100%;height:100%}.menu{font-size:14px}';
var html = function (it, opt) {
    it = it || {};
    with(it) {
        var _$out_= [];
        _$out_.push('<div><p>hello world ',  name , '</p></div>');
      return _$out_.join('');
    }
};
