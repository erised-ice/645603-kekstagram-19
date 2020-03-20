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
            var randomArrayItem = null;
            var checkUnique = function (someArray, element) {
              return someArray.some(function (item) {
                return element.url === item.url;
              });
            };

            for (var i = 0; i < serverPhotosCollection.length; i++) {
              randomArrayItem = window.util.getRandomArrayItem(serverPhotosCollection);
              if (!checkUnique(filteredPhotosCollection, randomArrayItem)) {
                filteredPhotosCollection.push(randomArrayItem);
              }

              if (filteredPhotosCollection.length === 10) {
                break;
              }
            }
            break;
          case 'filter-discussed':
            filteredPhotosCollection = sortPhotoArrayByCommentsLength(serverPhotosCollection);
            break;
          default:
            filteredPhotosCollection = serverPhotosCollection;
        }

        window.util.debounce(function () {
          window.renderPhotos(filteredPhotosCollection);
        });
      });
    });

    filteredPhotosCollection = serverPhotosCollection;

    window.renderPhotos(filteredPhotosCollection);
  };
})();
