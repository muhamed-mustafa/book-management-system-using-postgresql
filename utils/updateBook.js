function updateBookByID(bookId, data) {
  let query = ['UPDATE BMS.BOOK', 'SET'];

  let set = [];
  Object.keys(data).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')');
  });

  query.push(set.join(', '));

  query.push('WHERE book_id = ' + bookId);

  return query.join(' ');
}

export { updateBookByID };
