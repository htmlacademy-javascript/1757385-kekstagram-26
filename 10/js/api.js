function getData(onSuccess, onFail) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onFail('Не удалось загрузить фотографии.');
    })
    .then((photoes) => {
      onSuccess(photoes);
    })
    .catch(() => {
      onFail('Не удалось загрузить фотографии.');
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onFail();
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
}

export { getData, sendData };
