import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { RiAttachment2 } from 'react-icons/ri'

export default function Education() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Education Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          fullWidth
          label="Degree"
          variant="outlined"
          placeholder="Bachelor's Degree"
          size="small"
        />
        <TextField
          fullWidth
          label="Field of Study"
          variant="outlined"
          placeholder="Computer Science"
          size="small"
        />
        <TextField
          fullWidth
          label="University"
          variant="outlined"
          placeholder="Cairo University"
          size="small"
        />
        <TextField
          fullWidth
          label="Graduation Year"
          type="number"
          variant="outlined"
          placeholder="2020"
          size="small"
        />
        <div className="flex gap-2">
          <TextField
            fullWidth
            label="Certificate Attachment"
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
        <TextField
          fullWidth
          label="Grade"
          variant="outlined"
          placeholder="3.5"
          size="small"
        />
      </div>
    </div>
  )
}

