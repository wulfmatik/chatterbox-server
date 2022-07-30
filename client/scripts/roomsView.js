var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    RoomsView.handleClick();
    RoomsView.handleChange();
  },

  render: function(data) {
    // TODO: Render out the list of rooms.
    data = JSON.parse(data);
    data.forEach(function(obj) {
      if (!Rooms._roomList[obj.roomname] && obj.roomname) {
        Rooms._roomList[obj.roomname] = true;
        RoomsView.renderRoom(obj.roomname);
      }
    });
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
    var obj = {roomname: roomname};
    var compiled = _.template(`
    <option class = "roomname"><%- roomname %></option>
    `);
    RoomsView.$select.append(compiled(obj));

  },

  handleChange: function() {
    // TODO: Handle a user selecting a different room
    $('#myselect').on('change', FormView.renderMessage);
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.
    RoomsView.$button.on('click', function(event) {
      Rooms.add(event);
    });
  }

};