import './upload-form.js';
import { renderExistingPhotoes } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

window.addEventListener('load', () => {
  getData(renderExistingPhotoes, showAlert);
});
