'use strict';

var search = new URL()
var ajax = new Ajax(search.url())
var pagination = new Pagination()

search.on('update', function() {
  ajax.update(search.url())
  sessionStorage.setItem('searchTerm', search.qs.q);
})

ajax.on('get', function(jsonObj) {
  if (!jsonObj) {
    return
  }

  var streams = jsonObj.streams
  var count = jsonObj._total

  var page = count === 0 ? 0 : Math.floor(ajax.qs('offset') / 10) + 1
  var totalPage = count === 0 ? 0 : (Math.ceil(count / 10))

  pagination.setPage(page)
  pagination.setTotal(totalPage)

  $id('count').innerText = 'Total Results: ' + count
  $id('pagination').innerHTML = pagination.html()
  $id('bottom_pagination').innerHTML = pagination.html()


  var vr = $id('video_results')

  while (vr.lastChild) {
    vr.lastChild.className = vr.lastChild.className + ' removing'
    vr.removeChild(vr.lastChild);
  }
  if (count === 0) {
    $id('navigation_help').classList.remove('show')
    var noResults = $div('no_results', 'Sorry, no results for: <strong>' + search.qs.q + '</strong>')
    vr.appendChild(noResults)

  } else {
    $id('navigation_help').classList.add('show')
    streams.forEach(function(s) {
      var img = $ele('img')
      img.src = s.preview.medium
      img.width = 192
      img.height = 108
      img.align = 'left'

      var displayName = $div('display_name', s.channel.display_name)
      var desc = $div('desc', s.channel.status)
      var gameName = $div('game_name', 'Playing ' + s.game)
      var views = $div('viewers', s.channel.views + ' viewers')
      var vid = $div('videos')

      vid.appendChild(img)
      vid.appendChild(displayName)
      vid.appendChild(gameName)
      vid.appendChild(views)
      vid.appendChild(desc)
      vr.appendChild(vid)
    })
  }
})
