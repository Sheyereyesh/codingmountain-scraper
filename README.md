# Coding mountain assessment
  - git clone https://github.com/Sheyereyesh/codingmountain-scraper.git
  - cd codingmountain-scraper
# server
  - npm install
  - create .env file  with content
        DB_NAME=database_name
        DB_PASSWORD=
        DB_USER=root
        DB_HOST=127.0.0.1
  - npx sequelize-cli db:migrate
  - npm start
# client
  - cd client
  - npm install
  - npm start
