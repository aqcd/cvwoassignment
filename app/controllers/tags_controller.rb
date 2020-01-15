# Handles actions as defined by Controller-Actions in rails routes.

# This controls indexing and display of tags, which is supported by the 'acts-as-taggable-on' gem.

class TagsController < ApplicationController
  def index
    tag = ActsAsTaggableOn::Tag.all
    render json: tag
  end

  def show
    if tag
      render json: tag
    else
      render json: tag.errors
    end
  end

  private

  def tag
    @tag ||= ActsAsTaggableOn.Tag.find(params[:id])
  end
end
