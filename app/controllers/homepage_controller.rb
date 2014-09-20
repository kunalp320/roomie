class HomepageController < ApplicationController
  
  def results
    @name = "Kunal"
    @people = [ {name: "Kunal", hobbies: "Sports"},
                {name: "Suren", hobbies: "Coding"},
                {name: "Chris", hobbies: "FSU"},
                {name: "Daniel", hobbies: "UI"},
                {name: "Kunal", hobbies: "Sports"},
                {name: "Suren", hobbies: "Coding"},
                {name: "Chris", hobbies: "FSU"},
                {name: "Daniel", hobbies: "UI"},
              ]
    render 'results/results'
  end

  def form
    @name = "Kunal"
  end

  def index
    render 'homepage/homepage'
  end

  def profile
    render 'profile/profile'
  end
  
end
