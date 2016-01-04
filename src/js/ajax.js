'use strict';

// Ajax handler
var Ajax = function(url) {
  this._events = {}
  this.url = url || ''
}

Ajax.prototype.qs = function(prop) {
  var getqs = '&' + (this.url.split('?')[1] || '') + '&'
  var r = new RegExp('&' + prop + '=(.*?)&', 'i')
  return getqs.match(r) ? getqs.match(r)[1] : undefined
}

Ajax.prototype.on = function(_event, cbFn) {
  _event = _event.toLowerCase()
  if (['get', 'error'].indexOf(_event) > -1) {
    this._events[_event] = cbFn
  }
  return this
}

Ajax.prototype.update = function(url) {
  var xmlhttp = new XMLHttpRequest()
  this.url = url

  if (!this.qs('q')) {
    return
  }

  xmlhttp.open('GET', url || this.url)
  xmlhttp.send()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var scripts = document.body.getElementsByTagName('script')
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].classList.contains('search_result')) {
          scripts[i].parentElement.removeChild(scripts[i])
        }
      }

      var jsonp = document.createElement('script')
      jsonp.type = 'text/javascript'
      jsonp.async = true
      jsonp.classList.add('search_result')
      jsonp.innerHTML = xmlhttp.responseText
      document.body.appendChild(jsonp)
    }
  }

  return xmlhttp
}
Ajax.prototype.callback = function(jsonObj) {
  this._events.get(jsonObj)
}
