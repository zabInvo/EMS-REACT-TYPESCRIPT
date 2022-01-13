import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface CompanyObject {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface CompanyInterface {
  companies: Array<CompanyObject>,
  currentCompany: number | null
}

export const initialState:CompanyInterface = {
  companies: [],
  currentCompany: null,
};

const companyReducer = createSlice({
  name: "Company",
  initialState,
  reducers: {
    SET_COMPANIES(state, action:PayloadAction<Array<CompanyObject>>) {
      state.companies = action.payload;
    },
    SET_CURRENT_COMPANIES(state, action) {
      state.currentCompany = action.payload.currentCompanyId;
    },
  },
});

export const { SET_COMPANIES, SET_CURRENT_COMPANIES } = companyReducer.actions;
export default companyReducer.reducer;
