class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.date :by, null: false
      t.string :tag, null: false
      t.text :details, default: 'No details given.'
      t.timestamps
    end
  end
end
