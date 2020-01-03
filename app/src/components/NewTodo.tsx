/* Supports creation of new Todos. */

import * as React from "react";
import { History, LocationState } from "history";
import { Link } from "react-router-dom";

interface NewTodoProps {
    history: History<LocationState>;
}

interface NewTodoState {
    name: string;
    by: Date;
    tag: string;
    details?: string;
    completed: boolean;
}

class NewTodo extends React.Component<NewTodoProps, NewTodoState> {
  constructor(props: NewTodoProps) {
    super(props);
    /* Set default state of empty. */
    this.state  = {
      name: "",
      by: new Date(),
      tag: "",
      details: "",
      completed: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str: string) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* When data field changes, update state accordingly. */
  onChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [field]: event.target.value } as Pick<NewTodoState, any>);
  }

  /* When submitted, calls the POST method of /todos to invoke the CREATE controller action. */
  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = "/todos";
    const { name, by, tag, details, completed } = this.state;
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
      .then(response => this.props.history.push(`/todos`))
      .catch((error: Error) => console.log(error.message));
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

export default NewTodo;
