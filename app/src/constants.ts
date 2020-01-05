import { History, LocationState } from "history";
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";

export interface Todo {
    id: number;
    name: string;
    by: Date;
    tag: string;
    details?: string;
    completed: boolean;
}

export interface DefState {
    todo: Todo;
}

export interface DefProps {
    todos: Todo[];
    dispatch: Function;
    history: History<LocationState>;
}

interface MatchParams {
    id?: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
    todos: Todo[];
    dispatch: Function;
    history: History<LocationState>;
}

export enum ActionType {
    INIT, GET, ADD, EDIT, DELETE, TOGGLE
}

export enum TodosFilter {
    All = '',
    Completed = 'completed',
    Incomplete = 'incomplete'
}

export interface ActionDispatch {
  type: ActionType,
  todoData?: Todo,
  todoArray?: Todo[]
}

export interface store {

}

export interface AppState {
    todos: Todo[]
}