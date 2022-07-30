var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    // console.log($('.submit').val());
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.
    var message = {
      username: decodeURI(App.username),
      text: $('#message').val(),
      roomname: $('#myselect option:selected').html(),
    };
    Parse.create(message);
    $('#message').val('');
    FormView.renderMessage();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

  renderMessage: function() {
    $('#chats').load('chatterbox.html null', function() {
      App.fetch();
    });
  },
};