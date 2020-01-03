#Validates fields that must be present

class Todo < ApplicationRecord
    validates :name, presence: true
    validates :by, presence: true
    validates :tag, presence: true
    validates :completed, inclusion: { in: [ true, false ]}
end
