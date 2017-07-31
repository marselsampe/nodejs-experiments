var items = {
  getAll: function (req, res) {
    var allItems = data;
    res.json(allItems);
  },

  getDetail: function (req, res) {
    var id = req.params.id;
    var item = data[0];
    res.json(item);
  },

  create: function (req, res) {
    var newItem = req.body;
    data.push(newitem);
    res.json(newItem);
  },

  update: function (req, res) {
    var updateItem = req.body;
    var id = req.params.id;
    data[id] = updateItem;
    res.json(updateItem);
  },

  delete: function (req, res) {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};

var data = [{
  name: 'Item 1',
  id: '1'
}, {
  name: 'Item 2',
  id: '2'
}, {
  name: 'Item 3',
  id: '3'
}];

module.exports = items;