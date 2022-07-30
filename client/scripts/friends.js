var Friends = {
  // TODO: Define how you want to store your list of friends.
  friendList: {},

  _data: null,

  // TODO: Define methods which allow you to add, toggle,
  // and check the friendship status of other users.

  initialize: function() {
    Friends.handleClick(event);
  },

  toggleStatus: function(username) {
    if (!Friends.friendList.hasOwnProperty(username)) {
      Friends.friendList[username] = true;
    } else {
      Friends.friendList[username] = !Friends.friendList[username];
    }
  },

  handleClick: function(event) {
    $('body').on('click', '.chat', function(event) {
      var target = $(this).find('.username').html();
      var username = target.slice(0, target.length - 2);
      Friends.toggleStatus(username);
      for (var k in Friends.friendList) {
        if (Friends.friendList[k] === true) {
          Friends.highlight(k);
        } else {
          Friends.unHighlight(k);
        }
      }
    });
  },

  highlight: function(username) {
    $('.username:contains(' + username + ')').css({
      'color': 'peru'
    });
  },

  unHighlight: function(username) {
    $('.username:contains(' + username + ')').css({
      'color': 'black'
    });
  }

};