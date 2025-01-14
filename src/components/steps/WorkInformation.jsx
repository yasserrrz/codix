import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { RiAttachment2 } from 'react-icons/ri'

export default function WorkInformation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TextField
          fullWidth
          label="Department Name"
          variant="outlined"
          placeholder="Social Media"
          size="small"
        />
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          placeholder="Manager"
          size="small"
        />
        <TextField
          fullWidth
          label="Contract Duration"
          variant="outlined"
          placeholder="All"
          size="small"
        />
        <TextField
          fullWidth
          label="Contract Start Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Contract End Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <div className="flex gap-2">
          <TextField
            fullWidth
            label="Contract Attachment"
            variant="outlined"
            placeholder="Attach"
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
          <button className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
            <RiAttachment2 className="w-5 h-5" />
          </button>
        </div>
        <FormControl fullWidth size="small">
          <InputLabel>Work Location</InputLabel>
          <Select label="Work Location" defaultValue="">
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Work Type</InputLabel>
          <Select label="Work Type" defaultValue="">
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
          </Select>
        </FormControl>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Salary Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          fullWidth
          label="Gross Salary"
          variant="outlined"
          placeholder="10"
          size="small"
        />
        <TextField
          fullWidth
          label="Net Salary"
          variant="outlined"
          placeholder="10"
          size="small"
        />
      </div>
    </div>
  )
}

