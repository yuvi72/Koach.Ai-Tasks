# Koach.Ai-Tasks

## Task - 1

# S3 File Storage Lambda Function

This repository contains an AWS Lambda function that interacts with an Amazon S3 bucket to handle JSON file uploads and retrievals.

## Overview

The Lambda function supports two HTTP methods:
- `POST`: To upload a JSON file to the specified S3 bucket.
- `GET`: To retrieve a list of the latest JSON files from the S3 bucket.

## Prerequisites

- An AWS account.
- An S3 bucket (the bucket name should be configured in the code).
- AWS SDK for JavaScript (v2.x) installed.

## Setup

1. **Clone this repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install AWS SDK**:

   Ensure you have the AWS SDK installed. You can install it using npm if you haven't done so already:

   ```bash
   npm install aws-sdk
   ```

3. **Configure AWS Credentials**:

   Make sure your AWS credentials are configured. You can set them up using the AWS CLI or directly in the `~/.aws/credentials` file.

4. **Set Up Environment Variables** (Optional):

   You may want to set environment variables for the bucket name instead of hardcoding it in the code. This can be done directly in your Lambda function configuration or locally.

## Usage

### POST Method

To upload a JSON file, send a POST request to the API Gateway endpoint with a JSON body. The file will be saved in the specified S3 bucket with a unique filename.

```http
POST https://<api-gateway-endpoint>
Content-Type: application/json

{
  "key1": "value1",
  "key2": "value2"
}
```

**Response Example**:

```json
{
  "e_tag": "\"<e-tag>\"",
  "url": "https://renyzaro.s3.amazonaws.com/file_<timestamp>.json"
}
```

### GET Method

To retrieve the list of JSON files, send a GET request to the API endpoint.

```http
GET https://<api-gateway-endpoint>
```

**Response Example**:

```json
[
  {
    "key1": "value1",
    "key2": "value2"
  },
  ...
]
```

### Error Handling

- If a method other than `POST` or `GET` is called, the function will return a 405 Method Not Allowed response.
- If an error occurs during the process, a 500 Internal Server Error response will be returned.

## Development

To locally test the function, you may use tools like the AWS SAM CLI or a local server to simulate API Gateway requests. Remember to adjust permissions for the Lambda function to allow it access to your S3 bucket.


# Task -2

# Event Scheduling Service

This repository contains a simple event scheduling service built with TypeScript and Express. The service allows users to add events to a schedule while ensuring that there are no overlapping events.

## Overview

The service provides a RESTful API with the following endpoints:

- **POST /events**: Add a new event to the schedule.
- **GET /events**: Retrieve all scheduled events.

The service ensures that events do not overlap and validates the time inputs.

## Prerequisites

- Node.js (v12 or higher recommended)
- TypeScript
- Express (library for building the server)
- Body-parser (for handling JSON request bodies)

## Installation

1. **Clone this repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:

   Make sure you have `npm` installed, then run:

   ```bash
   npm install
   ```

3. **Compile TypeScript**:

   You may need to compile your TypeScript files if you are using the TypeScript compiler. You can do this using the following command:

   ```bash
   npx tsc
   ```

## Usage

### Starting the Server

To start the Express server, run:

```bash
node build/server.js
```

The server will be accessible at `http://localhost:8080`.

### Adding an Event

To add a new event, send a POST request to `/events` with a JSON body containing the `startTime` and `endTime`. The times should be in 24-hour format, with values between `0` and `23`.

#### Request Example:

```http
POST http://localhost:8080/events
Content-Type: application/json

{
  "startTime": 10,
  "endTime": 12
}
```

#### Successful Response:

```json
{
  "message": "Event added successfully"
}
```

#### Error Response (If Overlapping or Invalid):

```json
{
  "error": "Event overlaps with an existing event or has invalid times"
}
```

### Retrieving Events

To retrieve all events, send a GET request to `/events`.

#### Request Example:

```http
GET http://localhost:8080/events
```

#### Response Example:

```json
[
  {
    "startTime": 10,
    "endTime": 12
  },
  ...
]
```

## Code Structure

- **Scheduler.ts**: Contains the `Scheduler` class, which implements the logic for adding and retrieving scheduled events. It validates time ranges and checks for overlapping events.
- **server.ts**: Sets up the Express server, defines the API routes, and includes middleware for parsing JSON request bodies.

## Error Handling

The service returns appropriate HTTP status codes for different scenarios:
- `201 Created`: Event added successfully.
- `409 Conflict`: Event overlaps with an existing event or has invalid start and end times.
- `400 Bad Request`: Invalid input for start and end times.

## Developer Notes

- This project is a simple example of scheduling functionality and can be expanded with more features, such as persistent storage (e.g., a database) for events, user authentication, or more complex event properties.
- Make sure to handle your TypeScript configuration and dependencies correctly to avoid issues during compilation and runtime.

