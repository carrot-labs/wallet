Polymer('info-page', {
  created: function() {
    this.socket = this.getSocket();
  },

  handleGetContact: function(event, detail, sender) {
    this.contact = detail.response;

    this.setScrollHeaderPanelBackground();
  },

  handleDeleteContact: function() {
    this.redirect('/contacts/all');
  },

  largeScreenChanged: function() {
    if(this.contact) {
      this.setScrollHeaderPanelBackground();
    }
  },

  setScrollHeaderPanelBackground: function(image) {
    if(image) {
      this.$.scrollHeaderPanel.$.headerBg.style.background = 'url(' + image + ') 0 / cover no-repeat';
    } else {
      this.$.scrollHeaderPanel.$.headerBg.style.background = 'url(' + this.contact.avatar + ') 0 / cover no-repeat';
    }
  },

  getContact: function() {
    this.$.ajaxGetContact.go();
  },

  toggleFavorite: function() {
    this.contact.isFavorite = !this.contact.isFavorite;

    this.$.ajaxToggleFavorite.go();
  },

  deleteContact: function() {
    this.$.ajaxDeleteContact.go();
    this.socket.emit('contact-deleted');
  }
});
