require 'securerandom'
FactoryGirl.define do
  factory :user, class: User do
    name "A User"
    email {"#{SecureRandom.uuid}@email.com"}
    password "password"
  end
end
