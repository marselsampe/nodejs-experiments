var users = {
 
  getAll: function(req, res) {
    var allusers = data;
    res.json(allusers);
  },
 
  getDetail: function(req, res) {
    var id = req.params.id;
    var user = data[0];
    res.json(user);
  },
 
  create: function(req, res) {
    var newuser = req.body;
    data.push(newuser);
    res.json(newuser);
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser;
    res.json(updateuser);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = users;