require 'yelp'
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
    redirect_to 'results/results'
  end

  def form
    @name = "Kunal"
  end

  def index
    render 'homepage/homepage'
  end

  def profile
    @name = "Suren"
    render 'profile/profile'
  end

  def prefs
    puts params
    Location.delete_all()
    all_data = params[:here]
    length = params[:length].to_i
    (0..(length - 1)).each {|i|
      coords = all_data[i.to_s]
      _s_lat = coords["0"][0]
      _s_long = coords["0"][1]
      _n_lat = coords["1"][0]
      _n_long = coords["1"][1]
      naw = Location.new(
        nw_lat: _n_lat, 
        nw_long: _n_long,
        se_lat: _s_lat,
        se_long: _s_long)
      naw.save
    }
    return render json: 'success'    
  end

  def yelp_prefs
    client = Yelp::Client.new({ consumer_key: "PBa1QqMWZhEn-axbRVGHjA",
                            consumer_secret: "oHOXxfWO-oFL9_KX_5eClacM-M0",
                            token: "7NH18JReQfACGZFSK8PdjSMQ7S6abdL-",
                            token_secret: "aAZgRxWPxxrpzc8xVWF6gm0zIJQ"
                          })
    type = params[:type]
    params = { term: type,
           limit: 20
         }
    
    locale = { lang: 'en' }
    
    response = client.search('San Francisco', params, locale)

    data = []

    response.businesses.each do |position|
      if position.location.has_key?("coordinate")
        
        lat = position.location.coordinate.latitude
        long = position.location.coordinate.longitude
        data << {lat: lat, long: long, title: position.name + "  (#{type})"}
      end
    end
    puts data
    render json: data
  end
  
end
