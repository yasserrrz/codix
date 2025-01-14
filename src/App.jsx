import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NewEmployeeForm from './components/NewEmployeeForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E5E7EB',
            },
            '&:hover fieldset': {
              borderColor: '#D1D5DB',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 lg:ml-64">
            <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="pt-16">
              <Routes>
                <Route path="/employees/new" element={<NewEmployeeForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
