FactoryGirl.define do
  factory :song_one, class: Song do
    title "Song1"
    duration 180
  end
  factory :song_two, class: Song do
    title "Song2"
    duration 100
  end
end
