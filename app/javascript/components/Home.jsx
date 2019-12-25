/* Homepage. Mainly for a bit of README and potential expansion. */

import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container">
        <h1 className="display-4">Todo Organiser</h1>
        <p className="lead"> This is an application that helps the user organise and keep track of their To-dos. </p>
        <p className="lead"> Supports: basic CRUD operations, tagging </p>
        <hr className="my-4" />
        <Link
          to="/todos"
          className="btn btn-lg custom-button"
          role="button"
        >
          Take me there!
        </Link>
      </div>
    </div>
  </div>
);