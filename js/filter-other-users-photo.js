'use strict';

(function () {
  var imagesFilter = document.querySelector('.img-filters');
  var comparePhotosByCommentsLength = function (a, b) {
    if (a.comments.length > b.comments.length) {
      return -1;
    }

    if (a.comments.length === b.comments.length) {
      return 0;
    }

    return 1;
  };

  var sortPhotoArrayByCommentsLength = function (serverPhotosCollection) {
    return serverPhotosCollection
      .map(function (item) {
        return item;
      })
      .sort(comparePhotosByCommentsLength);
  };

  window.filterOtherUserPhotos = function (array) {
    var serverPhotosCollection = array;
    var filteredPhotosCollection = [];
    var filterButtonCollection = document.querySelectorAll('.img-filters__button');

    imagesFilter.classList.remove('img-filters--inactive');

    Array.from(filterButtonCollection).forEach(function (button) {
      button.addEventListener('click', function () {
        filteredPhotosCollection = [];
        imagesFilter
          .querySelector('.img-filters__button--active')
          .classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');

        switch (button.id) {
          case 'filter-default':
            filteredPhotosCollection = serverPhotosCollection;
            break;
          case 'filter-random':
            for (var i = 0; i < 10; i++) {
              filteredPhotosCollection.push(serverPhotosCollection[i]);
            }
            break;
          case 'filter-discussed':
            filteredPhotosCollection = sortPhotoArrayByCommentsLength(serverPhotosCollection);
            break;
          default:
            filteredPhotosCollection = serverPhotosCollection;
        }

        window.renderPhotos(filteredPhotosCollection);
      });
    });

    filteredPhotosCollection = serverPhotosCollection;

    window.renderPhotos(filteredPhotosCollection);
  };
})();
