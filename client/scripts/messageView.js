var MessageView = {
  // Learn more about Underscore's templating capability
  // here: https://underscorejs.org/#template.
  // TODO: Update this template accordingly.
  render: function(obj) {
    var compiled = _.template(`
    <div class="chat">
      <div class="username"><%- username %>: </div>
      <div class="text"><%- text %></div>
    </div>
    `);
    return compiled(obj);
  }

};