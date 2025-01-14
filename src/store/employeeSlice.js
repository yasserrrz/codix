import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  formData: {
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  },
  currentStep: 1
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
    },
    setFormData: (state, action) => {
      const { step, data } = action.payload
      state.formData[`step${step}`] = data
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.currentStep = 1
    }
  }
})

export const { addEmployee, setFormData, setCurrentStep, resetForm } = employeeSlice.actions
export default employeeSlice.reducer

