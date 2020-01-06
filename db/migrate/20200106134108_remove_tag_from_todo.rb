class RemoveTagFromTodo < ActiveRecord::Migration[6.0]
  def change
    remove_column :todos, :tag, :string
  end
end
