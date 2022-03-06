# Nova Talent Backend Technical Test 2022
## Description

Implement and provide the solution of a simple API to support the following hypothetical Nomination use cases:

1. Nova members can nominate their peers by providing their email, a short explanation on why the person is a good fit, and a score between 0 and 10 of: (1) the candidate's involvement with other communities, and (2) overall talent.
   - Nominations of emails that are already in the network are not accepted nor stored by the system. All the rest of the nominations of candidates are stored.
   - Stored nominations that have less than 8 in overall talent are automatically rejected and trigger an email to both the referrer and the candidate explaining the rejection.
  

2. An admin can list all the non-rejected nominations, including who is the referring Nova member.

## Installation

```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start-dev
```

## Test

```bash
$ npm run test
```

## Endpoints
```bash
#Seed users collection
GET '/api/users/seed'
```
```bash
#Seed nominations collection
GET '/api/nominations/seed'
```
```bash
#Nominate a member of Nova
POST '/api/nominations/vote'
```
```bash
#Get all the non-rejected nominations (only admins)
POST '/api/nominations/list'
```
