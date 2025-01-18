import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

export default function EmployeeTable() {
  const employees = useSelector((state) => state.employee.employees);
  const navigate = useNavigate();
  console.log(employees);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Employees</h1>
        <button
          onClick={() => navigate("/employees/new")}
          className="bg-[#003366] hover:bg-[#004080] flex items-center gap-2 text-white font-bold py-2 px-4 rounded-lg"
        >
          <span>Add Employee </span> <FaPlus />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-[#8a8a8a] text-white ">
            <tr>
              <th className="w-1/5 py-2 px-4 rounded-l-lg">Name</th>
              <th className="w-1/5 py-2 px-4">Email</th>
              <th className="w-1/5 py-2 px-4">Phone</th>
              <th className="w-1/5 py-2 px-4">Department</th>
              <th className="w-1/5 py-2 px-4  rounded-r-lg" >Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="py-2 px-4">{`${employee.personal.firstName} ${employee.personal.lastName}`}</td>
                <td className="py-2 px-4">{employee.personal.email}</td>
                <td className="py-2 px-4">{employee.personal.phoneNumber1}</td>
                <td className="py-2 px-4">{employee.work.department}</td>
                <td className="py-2 px-4">{employee.work.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
