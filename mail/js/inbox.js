const MessageStore = require('./message-store');

const inbox = {
  render() {
    let el = document.createElement('ul');
    el.className = 'messages';
    let messages = MessageStore.getInboxMessages();
    messages.forEach(message => {
      el.appendChild(this.renderMessage(message));
    });
    return el;
  },
  renderMessage(message) {
    let li = document.createElement('li');
    let f = document.createElement('span');
    f.setAttribute('class', 'from');
    f.innerHTML = message.from;
    let subject = document.createElement('span');
    subject.setAttribute('class', 'subject');
    subject.innerHTML = message.subject;
    let body = document.createElement('span');
    body.setAttribute('class', 'body');
    body.innerHTML = message.body;
    [f, subject, body].forEach(el => {
      li.appendChild(el);
    });
    return li;
  }
};

module.exports = inbox;
