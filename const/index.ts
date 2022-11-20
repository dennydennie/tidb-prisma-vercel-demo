import { Stream } from "stream";

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export interface HouseProps {
  id: string;
  photo: Stream;
  rentalFee: number;
  rentalPeriod: string;
  billsIncluded: boolean;
  securityDeposit: number;
  rooms: number;
  bathrooms: number;
  sharing: boolean;
  hasCouncilWater: boolean;
  hasBoreholeWater: boolean;
  hasElectricity: boolean;
  hasBackupElectricity: boolean;
  status: string;
  address: AddressType | undefined;
  owner: UserType | undefined;
  hasParkingSpace: boolean;
  isTilled: boolean;
  isWalled: boolean;
  hasOwnEntrance: boolean;
  hasCelling: boolean;
  hasBuiltInCupboards: boolean;
  isRequest: boolean;
}

export type AddressType = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export interface ResetPassword {
  password: string;
  token: string;
}

export interface ForgotPassword {
  email: string;
}

export interface Subscription {
  paymentReference: string;
  user: UserType;
}
export const token =
  "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODU4MjhhNC0wZDM4LTRmODktYTg3Ni1jMjAzODVmYjI4OTciLCJpYXQiOjE2Njg4NTY0NDcsImV4cCI6MTY2ODg2NjA0N30.RTmlya2ggUyqmMCcvrUgqbCWYaxSCcm740-1YFsRhZI";
