import { useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import { setFormData, setCurrentStep } from '../../store/employeeSlice'
import { useState } from 'react'

export default function PersonalInformation({ formData }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const newErrors = {}
    if (!data.firstName) newErrors.firstName = 'First name is required'
    if (!data.lastName) newErrors.lastName = 'Last name is required'
    if (!data.email) newErrors.email = 'Email is required'
    if (!data.phoneNumber1) newErrors.phoneNumber1 = 'Phone number is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm(formData)) {
      dispatch(setCurrentStep(2))
    }
  }

  const handleChange = (field, value) => {
    dispatch(setFormData({
      step: 1,
      data: { ...formData, [field]: value }
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="First Name"
          value={formData.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={formData.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
        />
        <TextField
          label="Email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Phone Number"
          value={formData.phoneNumber1 || ''}
          onChange={(e) => handleChange('phoneNumber1', e.target.value)}
          error={!!errors.phoneNumber1}
          helperText={errors.phoneNumber1}
          fullWidth
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}

