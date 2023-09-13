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
  __v?: number;
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
