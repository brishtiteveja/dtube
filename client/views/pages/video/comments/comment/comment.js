var subcommentsIsOpen = false

Template.comment.events({
  'click #showreplies': function () {
    if (subcommentsIsOpen == true) {  
      console.log(this.id)
      this.$('#subcomments').addClass('subcommentsclosed');
    }
    else {
       this.$('#subcomments').removeClass('subcommentsclosed');
    }
    subcommentsIsOpen = !subcommentsIsOpen
  },
  'click .downvoteComment': function(event) {
    var wif = Users.findOne({username: Session.get('activeUsername')}).privatekey
    var voter = Users.findOne({username: Session.get('activeUsername')}).username
    var author = $(event.target).data('author')
    if (!author) author = $(event.target).parent().data('author')
    var permlink = $(event.target).data('permlink')
    if (!permlink) permlink = $(event.target).parent().data('permlink')
    var weight = Session.get('voteWeight')*-100
    steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
      if (err) toastr.error(err.cause.payload.error.data.stack[0].format, translate('GLOBAL_ERROR_COULD_NOT_VOTE'))
      else toastr.success(translate('GLOBAL_ERROR_DOWNVOTE_FOR', weight/100+'%', author+'/'+permlink))
      Template.video.loadState()
    });
  },
  'click .upvoteComment': function(event) {
    var wif = Users.findOne({username: Session.get('activeUsername')}).privatekey
    var voter = Users.findOne({username: Session.get('activeUsername')}).username
    var author = $(event.target).data('author')
    if (!author) author = $(event.target).parent().data('author')
    var permlink = $(event.target).data('permlink')
    if (!permlink) permlink = $(event.target).parent().data('permlink')
    var weight = Session.get('voteWeight')*100
    steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
      if (err) toastr.error(err.cause.payload.error.data.stack[0].format, translate('GLOBAL_ERROR_COULD_NOT_VOTE'))
      else toastr.success(translate('GLOBAL_ERROR_VOTE_FOR', weight/100+'%', author+'/'+permlink))
      Template.video.loadState()
    });
  }
})

Template.comments.rendered = function () {
  console.log('creating comments')
  var hello = document.getElementById('subcomments');
  var random = Template.upload.createPermlink(10)
  console.log(random)
  hello.id = random
  console.log(hello.id)

  this.firstNode.id = random
  Template.videoslider.createSubcommnets(random)
}

Template.comments.createSubcommnets = function (elemId) {
  console.log(elemId)
}