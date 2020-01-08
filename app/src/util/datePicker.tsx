// @ts-nocheck

import * as React from 'react';
import * as Moment from 'moment';
import DatePicker from 'react-datepicker';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
        <DatePicker {...input} defaultValue={Moment()} dateFormat="dd/MM/YYYY" selected={input.value ? Moment(input.value) : null} />
        {touched && error && <span>{error}</span>}
  </div>
);


export default renderDatePicker;