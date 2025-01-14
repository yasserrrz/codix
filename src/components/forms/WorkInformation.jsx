import { useDispatch } from 'react-redux'
import { TextField, MenuItem } from '@mui/material'
import { setFormData, setCurrentStep } from '../../store/employeeSlice'
import { useState } from 'react'

export default function WorkInformation({ formData }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const newErrors = {}
    if (!data.department) newErrors.department = 'Department is required'
    if (!data.position) newErrors.position = 'Position is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm(formData)) {
      dispatch(setCurrentStep(3))
    }
  }

  const handleBack = () => {
    dispatch(setCurrentStep(1))
  }

  const handleChange = (field, value) => {
    dispatch(setFormData({
      step: 2,
      data: { ...formData, [field]: value }
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Work Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          select
          label="Department"
          value={formData.department || ''}
          onChange={(e) => handleChange('department', e.target.value)}
          error={!!errors.department}
          helperText={errors.department}
          fullWidth
        >
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </TextField>
        
        <TextField
          select
          label="Position"
          value={formData.position || ''}
          onChange={(e) => handleChange('position', e.target.value)}
          error={!!errors.position}
          helperText={errors.position}
          fullWidth
        >
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Analyst">Analyst</MenuItem>
        </TextField>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
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


