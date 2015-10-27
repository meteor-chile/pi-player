Meteor.methods({
  addSong: function(songAttributes) {
    var user = Meteor.user();
    var song = _.extend(songAttributes, {
      username: user.username,
    });

    var songId = Songs.insert(songAttributes);
    return {
      _id: songId
    };
  }
});

Meteor.publish('songs', function() {
  return Songs.find();
  return this.ready(); // no other actions needed
});
