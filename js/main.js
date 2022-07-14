import './upload-form.js';
import { renderPhotoes } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';
import { setFilter, showFilter } from './filter.js';

const DEBOUNCE_DELAY = 500;

getData((photoes) => {
  renderPhotoes(photoes);
  showFilter();
  setFilter(debounce((filter) => renderPhotoes(photoes, filter), DEBOUNCE_DELAY));
},
showAlert);


