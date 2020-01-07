// Supports viewing, toggling completion stage and deletion of Todos.

import * as React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";
import Select from "react-select";

import * as Moment from 'moment';

import { ActionType, ActionDispatch, TagOption, Tag, Todo, TodosFilter, DefProps, CompState } from '../constants';

interface IState {
    tags: Tag[];
    tagOptions: [];
    filterName: string;
    filterTag: TagOption;
}

class Todos extends React.Component<DefProps, IState> {
  constructor(props: DefProps) {
    super(props);

    // Initialise state.
    this.state = {
      tags: [],
      tagOptions: [],
      filterName: "",
      filterTag: { value:"", label:"Search by Tag" }
    };

    // Bind actions
    this.handleNameSearchChange = this.handleNameSearchChange.bind(this);
    this.handleTagSearchChange = this.handleTagSearchChange.bind(this);
    this.handleTodoFilterChange = this.handleTodoFilterChange.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  // Fetch data of all todos, then dispatches data to Redux store for initialisation.
  componentDidMount() {
    const url = "/todos";
    const { dispatch } = this.props;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .catch(() => this.props.history.push("/"))
      .then(todoJson => {
        return dispatch({ type: ActionType.INIT, todoArray: todoJson });
      })
      .then(() => dispatch({ type: ActionType.GET_FILTER }));
    const tag_url = "/tags";
    fetch(tag_url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .then(json => this.setState( { tags: json }));
  }

  // When clicked, calls the DELETE method of /todos/:id to invoke the DESTROY controller action, then dispatches data to Redux store for deletion.
  deleteTodo(todo: Todo) {
    const url = `/todos/` + todo.id;
    const { dispatch } = this.props;
    const token = document.querySelector<HTMLInputElement>('meta[name="csrf-token"]')!.getAttribute('content');
    const parsedToken = token == null ? "" : token;
    let headers = new Headers();
    headers.append('X-CSRF-Token', parsedToken);
    headers.append('Content-Type', "application/json");
    let params: RequestInit = {
      method: "DELETE",
      headers
    }
    fetch(url, params)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .catch((error: Error) => console.log(error.message))
      .then(todoJson => {
        return dispatch({ type: ActionType.DELETE, todoData: todo });
      });
  }

  // Handles filter search by name, tag and completion stage.
  handleNameSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ filterName : event.target.value });
  };

  handleTagSearchChange(event: any) {
    this.setState({ filterTag : event });
  };

  handleTodoFilterChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { dispatch } = this.props;
    dispatch({ type: ActionType.FILTER, filter: (event.target as HTMLButtonElement).value });
    /*this.setState({ todosFilter : (event.target as HTMLButtonElement).value } as Pick<IState, any>);*/
  };

  // Toggles completion state of todo, then dispatches data to Redux store for toggling.
  toggleComplete(todo: Todo) {
    const url = '/todos/' + todo.id;
    const { dispatch } = this.props;
    const completed = !todo.completed;
    var body = { completed };
    const token = document.querySelector<HTMLInputElement>('meta[name="csrf-token"]')!.getAttribute('content');
    const parsedToken = token == null ? "" : token;
    let headers = new Headers();
    headers.append('X-CSRF-Token', parsedToken);
    headers.append('Content-Type', "application/json");
    fetch(url, {
      method: "PATCH",
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
        return dispatch({ type: ActionType.TOGGLE, todoData: todo });
      });
  }

  // View of todo list with filtering. Renders alternate screen when no todos are found.
  render() {
    const { filterName, filterTag } = this.state;
    const { todos } = this.props.todoState;
    const { filterState } = this.props;
    const lowerFilterName = filterName.toLowerCase();
    const lowerFilterTag = filterTag.value.toLowerCase();
    const filteredByCompletionTodos = todos.filter((todo: Todo) => {
        if (filterState.valueOf() == TodosFilter.DONE.valueOf()) {
            return todo.completed;
        } else if (filterState.valueOf() == TodosFilter.ACTIVE.valueOf()) {
            return !todo.completed;
        } else {
            return true;
        }
    });
    const filteredByCompletionAndSearchTodos = filteredByCompletionTodos.filter((todo: Todo) => {
        return todo.tag_list.toString().toLowerCase().includes(lowerFilterTag) && todo.name.toLowerCase().includes(lowerFilterName);
    });
    const tagOptions: TagOption[] = this.state.tags.map(tag => ({ value: tag.name, label: tag.name }));
    const allTodos = filteredByCompletionAndSearchTodos.map((todo: Todo, index: number) => (
      <div key={index} className="col-md-12">
        <div className={todo.completed ? "card card-body complete b-12" : Moment().isAfter(Moment(todo.by), 'day') ?
                "card card-body overdue b-12" : "card card-body mb-12"}>
          <div className="row">
              <div className="card-title col-md-3">
                <h5>{todo.name}</h5>
              </div>
              <div className="col-md-2 font-italic">
                <p>by: {Moment(todo.by).format('DD MMM YYYY')}</p>
              </div>
              <div className="col-md-3">
                <p>Tags: {todo.tag_list.toString().replace(/,/g, ", ")} </p>
              </div>
              <div className="col-md-1">
                <Link to={`/todo/${todo.id}/edit`} className="btn custom-button"> Modify </Link>
              </div>
              <div className="col-md-1">
                <button type="button" className="btn custom-button" onClick={() => this.deleteTodo(todo)}> Delete </button>
              </div>
              <div className="col-md-1">
                <button type="button" className="btn custom-button" onClick={() => this.toggleComplete(todo)}> Toggle </button>
              </div>
          </div>
          {todo.details && todo.details != "No details given." &&
              <div>
                <p>{todo.details}</p>
              </div>
          }
        </div>
      </div>
    ));
    const noTodo = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4> No todos yet. <Link to="/todos/new">Create one?</Link> </h4>
      </div>
    );
    const tagFilter = (
      <div className="text-left mb-3 col-md-2">
        <Select value={filterTag} options={tagOptions} name="filterTag" onChange={this.handleTagSearchChange}/>
      </div>
    );

    return (
      <>
        <section className="jumbotron-fluid bg_secondary-color text-center">
          <div className="container py-5">
            <h1 className="display-4 font_primary-color">Todos</h1>
            <p className="lead font_primary-color">
              Don't push to tomorrow what you can do today.
            </p>
            <p className="lead font_primary-color">
              {Moment().format('DD MMM YYYY')}
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
              <div className="row">
                <div className="text-left mb-3 col-md-3">
                  <Link to="/todos/new" className="btn custom-button">
                    Create New Todo
                  </Link>
                </div>
                <div className="text-left mb-3 col-md-2">
                    <Link to="/" className="btn custom-button">
                      Home
                    </Link>
                </div>
                <div className="text-left mb-3 col-md-2">
                    <input value={filterName} placeholder="Search by Name" name="filterName" onChange={this.handleNameSearchChange}/>
                </div>
                {tagFilter}
                <div className="text-right mb-3 col-md-3">
                    <div className="btn-group">
                        <button type="button" className="btn custom-button" onClick={this.handleTodoFilterChange} value={TodosFilter.ACTIVE}> Active </button>
                        <button type="button" className="btn custom-button" onClick={this.handleTodoFilterChange} value={TodosFilter.DONE}> Done </button>
                        <button type="button" className="btn custom-button" onClick={this.handleTodoFilterChange} value={TodosFilter.ALL}> All </button>
                    </div>
                </div>
            </div>
            <div className="row">
              {todos.length > 0 ? allTodos : noTodo}
            </div>
          </main>
        </div>
      </>
    );
  }
}

// Maps component state to prop state.
const mapStateToProps = (state: CompState) => {
  return {
    todoState: state.todos,
    filterState: state.filter
  }
};

// Connect maps redux store state to component state.
export default connect(mapStateToProps)(Todos);