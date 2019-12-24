# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do |i|
  Todo.create(
    name: "Todo #{i + 1}",
    by: DateTime.new(2020, 12, 31),
    tag: 'Example',
    details: 'Sample Todo'
  )
end