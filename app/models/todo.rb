#Validates fields that must be present

class Todo < ApplicationRecord
    acts_as_taggable_on :tags
    validates :name, presence: true
    validates :by, presence: true
    validates :completed, inclusion: { in: [ true, false ]}
end
