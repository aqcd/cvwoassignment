// Redux form for editing a todo.

import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

const editTodoForm = (props:any) => {
    const { handleSubmit, data } = props;
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todoName">Name</label>
            <Field
              type="text"
              name="name"
              component="input"
              id="todoName"
              className="form-control"
              required
            />
            <label htmlFor="todoBy">Do by</label>
            <Field
              type="date"
              name="by"
              component="input"
              id="todoBy"
              className="form-control"
              required
            />
            <label htmlFor="todoTag">Tags (separate by comma)</label>
            <Field
              type="text"
              name="tag_list"
              component="input"
              id="todoTag"
              className="form-control"
              required
            />
            <label htmlFor="todoName">Details (Optional)</label>
            <Field
              name="details"
              component="input"
              id="todoDetails"
              className="form-control"
            />
            <button type="submit" className="btn custom-button mt-3">
              Edit Todo
            </button>
        </form>
    );
};

export default reduxForm({
   form: "editTodo"
})(editTodoForm);