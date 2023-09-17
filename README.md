# Destinations API

## Endpoints

All of the requests need an "Authorization" header with a Bearer token.

### getDestinations (GET /destinations)

- Get a list of your destinations

### getDestinationById (GET /destinations/:destinationId)

- Get the destinations with id: destinationId

### addDestination (POST /destinations)

- Add a new destination
- Through the request body, send an object with properties
  - name: string
  - description: string
  - location: string
  - country: string
  - isVisited: boolean
  - horizontalImageUrl: string
  - verticalImageUrl: string

### deleteDestinationById (DELETE /destinations/:destinationId)

- Deletes the destination with id: destinationId

### modifyDestinationById (PATCH /destinations/:destinationId)

- Modifies the isVisited property of the destination with id: destinationId
- Through the request body, send an object with the property isVisited set to the value you want it to change to (true | false).
