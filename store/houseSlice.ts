import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "store";

export type HouseState = {
  address?: AddressType | undefined;
  rooms?: number;
  bathrooms?: number;
  hasElectricity?: boolean;
  hasCouncilWater?: boolean;
  isSharing?: boolean;
  status?: string;
  hasBoreholeWater?: boolean;
  hasBackupElectricity?: boolean;
  hasParking?: boolean;
  isTilled?: boolean;
  hasOwnEntrance?: boolean;
  hasCelling?: boolean;
  basBuitInCupboards?: boolean;
  isRequest?: boolean;
  hasBuiltInCupboards?: boolean;
  isWalled?: boolean;
  rentalFee?: number;
  securityDeposit?: number;
  billsIncluded?: boolean;
  rentalPeriod?: string;
};
const initialState: HouseState = {
  address: undefined,
  rooms: 0,
  bathrooms: 0,
  hasElectricity: false,
  hasCouncilWater: false,
  isSharing: false,
  status: "",
  hasBoreholeWater: false,
  hasBackupElectricity: false,
  hasParking: false,
  isTilled: false,
  hasOwnEntrance: false,
  hasCelling: false,
  basBuitInCupboards: false,
  isRequest: false,
  hasBuiltInCupboards: false,
  isWalled: false,
  rentalFee: 0,
  securityDeposit: 0,
  billsIncluded: false,
  rentalPeriod: "",
};
// create a slice
export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    updateHouseState(state, action) {
      Object.assign(state, action.payload);
    },
    clearHouseState(state, action) {
      return initialState;
    },
  },
});

// export the action
export const { updateHouseState, clearHouseState } = houseSlice.actions;

export const selectHouseState = (state: AppState) => state.house

export default houseSlice.reducer


export interface AddressType {
  city: string;
  location: string;
  street: string;
  houseNumber: string;
}

export interface UserType {
  name: string;
  phone: string;
  email: string;
}
