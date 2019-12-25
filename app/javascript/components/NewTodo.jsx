/* Supports creation of new Todos. */

import React from "react";
import { Link } from "react-router-dom";

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    /* Set default state of empty. */
    this.state = {
      name: "",
      by: new Date(),
      tag: "",
      details: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* When data field changes, update state accordingly. */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /* When submitted, calls the POST method of /todos to invoke the CREATE controller action. */
  onSubmit(event) {
    event.preventDefault();
    const url = "/todos";
    const { name, by, tag, details } = this.state;

    if (name.length == 0 || tag.length == 0)
      return;

    const body = { name, by, tag, details };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error.");
      })
      .then(response => this.props.history.push(`/todos`))
      .catch(error => console.log(error.message));
  }

  /* Form for user to fill. */
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </div>
              <label htmlFor="todoDetails">Details (Optional)</label>
              <textarea
                name="details"
                id="todoDetails"
                className="form-control"
                rows="3"
                onChange={this.onChange}
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

export default NewTodo;
