import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  formData: {
    personal: {
      firstName: '',
      lastName: '',
      middleName: '',
      gender: '',
      dateOfBirth: '',
      age: '',
      nationality: '',
      nationalityId: '',
      nationalIdAttachment: null,
      militaryStatus: '',
      maritalStatus: '',
      city: '',
      address: '',
      email: '',
      phoneNumber1: '',
      phoneNumber2: '',
      socialInsuranceNumber: '',
    },
    work: {
      department: '',
      jobTitle: '',
      contractDuration: '',
      contractStartDate: '',
      contractEndDate: '',
      contractAttachment: null,
      workLocation: '',
      workType: '',
      grossSalary: '',
      netSalary: '',
    },
    education: {
      degree: '',
      fieldOfStudy: '',
      institutionName: '',
      locationOfInstitution: '',
      graduationDate: '',
      gpa: '',
      startDate: '',
      endDate: '',
      certificationsAndTraining: [
        {
          name: '',
          completionDate: '',
          attachment: null,
          englishProficiency: '',
          organization: ''
        }
      ]
    },
    payRoll: {
      bankName: "",
      branchName: "",
      accountNumber: "",
      accountHolderName: "",
      paymenFrequency: "",
      insuranceDeductionsType: "",
      insuranceDeductionsAmount: "",
      taxDeducationAmount: "",
    }
  },
  currentStep: 1
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state) => {
      state.employees.push({ ...state.formData })
    },
    setFormData: (state, action) => {
      const { step, data } = action.payload
      
      
      switch (step) {
        case 'personal':
          state.formData.personal = { ...state.formData.personal, ...data }
          break
        case 'work':
          state.formData.work = { ...state.formData.work, ...data }
          break
        case 'education':
          state.formData.education = { ...state.formData.education, ...data }
          break
        case 'payRoll':
          state.formData.payRoll = { ...state.formData.payRoll, ...data }
          break
        default:
          throw new Error(`Invalid step: ${step}`)
      }
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
