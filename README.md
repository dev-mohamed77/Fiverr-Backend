

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Fiver Backend
This project was implemented by Nest Js with the PostgreSQL database


## 🎨 System Design
```bash
  -src 
    - application
      - common 
      - config 
      - core 
    - domain 
      - dtos 
      - entities 
      - repositories 
      - usecases 
    - infra 
      - models 
      -repositories 
    - presentation 
      - auth 
      - categories 
      - gig 
      ... etc
```
![Screenshot from 2023-11-19 19-17-59](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/ae90509f-113c-465c-929b-140d2cb7e9cd) \
![Screenshot from 2023-11-19 19-18-24](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/982b1a46-d3bb-4a88-b154-808fb7e4418c) \
![Screenshot from 2023-11-19 19-18-44](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/285cceb5-ba96-45e8-ab68-7442683fa54c) \
![Screenshot from 2023-11-19 19-18-59](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/d1b9909c-36ab-4668-8f7a-2ee19646ffb5) \
![Screenshot from 2023-11-19 19-19-17](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/c22ccab9-f9da-4e30-84c1-1013586075ea) \
![Screenshot from 2023-11-19 19-19-45](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/52b26327-a347-4b39-98b9-3b33cfa015f1) \

## About 
  - This is an e-commerce project created using Nest.js and PostgreSQL DB. 
  - It is a RESTful application that allows seamless communication between the front-end and back-end systems. This resulted in improved performance and scalability of the application. 
  - Developed and integrated a secure user authentication and authorization system using technologies such as JSON Web Tokens (JWT) 

## Features:
  - User authentication using JWT and authorization.
  - API features added to GET methods to get ordered data.

## Contact me:
  - Email: developer.mohamed55@gmail.com
  - LinkedIn: https://www.linkedin.com/in/mohamed-abdel-nasser
  - Facebook: https://www.facebook.com/Mohamed.Abdel.Nasser8

## dependencies
  - class-validator 
  - class-transformer
  - cloudinary 
  - multer 
  - passport 
  - passport-jwt 
  - pg 
  - reflect-metadata 
  - rxjs 
  - typeorm

## Models&DB
  - Diagram link: https://dbdiagram.io/d/655a5d6c3be14957874c9d0b
![Untitled (1)](https://github.com/dev-mohamed77/Fiverr-Backend/assets/69175319/a100de9c-eda5-4c28-b8d0-c2559a4e5419)

  
  


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

