function updateHelperByID(bookId, data, tableName, columnName) {
  let query = [`UPDATE ${tableName}`, 'SET'];

  let set = [];
  Object.keys(data).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')');
  });

  query.push(set.join(', '));

  query.push(`WHERE ${columnName} = ` + bookId);

  return query.join(' ');
}

export { updateHelperByID };
