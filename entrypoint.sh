#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /todolist/tmp/pids/server.pid

rails db:create
rails db:migrate
rails db:seed

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"