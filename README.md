# yeelight-server
An API server in NODEJS that will control multiple yeelights

## Requirements

- Yeelight bulbs
- [Enable developer mode in yeelight bulbs](http://www.yeelight.com/en_US/developer)

## What we use

- We use HAPI for API
- We use YARN for package controller
- We use yeelight-wifi as base command options
- We use babel to make this project compatible with ES6 (specially for import)
- We use bluebird for promises

## Actions

Right now the software allow us four actions:

- GET /api/v1/bulbs

Return all the bulbs connected, with the following format:

    [
      {
        "id": "ID",
        "name": "Name",
        "model": "Moduel"
      }
    ]

- POST /api/v1/bulbs/turnOn/ListOfIdsSeparatedByComma

Will turn on all the valid Id's passed as parameter (separated by comma). It will return the bulbs that has been found

    [
      {
        "id": "ID",
        "name": "Name",
        "model": "Moduel"
      }
    ]

- POST /api/v1/bulbs/turnOff/ListOfIdsSeparatedByComma

Will turn off all the valid Id's passed as parameter (separated by comma). It will return the bulbs that has been found

    [
      {
        "id": "ID",
        "name": "Name",
        "model": "Moduel"
      }
    ]

- POST /api/v1/bulbs/color/ListOfIdsSeparatedByComma/color

Will change the color on all the valid Id's passed as parameter (separated by comma). It will return the bulbs that has been found

    [
      {
        "id": "ID",
        "name": "Name",
        "model": "Moduel"
      }
    ]
