/* Supports viewing and deletion of Todos. */

import React from "react";
import { Link } from "react-router-dom";

import Moment from 'moment';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterTag: "",
      todos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  /* Fetch data of all todos to populate table accordingly. */
  componentDidMount() {
    const url = "/todos";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .then(response => this.setState({ todos: response }))
      .catch(() => this.props.history.push("/"));
  }

  /* When clicked, calls the DELETE method of /todos/:id to invoke the DESTROY controller action. */
  deleteTodo(todo) {
    const url = `/todos/` + todo.id;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .then(() => window.location.reload())
      .catch(error => console.log(error.message));
  }

  /* Handles filter search. */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  /* View of todo list. Renders alternate screen when no todos are found. */
  render() {
    const { filterName, filterTag, todos } = this.state;
    const lowerFilterName = filterName.toLowerCase();
    const lowerFilterTag = filterTag.toLowerCase();
    const filteredTodos = todos.filter(todo => {
        return todo.tag.toLowerCase().includes(lowerFilterTag) && todo.name.toLowerCase().includes(lowerFilterName);
    });
    const allTodos = filteredTodos.map((todo, index) => (
      <div key={index} className="col-md-12">
        <div className="card card-body mb-12">
          <div className="row">
              <div className="card-title col-md-3">
                <h5>{todo.name}</h5>
              </div>
              <div className="col-md-3 font-italic">
                <p>by: {Moment(todo.by).format('DD MMM YYYY')}</p>
              </div>
              <div className="col-md-3">
                <p>Tag: {todo.tag}</p>
              </div>
              <div className="col-md-1">
                <Link to={`/todo/${todo.id}/edit`} className="btn-link"> Edit </Link>
              </div>
              <div className="col-md-1">
                <button type="button" className="btn-link" onClick={() => this.deleteTodo(todo)}> Delete </button>
              </div>
          </div>
          {todo.details.length > 0 &&
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

    return (
      <>
        <section className="jumbotron-fluid bg_secondary-color text-center">
          <div className="container py-5">
            <h1 className="display-4 font_primary-color">Todos</h1>
            <p className="lead font_primary-color">
              Don't push to tomorrow what you can do today.
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
                <div className="text-left mb-3 col-md-3">
                    <Link to="/" className="btn custom-button">
                      Home
                    </Link>
                </div>
                <div className="text-left mb-3 col-md-3">
                    <input value={filterName} placeholder="Search by Name" name="filterName" onChange={this.handleChange}/>
                </div>
                <div className="text-left mb-3 col-md-3">
                    <input value={filterTag} placeholder="Search by Tag" name="filterTag" onChange={this.handleChange}/>
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

export default Todos;