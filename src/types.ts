export interface DestinationStructure {
  _id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  horizontalImageUrl: string;
  verticalImageUrl: string;
  isVisited: boolean;
  user: string;
}

export interface ReceivedDestination {
  name: string;
  description: string;
  location: string;
  country: string;
  horizontalImageUrl: string;
  verticalImageUrl: string;
  isVisited: boolean;
}

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}
