'use strict';

// shortcut functions
var $id = document.getElementById.bind(document)
var $ele = document.createElement.bind(document)

var $div = function(className, html) {
  var d = $ele('div')
  if (html) {
    d.innerHTML = html
  }
  if (className) {
    d.className = className
  }
  d.html = function() {
    return '<div class="' + d.className + '">' + d.innerHTML + '</div>'
  }
  return d
}
