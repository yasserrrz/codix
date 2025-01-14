import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { FaPlus } from 'react-icons/fa'

export default function EmployeeTable() {
  const employees = useSelector(state => state.employee.employees)
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Employees</h1>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => navigate('/employees/new')}
          className="bg-blue-600"
        >
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  {`${employee.step1.firstName} ${employee.step1.lastName}`}
                </TableCell>
                <TableCell>{employee.step1.email}</TableCell>
                <TableCell>{employee.step1.phoneNumber1}</TableCell>
                <TableCell>{employee.step2.department}</TableCell>
                <TableCell>{employee.step2.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

