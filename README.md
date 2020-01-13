# README

## CVWO Assignment AY2019/2020

### Personal Details

Name: Shi Jing Lin

Matriculation: A0201495J


Demo: https://peaceful-reef-56596.herokuapp.com/
    
## Dependencies
1. Ruby (>=2.6.5)
1. Rails (>=6.0.2.1)
1. npm (>=13.2.0)
1. yarn (>=1.19.2)
1. gem (>=3.1.2)
1. React (>=16.11.0)
1. psql (>=12.1)
1. TypeScript (>=3.7.4)

## Setup
1. Install dependencies.
    ```
    $ yarn install
    ```

1. Install gems.
    ```
    $ bundle
    ```
   
1. Create database.
    ```
    $ rails db:create
    ```

1. Migrate database.
    ```
    $ rails db:migrate
    ```

1. Seed database.
    ```
    $ rails db:seed
    ```
   
1. Compile TypeScript.
   ```
   $ yarn tsc -p app/
   ``` 

1. Start the server.
    ```
    $ rails s --binding=127.0.0.1
    ```

1. Go to URL.
    ```
    http://localhost:3000/
    ```
   

## Docker

### Build Container
1. Build via docker-compose.
    ```
    $ docker-compose build
    ```

   then
    ```
    $ docker-compose up -d --force-recreate
    ```
   
   then
    ```
    $ docker-compose up
    ```

1. Go to URL.
    ```
    http://localhost:3000/
    ```

### Delete Container
1. To remove container, first kill the containers.
    ```
    docker rm $(docker ps -a -q) -f
    ```

1. Delete volumes (requires confirmation).
    ```
    docker volume prune
    ```

1. Check that there are no containers or volumes left.
    ```
    docker ps -a
    ```
   and
    ```
    docker volume ls
    ```
   should both return empty tables.