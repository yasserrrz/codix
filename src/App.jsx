import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import NewEmployeeForm from './components/NewEmployeeForm'
import EmployeeTable from './components/EmployeeTable'
//import theme from './theme' //This line is now redundant as theme is defined below
 import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Provider store={store}>
    
        <Router>
          <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar toggleSidebar={toggleSidebar} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className=" overflow-y-hidden   mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/employees/new" element={<NewEmployeeForm />} />
                    <Route path="/employees" element={<EmployeeTable />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Router>
    
    </Provider>
  )
}

export default App