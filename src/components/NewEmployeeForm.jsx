import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import Alert from './alerts/Alert';
import PersonalInformation from './steps/PersonalInformation';
import WorkInformation from './steps/WorkInformation';
import Education from './steps/Education';
import Payroll from './steps/Payroll';

export default function NewEmployeeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Information', component: PersonalInformation },
    { number: 2, title: 'Work Information', component: WorkInformation },
    { number: 3, title: 'Education', component: Education },
    { number: 4, title: 'Payroll', component: Payroll },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Alert Modals */}
      <Alert
        type="warning"
        message="Warning you will lose all changes if you leave now. I suggest"
        show={showWarning}
        onClose={() => setShowWarning(false)}
        onAction={() => setShowWarning(false)}
        actionText="Understand"
      />
      <Alert
        type="incomplete"
        message="Please complete your profile to get better job matches"
        show={showIncomplete}
        onClose={() => setShowIncomplete(false)}
        onAction={() => setShowIncomplete(false)}
        actionText="Complete"
      />
      <Alert
        type="success"
        message="The employee profile has been created successfully"
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        onAction={() => setShowSuccess(false)}
        actionText="Create another Employee"
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center text-sm">
          <Link to="/employees" className="text-gray-500">All Employees</Link>
          <RiArrowRightSLine className="mx-2 text-gray-400" />
          <span className="text-blue-600">New</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowWarning(true)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Discard
          </button>
          <button 
            onClick={() => setShowIncomplete(true)}
            className="px-4 py-2 text-sm text-white bg-[#003366] rounded-md hover:bg-blue-900"
          >
            Save
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col items-center md:flex-row md:justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center mb-4 md:mb-0">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2
              ${currentStep >= step.number 
                ? 'border-[#003366] bg-[#003366] text-white' 
                : 'border-gray-300 text-gray-400'}
            `}>
              {step.number}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-8 md:w-24 h-[2px] mx-4
                ${currentStep > step.number ? 'bg-[#003366]' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <CurrentStepComponent />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button 
            onClick={handlePrevious}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <RiArrowLeftLine className="mr-2" />
            Previous
          </button>
        )}
        {currentStep < steps.length && (
          <button 
            onClick={handleNext}
            className="flex items-center text-sm text-[#003366] hover:text-blue-900 ml-auto"
          >
            Next
            <RiArrowRightLine className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
