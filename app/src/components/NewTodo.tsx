// Supports creation of new Todos.

import * as React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import update from "immutability-helper";

import { ActionType, ActionDispatch, Todo, DefState, DefProps } from '../constants';

class NewTodo extends React.Component<DefProps, DefState> {
  constructor(props: DefProps) {
    super(props);

    // Initialise default state of empty.
    this.state = { todo: { id: -1, name:"", by:new Date(), tag:"", completed: false } };

    // Bind actions.
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // When data field changes, update state accordingly.
  onChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: update(this.state.todo, { [field]: { $set: event.target.value }})});
  }

  // When submitted, calls the POST method of /todos to invoke the CREATE controller action, then dispatches data to Redux store for addition.
  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = "/todos";
    const { dispatch } = this.props;
    const { name, by, tag, details, completed } = this.state.todo;
    if (name.length == 0 || tag.length == 0)
      return;
    const body = { name, by, tag, details, completed };
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
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="todoName">Name</label>
                <input
                  type="text"
                  name="name"
                  id="todoName"
                  className="form-control"
                  required
                  onChange={this.onChange('name')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="todoBy">Do by</label>
                <input
                  type="date"
                  name="by"
                  id="todoBy"
                  className="form-control"
                  required
                  onChange={this.onChange('by')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="todoTag">Tag</label>
                <input
                  type="text"
                  name="tag"
                  id="todoTag"
                  className="form-control"
                  required
                  onChange={this.onChange('tag')}
                />
              </div>
              <label htmlFor="todoDetails">Details (Optional)</label>
              <textarea
                name="details"
                id="todoDetails"
                className="form-control"
                onChange={this.onChange('details')}
              />
              <button type="submit" className="btn custom-button mt-3">
                Create Todo
              </button>
              <Link to="/todos" className="btn btn-link mt-3">
                Back to Todo List
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default connect()(NewTodo);
