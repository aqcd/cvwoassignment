// Supports editing of Todos.

import * as React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import * as Moment from 'moment';
import update from "immutability-helper";

import { ActionType, ActionDispatch, Todo, DefState, MatchProps, CompState } from '../constants';

class EditTodo extends React.Component<MatchProps, DefState> {
  constructor(props: MatchProps) {
    super(props);
    // Initialise default state of empty.
    this.state = { todo: { id: -1, name:"", by:new Date(), tag_list:[], completed: false } };

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

  // Fetch data of specific todo to pre-fill fields accordingly.
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { dispatch } = this.props;
    dispatch({ type: ActionType.GET });
    const index = this.props.todoState.todos.findIndex(todo => todo.id.toString() === id!.toString());
    this.setState({ todo: this.props.todoState.todos[index] })
    //this.setState({ todo: update(this.state.todo, { tag_list: { $set: this.props.todoState.todos[index].tag_list.toString().replace(/,/g, ", ") }})});
  }

  // When data field changes, update state accordingly.
  onChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: update(this.state.todo, { [field]: { $set: event.target.value }})});
    /* this.setState({ [field]: event.target.value } as Pick<DefState, any>); */
  }

  // When submitted, calls the PUT method of /todos/:id to invoke the UPDATE controller action, then dispatches data to Redux store for updating.
  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = '/todos/' + this.state.todo.id;
    const { dispatch } = this.props;
    const { name, by, tag_list, details } = this.state.todo;
    if (name.length == 0)
      return;
    const body = { name, by, tag_list, details };
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

  // Form for user to fill.
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
                <label htmlFor="todoTag">Tags (separate by comma)</label>
                <input
                  type="text"
                  name="tag_list"
                  id="todoTag"
                  className="form-control"
                  value={todo.tag_list.toString()}
                  required
                  onChange={this.onChange('tag_list')}
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

// Maps component state to prop state.
const mapStateToProps = (state: CompState) => {
  return {
    todoState: state.todos
  }
};

// Connect maps redux store state to component state.
export default connect(mapStateToProps)(EditTodo);