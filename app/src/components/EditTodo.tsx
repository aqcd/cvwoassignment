// Supports editing of Todos.

import * as React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import * as Moment from 'moment';
import update from "immutability-helper";

import { ActionType, ActionDispatch, Todo, EmptyState, MatchProps, CompState } from '../constants';
import EditTodoForm from '../forms/editTodoForm';

class EditTodo extends React.Component<MatchProps, EmptyState> {
  constructor(props: MatchProps) {
    super(props);

    // Bind actions.
    this.onSubmit = this.onSubmit.bind(this);
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
    //const index = this.props.todoState.todos.findIndex(todo => todo.id.toString() === id!.toString());
    //dispatch({ type: ActionType.INIT_FORM, todoData: this.props.todoState.todos[index] })
    //this.setState({ todo: update(this.state.todo, { tag_list: { $set: this.props.todoState.todos[index].tag_list.toString().replace(/,/g, ", ") }})});
  }

  // When data field changes, update state accordingly.
  /* onChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todo: update(this.state.todo, { [field]: { $set: event.target.value }})});
    /* this.setState({ [field]: event.target.value } as Pick<DefState, any>);
  }*/

  // When submitted, calls the PUT method of /todos/:id to invoke the UPDATE controller action, then dispatches data to Redux store for updating.
  onSubmit(values:any) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = '/todos/' + id;
    const { dispatch } = this.props;
    const { name, by, tag_list, details } = values;
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
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const index = this.props.todoState.todos.findIndex(todo => todo.id.toString() === id!.toString());
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit Todo
            </h1>
            <EditTodoForm onSubmit={this.onSubmit} initialValues={this.props.todoState.todos[index]}/>
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
    formState: state.form,
    todoState: state.todos
  }
};

// Connect maps redux store state to component state.
export default connect(mapStateToProps)(EditTodo);