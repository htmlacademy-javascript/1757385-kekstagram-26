const ServerRefs = {
  GET_DATA_REF: 'https://26.javascript.pages.academy/kekstagram/data',
  SEND_DATA_REF: 'https://26.javascript.pages.academy/kekstagram'
};

function getData(onSuccess, onFail) {
  fetch(ServerRefs.GET_DATA_REF)
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
    ServerRefs.SEND_DATA_REF,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { getData, sendData };
