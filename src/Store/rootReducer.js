import { combineReducers } from '@reduxjs/toolkit';
import formFields from './formFields';
import requestReporter from './requestReporter';

export default combineReducers({
  formFields,
  requestReporter
});
