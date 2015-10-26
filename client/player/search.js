Tracker.autorun(function () {
  console.log("somewhere o¿rimbow")

  var yt_id ="EzZvY8LZ7Gw";
  // var yt_id =Session.get('playThisVid');
 // the video id for a youtube video
  var yt = new YTPlayer("EzZvY8LZ7Gw");
  if (yt.ready()) yt.player.loadVideoById(yt_id);
});

Template.search.helpers({
  searchResults: function() {
    var results = Session.get('searchResults');
    if (!results || results.length === 0) {
        return;
    }

    var finalResults = results.filter(function(result) {
      if (result.id.videoId) {
        var yt = new YTPlayer(result.id.videoId);
          if (yt.ready()) {
            yt.player.loadVideoById(result.id.videoId);
         }
          return result;
        }
    });
    return finalResults;
  }
});

Template.search.events({
  'click .thumbnail': function(e) {
    e.defaultPrevented
    console.log("hola:D")
    console.log(this.id.videoId)
    Session.set('playThisVid', this.id.videoId);

  }
});

