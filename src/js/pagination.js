var Pagination = function() {
  this.pages = 0
  this.currentPage = 0
}

Pagination.prototype.setPage = function(num) {
  this.currentPage = num
}

Pagination.prototype.setTotal = function(num) {
  this.pages = num
}

Pagination.prototype.prevHTML = function() {
  return $div('prevPage', '←')
}

Pagination.prototype.nextHTML = function() {
  return $div('nextPage', '→')
}

Pagination.prototype.html = function(page, total) {
  return pagination.prevHTML().html() + ' ' + this.currentPage + '/' + this.pages + ' ' + pagination.nextHTML().html()
}

Pagination.prototype.hasPrev = function() {
  return this.currentPage > 1
}

Pagination.prototype.hasNext = function() {
  return this.currentPage < this.pages
}
