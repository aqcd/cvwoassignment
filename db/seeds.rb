# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.create(
    name: "Celebrate Christmas",
    by: DateTime.new(2019, 12, 25),
    tag_list: 'Holiday',
    details: 'Sample Todo - Todo will be coloured red when overdue.',
    completed: false
)
Todo.create(
    name: "Celebrate New Year",
    by: DateTime.new(2020, 01, 01),
    tag_list: 'Holiday',
    details: 'Sample Todo - Todo will be coloured green when toggled complete.',
    completed: true
)
Todo.create(
    name: "Celebrate Chinese New Year",
    by: DateTime.new(2020, 01, 25),
    tag_list: 'Holiday',
    details: 'Sample Todo - Select Holiday from tag search dropdown to filter by the Holiday tag.',
    completed: false
)
Todo.create(
    name: "Celebrate Labour Day",
    by: DateTime.new(2020, 05, 01),
    tag_list: 'Holiday',
    details: 'Sample Todo - Todo will be uncoloured if neither overdue nor complete.',
    completed: false
)
Todo.create(
    name: "CVWO Mid Submission",
    by: DateTime.new(2019, 12, 30),
    tag_list: 'CVWO',
    details: 'Sample Todo - You will not see this todo if you filter by Holiday or filter by active CVWO tags.',
    completed: true
)
Todo.create(
    name: "CVWO Final Submission",
    by: DateTime.new(2020, 01, 25),
    tag_list: 'CVWO',
    details: 'Sample Todo - This will be the only sample todo you see if filtered by CVWO and active.',
    completed: false
)