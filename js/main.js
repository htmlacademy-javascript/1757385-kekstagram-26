import { createDescriptions } from './data.js';
import { checkMaxLength } from './utils.js';
import { COMMENT_MAX_LENGTH, DESCRIPTIONS_COUNT } from './setup.js';

checkMaxLength('Авада Кедавра', COMMENT_MAX_LENGTH);
const descriptions = createDescriptions(DESCRIPTIONS_COUNT);
if(descriptions.length < 0) { // Stub for linter
}
