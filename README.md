# Verida Account Explorer

This is a new application designed to show the public profile of any user on the Verida network

## Install

```
yarn install
```
or
```
npm install
```

## Build

```
yarn build
```
or

```
npm run build
```


## Run

```
yarn serve
```
or 
```
npm run serve
```


## Deployment

Deployment happens automatically on merge to `main`. See https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/

Releases are automically tagged and built on pushes to `main` using a github action. Version numbers used for the tags generated automatically by increasing the patch number by one.
