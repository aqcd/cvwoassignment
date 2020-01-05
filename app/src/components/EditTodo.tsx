/* Supports editing of Todos. */

import * as React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import * as Moment from 'moment';
import update from "immutability-helper";

import { ActionType, ActionDispatch, Todo, DefState, MatchProps, AppState } from '../constants';


class EditTodo extends React.Component<MatchProps, DefState> {
  constructor(props: MatchProps) {
    super(props);
    /* Set default state of empty. */
    this.state = { todo: { id: -1, name:"", by:new Date(), tag:"", completed: false } };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* Fetch data of specific todo to pre-fill fields accordingly. */
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { dispatch } = this.props;
    dispatch({ type: ActionType.GET });
    const index = this.props.todos.findIndex(todo => todo.id.toString() === id!.toString());
    this.setState({ todo: this.props.todos[index] })
  }

  /* When data field changes, update state accordingly. */
  onChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: update(this.state.todo, { [field]: { $set: event.target.value }})});
    /* this.setState({ [field]: event.target.value } as Pick<DefState, any>); */
  }

  /* When submitted, calls the PUT method of /todos/:id to invoke the UPDATE controller action. */
  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = '/todos/' + this.state.todo.id;
    const { dispatch } = this.props;
    const { name, by, tag, details } = this.state.todo;
    if (name.length == 0 || tag.length == 0)
      return;
    const body = { name, by, tag, details };
    const token = document.querySelector<HTMLInputElement>('meta[name="csrf-token"]')!.getAttribute('content');
    const parsedToken = token == null ? "" : token;
    let headers = new Headers();
    headers.append('X-CSRF-Token', parsedToken);
    headers.append('Content-Type', "application/json");
    fetch(url, {
      method: "PUT",
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
        return dispatch({ type: ActionType.EDIT, todoData: todoJson });
      })
      .then(() => this.props.history.push(`/todos`));
  }

  /* Form for user to fill. */
  render() {
    const { todo } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit Todo
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="todoName">Name</label>
                <input
                  type="text"
                  name="name"
                  id="todoName"
                  className="form-control"
                  value={todo.name}
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
                  value={Moment(todo.by).format('YYYY-MM-DD')}
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
                  value={todo.tag}
                  required
                  onChange={this.onChange('tag')}
                />
              </div>
              <label htmlFor="todoDetails">Details (Optional)</label>
              <textarea
                name="details"
                id="todoDetails"
                className="form-control"
                value={todo.details}
                onChange={this.onChange('details')}
              />
              <button type="submit" className="btn custom-button mt-3">
                Edit Todo
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

const mapStateToProps = (state: AppState) => {
  return {
    todos: state.todos
  }
};

export default connect(mapStateToProps)(EditTodo);