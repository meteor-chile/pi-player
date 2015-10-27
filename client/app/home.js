Template.home.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('songs');
  });
});

Template.home.helpers({
  songs: function () {
    return Songs.find({});
  }
});