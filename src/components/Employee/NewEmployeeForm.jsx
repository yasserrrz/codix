import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import {
  RiArrowRightSLine,
  RiCloseLine,
} from "react-icons/ri";

import PersonalInformation from "./PersonalInformation";
import WorkInformation from "./WorkInformation";
import Education from "./Education";
import Payroll from "./Payroll";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addEmployee, resetForm, setFormData } from "../../store/employeeSlice";
import Modal from "../Modal/Modal";
import { BiCheck } from "react-icons/bi";

export default function NewEmployeeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // pay roll state (last step)
  const [payRollData, setPayRollData] = useState({
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountHolderName: "",
    paymenFrequency: "",
    insuranceDeductionsType: "",
    insuranceDeductionsAmount: "",
    taxDeducationAmount: "",
  });
  const [errors, setErrors] = useState({
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountHolderName: "",
    paymenFrequency: "",
    insuranceDeductionsType: "",
    insuranceDeductionsAmount: "",
  });
  const isValide = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!payRollData.bankName) {
      newErrors.bankName = "Bank name is required";
      isValid = false;
    }
    if (!payRollData.branchName) {
      newErrors.branchName = "Branch name is required";
      isValid = false;
    }
    if (!payRollData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    }
    if (!payRollData.accountHolderName) {
      newErrors.accountHolderName = "Account holder name is required";
      isValid = false;
    }

    if (!payRollData.paymenFrequency) {
      newErrors.paymenFrequency = "Payment frequency is required";
      isValid = false;
    }
    if (!payRollData.insuranceDeductionsType) {
      newErrors.insuranceDeductionsType =
        "Insurance deductions type is required";
      isValid = false;
    }
    if (!payRollData.insuranceDeductionsAmount) {
      newErrors.insuranceDeductionsAmount =
        "Insurance deductions amount is required";
      isValid = false;
    }

    if (!payRollData.taxDeducationAmount) {
      newErrors.taxDeducationAmount = "Tax deductions amount is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      setShowIncomplete(true);
      return;
    }
    console.log(payRollData);
    console.log(errors);
    if (!isValide()) return;
    dispatch(
      setFormData({ step: steps[currentStep - 1].name, data: payRollData })
    );
    dispatch(addEmployee());
    setShowSuccess(true);
  };

  const steps = [
    {
      number: 1,
      title: "Personal Information",
      name: "personal",
      component: PersonalInformation,
    },
    {
      number: 2,
      title: "Work Information",
      name: "work",
      component: WorkInformation,
    },
    { number: 3, title: "Education", name: "education", component: Education },
    { number: 4, title: "Payroll", name: "payRoll", component: Payroll },
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
  const handleDiscard = () => {
    dispatch(resetForm());
    navigate("/");
    setShowWarning(false);
  };
  
  const handleSuccess = () => {
    dispatch(resetForm());
    navigate("/");
    setShowSuccess(false);
  };
  const handleCreateNew = () => {
    dispatch(resetForm());
    navigate("/new");
    setCurrentStep(1);
    setShowSuccess(false);
  }
  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="overflow-auto bg-white p-4 md:p-6 w-full rounded-xl shadow-[0px_4px_20px_0px_#6666661A]">
      {/* breadcrumb and Actions */}
      <div className="flex flex-col py-4 border-b border-gray-200 w-full md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center text-sm mb-4 md:mb-0">
          <Link
            to="/"
            className="text-gray-500 font-bold text-[16px] md:text-[18px] lg:text-[22px]"
          >
            All Employees
          </Link>
          <RiArrowRightSLine className="mx-2 text-gray-400 font-bold text-[16px] md:text-[18px] lg:text-[22px]" />
          <span className="text-[16px] md:text-[18px] lg:text-[22px] text-[#003465] font-bold">
            New
          </span>
        </div>
        <div className="flex w-full md:w-auto gap-3 justify-end">
          <button
            onClick={()=>{
              setShowWarning(true)
            }}
            className="px-8 py-2 text-sm border  border-[#003366]  rounded-md hover:bg-[#003366d8] hover:border-[#003366d8] hover:text-white transition"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 text-sm font-semibold border border-[#003366] text-white bg-[#003366] rounded-md hover:bg-blue-900"
          >
            Save
          </button>
        </div>
      </div>

      <div className="w-full justify-center flex flex-wrap mb-8 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center mb-4 md:mb-0">
            <div className="flex flex-col items-center justify-center">
              <div
                className={`flex items-center justify-center text-center w-8 h-8 rounded-full border-2 shadow-[0px_2px_4px_0px_#04147C26] ${
                  currentStep > step.number
                    ? "border-green-500 text-green-500 bg-transparent"
                    : currentStep === step.number
                    ? "border-green-500 bg-[#F6F6F6] text-green-500"
                    : "border-[#ffffff]  text-gray-400 bg-[#F6F6F6]"
                }`}
              >
                {" "}
                {currentStep > step.number ? (
                  <FaRegCheckCircle className="w-[18px] h-[18px]" />
                ) : (
                  step.number
                )}
              </div>
              <p className="text-sm text-nowrap font-medium mt-2 text-[#637D92] hidden md:block">
                {step.title}
              </p>
            </div>
            <div className="w-full flex align-center h-[50%]">
              {index < steps.length - 1 && (
                <div className="w-full md:w-24 h-[2px]  mx-2 flex content-start">
                  <div
                    className={`w-full h-[2px] ${
                      currentStep > step.number
                        ? "bg-green-500"
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`w-full h-[2px] border-t-2 ${
                        currentStep > step.number
                          ? "border-green-500"
                          : "border-gray-200 border-dashed"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Current Step Form */}
      {steps[currentStep - 1].title.toLowerCase() === "payroll" ? (
        <Payroll
          stepKey={steps[currentStep - 1].title.toLowerCase().replace(" ", "")}
          onUpdate={(data) =>
            dispatch(
              setFormData({
                step: steps[currentStep - 1].name,
                data,
              })
            )
          }
          formData={payRollData}
          errors={errors}
          setErrors={setErrors}
          setFormData={setPayRollData}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          steps={steps}
          currentStep={currentStep}
        />
      ) : (
        <>
          <CurrentStepComponent
            stepKey={steps[currentStep - 1].title
              .toLowerCase()
              .replace(" ", "")}
            onUpdate={(data) =>
              dispatch(
                setFormData({
                  step: steps[currentStep - 1].name,
                  data,
                })
              )
            }
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            steps={steps}
            currentStep={currentStep}
          />
        </>
      )}

      {/* Alert Modals */}
      <Modal isOpen={showWarning} setIsOpen={setShowWarning}>
        <div className="flex justify-between">
          <h2 className="text-[#FF0024] font-bold text-lg">Warning:</h2>
          <button
            onClick={() => setShowWarning(false)}
            className="  border rounded-md text-[#003366] border-[#003366] hover:bg-[#003366d8] hover:text-white transition"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>
        <p className=" text-gray-700 my-4">
          Cancelling now will delete all entered information. Proceed?
        </p>
        <div className="pt-3 flex justify-end gap-3">
          <button
            onClick={() => handleDiscard()}
            className="px-8 py-2 text-sm border  border-[#003366]  rounded-lg hover:bg-[#003366d8] hover:text-white transition"
          >
            Discard
          </button>
          <button
             onClick={() => handleDiscard()}
            className="px-8 py-2 text-sm font-semibold text-white bg-[#003366] rounded-lg hover:bg-blue-900"
          >
            Save and Exit
          </button>
        </div>
      </Modal>
      <Modal isOpen={showIncomplete} setIsOpen={setShowIncomplete}>
        <div className="flex justify-between">
          <h2 className="text-[#003366] font-bold text-lg">
            Profile Incomplete:
          </h2>
          <button
            onClick={() => setShowIncomplete(false)}
            className="  border rounded-md text-[#003366] border-[#003366] hover:bg-[#003366d8] hover:text-white transition"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>
        <p className=" text-gray-700 my-4">
          The profile is incomplete. Do you want to save your progress and
          finish later, or discard your changes?
        </p>
        <div className="pt-3 flex justify-end  gap-3">
          <button
            onClick={() => handleDiscard()}
            className="px-8 py-2 text-sm border  border-[#003366]  rounded-lg hover:bg-[#003366d8] hover:text-white transition"
          >
            Discard
          </button>
          <button
            onClick={() => setShowIncomplete(false)}
            className="px-8 py-2 text-sm font-semibold text-white bg-[#003366] rounded-lg hover:bg-blue-900"
          >
            Finish Later
          </button>
        </div>
      </Modal>
      <Modal isOpen={showSuccess} setIsOpen={setShowSuccess}>
        <div className="flex justify-between">
          <h2 className="text-[#04B051] font-bold text-lg flex items-center">
            <BiCheck className="h-8 w-8 text-[#04B051]" />{" "}
            <span className="">Success</span>
          </h2>
          <button
            onClick={() => setShowSuccess(false)}
            className="  border rounded-md  text-[#003366] border-[#003366] hover:bg-[#003366d8] hover:text-white transition"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>
        <p className=" text-gray-700 my-4">
          The employee profile has been created successfuly{" "}
        </p>
        <div className="pt-3 flex justify-end  gap-3">
          <button
            onClick={handleSuccess}
            className="px-4 py-2 text-sm border  border-[#003366]  rounded-lg hover:bg-[#003366d8] hover:text-white transition"
          >
            View Profile
          </button>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#003366] rounded-lg hover:bg-blue-900"
          >
            Create Another Employee
          </button>
        </div>
      </Modal>
    </div>
  );
}
