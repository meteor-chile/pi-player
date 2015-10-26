Template.header.events({
  'click .sign-up': function(evt) {
    evt.defaultPrevented;
    FlowRouter.go("/signup");
  },
  'click .btn-search-yt': function(evt) {
      evt.defaultPrevented
      var searchInput = $("#search-input")
      var searchValue = searchInput.val();
      console.log(searchValue)
      if (!searchValue) {
          return;
      }

      console.log('search message is ', searchValue);
      var url = "https://www.googleapis.com/youtube/v3/search";
      var options = {
          'headers': {
              'Content-Type': 'application/json',
              'X-JavaScript-User-Agent': "Google APIs Explorer"
          },
          'params': {
              key: 'AIzaSyDjPT32sVbSvMomPUBbHiDYeeoAB0YTz94',
              part: 'snippet',
              q: searchValue,
              maxResults: 10
          }
      };
      HTTP.get(url, options, function(err, result) {
          console.dir(result.data.items);
            Session.set('searchResults', result.data.items);
      });
      searchInput.val('');
      FlowRouter.go('/search')
  }
});
