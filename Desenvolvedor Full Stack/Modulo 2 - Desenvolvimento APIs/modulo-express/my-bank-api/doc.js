export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
      "description": "My Bank API description",
      "version": "1.0.0",
      "title": "My Bank API description"
    },
    "host": "localhost:3000",
    "tags": [
      {
        "name": "account",
        "description": "Account Management"
      }
    ],
    "paths": {
      "/account": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Get existing account description",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Sucessfully Operation",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Account"
                }
              }
            },
            "400": {
              "description": "Error Occureed"
            }
          }
        },
        "post": {
          "tags": [
            "account"
          ],
          "summary": "Create a new account",
          "description": "Create a new account with the received parameters",
          "consumes": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account object",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Account created"
            },
            "400": {
              "description": "Error Occureed"
            }
          }
        }
      }
    },
    "definitions": {
      "Account": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "Kevin Zamperetti Schepke"
          },
          "balance": {
            "type": "integer",
            "example": 1000
          }
        }
      }
    },
    "externalDocs": {
      "description": "Find out more about Swagger",
      "url": "http://swagger.io"
    }
  };