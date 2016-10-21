const MessageStore = require('./message-store');

const compose = {
  render() {
    let el = document.createElement('div');
    el.setAttribute('class', 'new-message');
    el.innerHTML = this.renderForm();
  },
  renderForm() {
    let messageDraft = MessageStore.getMessageDraft();
    let p = document.createElement('p');
    p.setAttribute('class', 'new-message-header');
    let form = document.createElement('form');
    form.setAttribute('class', 'compose-form');
    
  }
};

module.exports = compose;
