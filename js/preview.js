'use strict';

(function () {
  var AVATAR_SIZE = 35;
  var COMMENTS_AMOUNT = 5;

  var bigPhoto = document.querySelector('.big-picture');
  var closePhotoButton = document.querySelector('.big-picture__cancel');

  var socialComment = bigPhoto.querySelector('.social__comment');
  var socialComments = bigPhoto.querySelector('.social__comments');
  var socialCommentCount = bigPhoto.querySelector('.social__comment-count');
  var commentsLoader = bigPhoto.querySelector('.comments-loader');
  var fragment = document.createDocumentFragment();
  var remainingComments = [];

  var openBigPhoto = function () {
    bigPhoto.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentsLoader.addEventListener('click', clickOnCommentsLoader);
  };

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', clickOnCommentsLoader);
  };

  var renderComment = function (comment) {
    var newSocialComment = socialComment.cloneNode(true);
    newSocialComment.querySelector('.social__picture').src = comment.avatar;
    newSocialComment.querySelector('.social__picture').alt = comment.name;
    newSocialComment.querySelector('.social__picture').width = AVATAR_SIZE;
    newSocialComment.querySelector('.social__picture').height = AVATAR_SIZE;
    newSocialComment.querySelector('.social__text').textContent = comment.message;
    return newSocialComment;
  };

  var deleteDeafaultComments = function () {
    var defaultComments = document.querySelectorAll('.social__comment');
    defaultComments.forEach(function (comment) {
      socialComments.removeChild(comment);
    });
  };

  var showNextComments = function () {
    for (var i = 0; i < COMMENTS_AMOUNT && remainingComments.length > 0; i++) {
      fragment.appendChild(renderComment(remainingComments.shift()));
    }
    socialComments.appendChild(fragment);

    if (remainingComments.length === 0) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  var clickOnCommentsLoader = function () {
    showNextComments();
  };

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    remainingComments = photo.comments.slice();
    deleteDeafaultComments();
    socialCommentCount.classList.add('hidden');
    showNextComments();
    openBigPhoto();
    document.addEventListener('keydown', function (evt) {
      window.util.pressEscape(evt, closeBigPhoto);
    });
  };

  window.preview = {
    closeBigPhoto: closeBigPhoto,
    renderBigPhoto: renderBigPhoto,
    closePhotoButton: closePhotoButton
  };
})();
