# Fuzzy Token Finder

An application made to store files and have a fuzzy text search.

For now the fuzzy text search is using the **Trigram Algorithm**

Next Iterations
* Cosine Algorithm
* Levenshtein Algorithm
* Dice's Coefficient
* Siamese Networks

# TODO:
## Infra
* Docker compose for dev env
    * Add psql and s3 (localstack)
    * Add container for both app and api
* Prod dockerfile for both app and api

## Deployment
* Github actions for publishing docker images

## API
* Update endpoint
* Tag search

## App
* Tag Search
* Details pane
* Responsive design