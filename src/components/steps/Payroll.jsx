import React, { useEffect, useState } from "react";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { use } from "react";
import { useSelector } from "react-redux";

const Payroll = ({
  onUpdate,
  currentStep,
  handlePrevious,
  handleNext,
  steps,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const {payRoll} = useSelector((state) => state.employee.formData);
  useEffect(() => {
    if (payRoll) {
      setFormData((prev) => ({
        ...prev,
        ...payRoll,
      }));
    }
  } , [payRoll])
  const insuranceDeductionsTypeOptions = [
    { id: "none", label: "None" },
    { id: "percentage", label: "Percentage" },
    { id: "fixedAmount", label: "Fixed Amount" },
  ];
  const paymenFrequencyOptions = [
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
    { id: "annually", label: "Annually" },
  ];
  const onChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      console.log(file);
      setFormData((prev) => ({
        ...prev,
        [name]: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      }));
    } else {
      if (name === "accountNumber") {
        const value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }

    console.log(formData);
  };
  const handleSelectChange = (name, option) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option.id,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl  my-5  mb-7 font-[700] text-[#003465] ">
        Payroll
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="Bank Name"
          placeholder="Bank Name"
          name="bankName"
          value={formData?.bankName}
          onChange={onChange}
          error={errors.bankName}
        />
        <Input
          label="Branch Name"
          name="branchName"
          placeholder="Enter Branch Name"
          value={formData?.branchName}
          onChange={onChange}
          error={errors.branchName}
        />
        <Input
          label="Account Holder’s Name"
          name="accountHolderName"
          value={formData?.accountHolderName}
          onChange={onChange}
          placeholder="Enter Account Holder’s Name"
          error={errors.accountHolderName}
        />
        <Input
          label="Account Number"
          name="accountNumber"
          placeholder="Enter Account Number"
          value={formData?.accountNumber}
          onChange={onChange}
          error={errors.accountNumber}
        />
      </div>
      <div className="my-8 text-lg font-[400] text-[#003465] ">
        To have the employee complete this data,{" "}
        <span className="text-[#4C99FD] text-xl capitalize  font-medium">
          <a href="http://" target="_blank">
            click here
          </a>
        </span>{" "}
        to send an email.
      </div>
      <h2 className="text-2xl  my-5  mb-7 font-[700] text-[#003465] ">
        Deductions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dropdown
          label={"Payment Frequency"}
          options={paymenFrequencyOptions}
          name="paymenFrequency"
          value={formData?.paymenFrequency}
          onChange={handleSelectChange}
          error={errors.paymenFrequency}
        />
        <Input
          label="Insurance Deductions Amount (%) "
          name="insuranceDeductionsAmount"
          value={formData?.insuranceDeductionsAmount}
          placeholder="Enter Insurance Deductions Amount %"
          onChange={onChange}
          error={errors.insuranceDeductionsAmount}
        />
        <Input
          label="Tax Deductions Amount (%) "
          name="taxDeducationAmount"
          placeholder="Enter Tax Deductions Amount %"
          value={formData?.taxDeducationAmount}
          onChange={onChange}
          error={errors.taxDeducationAmount}
        />
        <Dropdown
          label="Insurance Deductions Type"
          options={insuranceDeductionsTypeOptions}
          name="insuranceDeductionsType"
          value={formData?.insuranceDeductionsType}
          onChange={handleSelectChange}
          error={errors.insuranceDeductionsType}
        />
      </div>
      <div className="w-full flex justify-end z-30   mt-6">
        <div className="flex gap-2 mt-6">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FaArrowLeft color="#003465" />
            </button>
          )}
          
          
        </div>
      </div>
    </div>
  );
};

export default Payroll;
