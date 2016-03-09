var Notification = function(notificationArea, params) {
  this.area = notificationArea;
  this.title = params.title || 'Notification';
  this.content = params.content || '';
  this.type = params.type || 'info';
  this.time = params.time || new Date();
  this.duration = params.duration || 10000;
  this.element = this.setupElement();
  this.area.appendChild(this.element);
}
Notification.prototype = {
  setupElement: function(){
    var element = document.createElement('div');
    element.classList.add('notification-' + this.type);
    var title = document.createElement('h2');
    title.innerText = this.title;
    var content = document.createElement('p');
    content.innerText = this.content; 
    element.appendChild(this.setupCloseButton());
    element.appendChild(title);
    element.appendChild(content);
    window.setTimeout(function(){
      this.destroy()
    }.bind(this), this.duration);
    return element;
  },
  setupCloseButton: function(){
    var button = document.createElement('span');
    button.innerText = 'X'; 
    button.onclick = function(){
      this.destroy();
    }.bind(this);
    return button;
  },
  destroy: function(){
    this.area.removeChild(this.element);
  }
}
