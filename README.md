# NestJS Encryption API

REST API service built with NestJS for encrypting and decrypting payload data using AES + RSA encryption.

## Features

* NestJS REST API
* AES-256-CBC encryption
* RSA encryption/decryption
* Swagger API documentation
* Request validation
* Unit tests with Jest
* Environment variable configuration

## Requirements

* Node.js >= 18
* pnpm

## Installation

Clone repository:

```bash
git clone https://github.com/TanThivakorn/encryption-api.git
```

Enter project directory:

```bash
cd encryption-api
```

Install dependencies:

```bash
pnpm install
```


## Environment Variables

Create `.env` file in the root directory:

```env
PUBLIC_KEY="YOUR_PUBLIC_KEY"
PRIVATE_KEY="YOUR_PRIVATE_KEY"
```

You can generate RSA keys from:

https://cryptotools.net/rsagen


## Run Application

Development mode:

```bash
pnpm start:dev
```

Application will run on:

```text
http://localhost:3000
```


## Swagger API Documentation

Swagger UI available at:

```text
http://localhost:3000/api-docs
```


## API Endpoints

### POST /get-encrypt-data

Request:

```json
{
  "payload": "hello world"
}
```

Response:

```json
{
  "successful": true,
  "error_code": "",
  "data": {
    "data1": "encrypted-key",
    "data2": "encrypted-payload"
  }
}
```

### POST /get-decrypt-data

Request:

```json
{
  "data1": "encrypted-key",
  "data2": "encrypted-payload"
}
```

Response:

```json
{
  "successful": true,
  "error_code": "",
  "data": {
    "payload": "hello world"
  }
}
```

## Run Unit Tests

```bash
pnpm test
```


## Tech Stack

* NestJS
* TypeScript
* Swagger
* Jest
* Node.js Crypto


## Author

Thivakorn Ngamsree
