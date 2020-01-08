// @ts-nocheck

import * as React from 'react';
import * as Moment from 'moment';
import DatePicker from 'react-datepicker';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <DatePicker {...input} defaultValue={new Date()} dateFormat="yyyy-MM-dd" />
        {touched && error && <span>{error}</span>}
  </div>
);


export default renderDatePicker;