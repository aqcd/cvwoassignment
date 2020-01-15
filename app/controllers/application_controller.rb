class ApplicationController < ActionController::Base

before_action :redirect_html_requests

# homepage/index is the rails view that mounts the react application.
# Any html requests to any path will render the react application first.
# This fixes the bug where refreshing the Todo page only displays the json.
def redirect_html_requests
    return unless request.format == :html
    render 'homepage/index' end

end