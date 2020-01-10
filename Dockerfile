FROM ruby:2.6.5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN apt-get -y install npm

RUN npm install -g yarn

RUN mkdir -p /todolist/app

WORKDIR /todolist/app

COPY package.json /todolist/package.json

COPY Gemfile /todolist/Gemfile
COPY Gemfile.lock /todolist/Gemfile.lock

RUN yarn install

RUN gem install bundler

RUN bundle install
COPY . /todolist/app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]