class ApplicationController < ActionController::Base

before_action :redirect_html_requests

# homepage/index is the rails view that mounts the react application.
# Any html requests to any path will render the react application first.
def redirect_html_requests
    return unless request.format == :html
    render 'homepage/index' end

end