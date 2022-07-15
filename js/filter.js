const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FilterType = {
  DEFAULT: 1,
  RANDOM: 2,
  DISCUSSED: 3
};

const imageFiltersForm = document.querySelector('.img-filters__form');
let curActiveButton = imageFiltersForm.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

function setFilter(callback) {
  imageFiltersForm.addEventListener('click', (evt) => {
    if(evt.target.matches('.img-filters__button')) {
      changeActive(evt.target);
      const newFilterType = evt.target.id.substring(evt.target.id.indexOf('-') + 1).toUpperCase();
      callback(FilterType[newFilterType]);
    }
  });
}

function changeActive(newActiveButton) {
  curActiveButton.classList.remove(ACTIVE_BUTTON_CLASS);
  newActiveButton.classList.add(ACTIVE_BUTTON_CLASS);
  curActiveButton = newActiveButton;
}

function showFilter() {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

export { showFilter, setFilter, FilterType };
