'use strict';

var URL = function(opts) {
  opts = opts || {}
  this.qs = {
    q: opts.q || null,
    limit: opts.limit || 10,
    offset: opts.offset || 0,
    callback: opts.callback || 'ajax.callback'
  }
  this._events = {}
}

URL.baseUrl = 'https://api.twitch.tv/kraken/search/streams'

URL.prototype.url = function() {
  var qs = this.qs
  var qss = Object.keys(qs)
    .filter(function(f) { return qs[f] != null })
    .map(function(q) { return q + '=' + qs[q] }).join('&')

  var url = URL.baseUrl + (qss ? '?' : '') + qss
  return url
}

URL.prototype.addOffset = function(num) {
  var newOffset = (this.qs.offset || 0) + num
  this.update(this.qs.q, this.qs.limit, newOffset)
}

URL.prototype.update = function(q, limit, offset) {
  this.qs.q = q || null
  this.qs.limit = (limit!=undefined?limit:(this.qs.limit || 10))
  this.qs.offset = (offset!=undefined?offset:(this.qs.offset || 0))

  if (this._events['update']) {
    this._events['update']()
  }
}

URL.prototype.on = function(_event, cbFn) {
  _event = _event.toLowerCase()
  if (['update'].indexOf(_event) > -1) {
    this._events[_event] = cbFn
  }
  return this
}
