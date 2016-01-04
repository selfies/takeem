'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('searchTerm')) {
    $id('q').value = sessionStorage.getItem('searchTerm')
    search.update($id('q').value)
  }

  $id('search').addEventListener('click', function(e) {
    search.update($id('q').value)
  })

  document.body.addEventListener('click', function(e) {
    if (['nextPage', 'prevPage'].indexOf(e.target.className) > -1) {
      var jmp = search.qs.limit

      if (e.target.className === 'prevPage' && pagination.hasPrev()) {
        search.addOffset(-jmp)
      }

      if (e.target.className === 'nextPage' && pagination.hasNext()) {
        search.addOffset(jmp)
      }

      e.preventDefault()
    }
  })

})

document.addEventListener('keydown', function(e) {
  if (!(e.shiftKey || e.ctrlKey || e.altKey)) {
    if (e.keyCode === 37 && pagination.hasPrev()) { //left
      search.addOffset(-search.qs.limit)
    }
    if (e.keyCode === 39 && pagination.hasNext()) { //right
      search.addOffset(search.qs.limit)
    }
  }
})
