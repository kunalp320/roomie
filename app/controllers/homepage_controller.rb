class HomepageController < ApplicationController
  
  def results
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


  def index
    render 'homepage/homepage'
  end
  
end
