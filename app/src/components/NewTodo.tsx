// Supports creation of new Todos.

import * as React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import update from "immutability-helper";

import { ActionType, ActionDispatch, Todo, EmptyState, DefProps, CompState } from '../constants';
import NewTodoForm from '../forms/newTodoForm';

class NewTodo extends React.Component<DefProps, EmptyState> {
  constructor(props: DefProps) {
    super(props);

    // Bind actions.
    this.onSubmit = this.onSubmit.bind(this);
  }

  // When submitted, calls the POST method of /todos to invoke the CREATE controller action, then dispatches data to Redux store for addition.
  onSubmit(values:any) {
    const url = "/todos";
    const { dispatch } = this.props;
    const { name, by, tag_list, details } = values;
    const completed = false;
    if (name.length == 0)
      return;
    const body = { name, by, tag_list, details, completed };
    const token = document.querySelector<HTMLInputElement>('meta[name="csrf-token"]')!.getAttribute('content');
    const parsedToken = token == null ? "" : token;
    let headers = new Headers();
    headers.append('X-CSRF-Token', parsedToken);
    headers.append('Content-Type', "application/json");
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .catch((error: Error) => console.log(error.message))
      .then(todoJson => {
        return dispatch({ type: ActionType.ADD, todoArray: todoJson });
      })
      .then(() => this.props.history.push(`/todos`));
  }

  // Form for user to fill.
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add Todo
            </h1>
            <NewTodoForm onSubmit={this.onSubmit} />
            <Link to="/todos" className="btn btn-link mt-3">
              Back to Todo List
            </Link>
          </div>
        </div>
      </div>
    );
  }

}

// Maps component state to prop state.
const mapStateToProps = (state: CompState) => {
  return {
    formState: state.form
  }
};

// Connect maps redux store state to component state.
export default connect(mapStateToProps)(NewTodo);
