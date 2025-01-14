import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function Payroll() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payroll Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          fullWidth
          label="Bank Name"
          variant="outlined"
          placeholder="Bank Name"
          size="small"
        />
        <TextField
          fullWidth
          label="Bank Branch"
          variant="outlined"
          placeholder="Branch Name"
          size="small"
        />
        <TextField
          fullWidth
          label="Account Number"
          variant="outlined"
          placeholder="Account Number"
          size="small"
        />
        <TextField
          fullWidth
          label="IBAN"
          variant="outlined"
          placeholder="IBAN Number"
          size="small"
        />
        <FormControl fullWidth size="small">
          <InputLabel>Payment Method</InputLabel>
          <Select label="Payment Method" defaultValue="">
            <MenuItem value="bank">Bank Transfer</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Payment Date"
          type="number"
          variant="outlined"
          placeholder="Day of month"
          size="small"
        />
      </div>
    </div>
  )
}

