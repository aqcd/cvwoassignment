import * as React from "react";
import { render } from "react-dom";
import * as $ from 'jquery';
import Popper from 'popper.js';
import App from "../components/App";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});