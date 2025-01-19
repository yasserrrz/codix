import React, { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import Dropdown from "../Inputs/Dropdown";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { use } from "react";

const WorkInformation = ({
  onUpdate,
  currentStep,
  steps,
  handlePrevious,
  handleNext,
}) => {
  const [formData, setFormData] = useState({
    department: "",
    jobTitle: "",
    contractDuration: "",
    contractStartDate: "",
    contractEndDate: "",
    contractAttachment: null,
    workLocation: "",
    workType: "",
    grossSalary: "",
    netSalary: "",
  });
  const [errors, setErrors] = useState({
    department: "",
    jobTitle: "",
    contractDuration: "",
    contractStartDate: "",
    contractEndDate: "",
    contractAttachment: null,
    workLocation: "",
    workType: "",
    grossSalary: "",
    netSalary: "",
  });

  const {work} = useSelector((state) => state.employee.formData)
  useEffect(() => {
    setFormData(work)
  } ,[work])

  const workLocationOptions = [
    { id: "remote", label: "Remote" },
    { id: "office", label: "Office" },
  ];
  const workTypeOptions = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
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
      if (
        name === "grossSalary" || name === "netSalary" 
      ) {
        const value = e.target.value.replace(/[^0-9][a-zA-Z]/g, "");
        e.target.value = value;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
     
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
  const isValide = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!formData.department) {
      newErrors.department = "Department is required";
      isValid = false;
    }
    if (!formData.jobTitle) {
      newErrors.jobTitle = "Job title is required";
      isValid = false;
    }
    if (!formData.contractDuration) {
      newErrors.contractDuration = "Contract duration is required";
      isValid = false;
    }
    if (!formData.contractStartDate) {
      newErrors.contractStartDate = "Contract start date is required";
      isValid = false;
    }
    if (!formData.contractEndDate) {
      newErrors.contractEndDate = "Contract end date is required";
      isValid = false;
    }
    if (!formData.contractAttachment) {
      newErrors.contractAttachment = "Contract attachment is required";
      isValid = false;
    }
    if (!formData.workLocation) {
      newErrors.workLocation = "Work location is required";
      isValid = false;
    }
    if (!formData.workType) {
      newErrors.workType = "Work type is required";
      isValid = false;
    }
    if (!formData.grossSalary || formData.grossSalary <= 0) {
      newErrors.grossSalary = "Enter a valid gross salary";
      isValid = false;
    }
    if (!formData.netSalary || formData.netSalary <= 0) {
      newErrors.netSalary = "Enter a valid net salary";
      isValid = false;
    }
    if(formData.contractStartDate > formData.contractEndDate){
      newErrors.contractStartDate = "Contract start date must be before contract end date";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!isValide()) return;
    onUpdate(formData);
    handleNext();
  };

  return (
    <div>
      <h2 className="text-2xl  my-5  mb-7 font-[700] text-[#003465] ">
        Work Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <Input
          label="Department Name"
          name="department"
          value={formData.department || ""}
          onChange={onChange}
          placeholder="Enter department"
          error={errors.department || ""}
        />
        <Input
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle || ""}
          onChange={onChange}
          placeholder="Enter job title"
          error={errors.jobTitle || ""}
        />
        <Input
          label="Contract Duration"
          name="contractDuration"
          value={formData.contractDuration || ""}
          onChange={onChange}
          placeholder="Enter contract duration"
          error={errors.contractDuration || ""}
        />
        <Input
          label="Contract Start Date"
          name="contractStartDate"
          value={formData.contractStartDate || ""}
          onChange={onChange}
          placeholder="Enter contract start date"
          type="date"
          error={errors.contractStartDate || ""}
        />
        <Input
          label="Contract End Date"
          name="contractEndDate"
          value={formData.contractEndDate || ""}
          onChange={onChange}
          type="date"
          placeholder="Enter contract end date"
          error={errors.contractEndDate || ""}
        />
        <Input
          label="Contract Attachment"
          name="contractAttachment"
          type="file"
          value={formData.contractAttachment || null }
          onChange={onChange}
          fileName={formData.contractAttachment?.name}
          placeholder="Enter contract attachment"
          error={errors.contractAttachment || ""}
        />

        <Dropdown
          label="Work Location"
          options={workLocationOptions}
          value={formData.workLocation || ""}
          name={"workLocation"}
          onChange={handleSelectChange}
          error={errors.workLocation || ""}
        />
        <Dropdown
          label="Work Type"
          options={workTypeOptions}
          name={"workType"}
          value={formData.workType || ""}
          onChange={handleSelectChange}
          error={errors.workType || ""}
        />
      </div>
      <h2 className="text-2xl  my-7 font-[700] text-[#003465] ">
        Salary Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="Gross Salary"
          name="grossSalary"
          value={formData.grossSalary || ""}
          onChange={onChange}
          placeholder="Enter salary"
          error={errors.grossSalary || ""}
        />
        <Input
          label="Net Salary"
          name="netSalary"
          value={formData.netSalary || ""}
          onChange={onChange}
          placeholder="Enter net salary"
          
          error={errors.netSalary || ""}
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
          {currentStep < steps?.length && (
            <button
              onClick={handleSubmit}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FaArrowRight color="#003465" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkInformation;
