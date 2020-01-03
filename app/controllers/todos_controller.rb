#Handles actions as defined by Controller-Actions in rails routes.

class TodosController < ApplicationController
  def index
    todo = Todo.all.order(by: :asc)
    render json: todo
  end

  def create
    todo = Todo.create!(todo_params)
      if todo
        render json: todo
      else
        render json: todo.errors
      end
  end

  def update
    todo&.update(todo_params)
      if todo
        render json: todo
      else
        render json: todo.errors
      end
  end

  def show
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def destroy
    todo&.destroy
    render json: { message: 'Todo deleted.' }
  end

  private

  def todo_params
    params.permit(:name, :by, :tag, :details, :completed)
  end

  def todo
    @todo ||= Todo.find(params[:id])
  end
end
