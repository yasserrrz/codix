import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { RiAttachment2 } from 'react-icons/ri'

export default function PersonalInformation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">General Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          placeholder="Mohamed"
          size="small"
        />
        <TextField
          fullWidth
          label="Middle Name"
          variant="outlined"
          placeholder="Ali"
          size="small"
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          placeholder="Ali"
          size="small"
        />
        <FormControl fullWidth size="small">
          <InputLabel>Gender</InputLabel>
          <Select label="Gender" defaultValue="">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Age"
          variant="outlined"
          type="number"
          placeholder="40"
          size="small"
        />
        <TextField
          fullWidth
          label="Date of Birth"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <TextField
          fullWidth
          label="Nationality"
          variant="outlined"
          placeholder="Egyptian"
          size="small"
        />
        <TextField
          fullWidth
          label="National ID"
          variant="outlined"
          placeholder="20320231032145"
          size="small"
        />
        <div className="flex gap-2">
          <TextField
            fullWidth
            label="National ID Attachment"
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
          <InputLabel>Military Status</InputLabel>
          <Select label="Military Status" defaultValue="">
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="exempted">Exempted</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Marital Status</InputLabel>
          <Select label="Marital Status" defaultValue="">
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          placeholder="Cairo"
          size="small"
        />
        <div className="col-span-full">
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            placeholder="Cairo, Egypt"
            size="small"
          />
        </div>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          placeholder="example@email.com"
          size="small"
        />
        <TextField
          fullWidth
          label="Phone Number 1"
          variant="outlined"
          placeholder="(+20) 1232365632"
          size="small"
        />
        <TextField
          fullWidth
          label="Phone Number 2"
          variant="outlined"
          placeholder="(+20) 1232365632"
          size="small"
        />
        <TextField
          fullWidth
          label="Social Insurance Number"
          variant="outlined"
          placeholder="234 657 984"
          size="small"
        />
      </div>
    </div>
  )
}

