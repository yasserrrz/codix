import React, { useEffect, useState } from "react";

import Dropdown from "../Inputs/Dropdown";
import Input from "../Inputs/Input";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const PersonalInformation = ({
  onUpdate,
  currentStep,
  handlePrevious,
  handleNext,
  steps,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    nationalityId: "",
    nationalIdAttachment: null,
    militaryStatus: "",
    maritalStatus: "",
    city: "",
    address: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
    socialInsuranceNumber: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    nationalityId: "",
    nationalIdAttachment: "",
    militaryStatus: "",
    maritalStatus: "",
    city: "",
    address: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
    socialInsuranceNumber: "",
  });
  const {personal } = useSelector((state) => state.employee.formData);
  useEffect(() => {
    if (personal) {
      setFormData(personal);
    }
  } , [personal]);
  const genderOptions = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
  ];

  const maritalStatusOptions = [
    { id: "single", label: "Single" },
    { id: "married", label: "Married" },
    { id: "divorced", label: "Divorced" },
  ];
  const militaryOptions = [
    {id:"exepted",label:"Expected"},
    {id:"active",label:"Active"},
    {id:"inactive",label:"Inactive"},
  ];

  const onChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      console.log(file);
      setFormData((prev) => ({
        ...prev,
        [name]:{
          name: file.name,
          size: file.size,
          type: file.type,
        } ,
      }));
    } else {
      if (
        name === "nationalityId" ||
        name === "socialInsuranceNumber" ||
        name === "phoneNumber1" ||
        name === "phoneNumber2"
      ) {
        const value = e.target.value.replace(/[^0-9 +]/g, "");
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
  const isValide = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.middleName) {
      newErrors.middleName = "Middle name is required";
      isValid = false;
    }
    if (!formData.age || formData.age <= 0 || formData.age > 100) {
      newErrors.age = "Enter a valid age";
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }
    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
      isValid = false;
    }
    if (!formData.nationalityId) {
      newErrors.nationalityId = "Nationality ID is required";
      isValid = false;
    }
    if (!formData.nationalIdAttachment) {
      newErrors.nationalIdAttachment = "National ID attachment is required";
      isValid = false;
    }
    if (!formData.militaryStatus) {
      newErrors.militaryStatus = "Military status is required";
      isValid = false;
    }
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    if (!formData.phoneNumber1) {
      newErrors.phoneNumber1 = "Phone number 1 is required";
      isValid = false;
    }
    if (!formData.socialInsuranceNumber) {
      newErrors.socialInsuranceNumber = "Social insurance number is required";
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
        General Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="First Name"
          value={formData.firstName || ""}
          name="firstName"
          onChange={onChange}
          placeholder="Enter first name"
          error={errors.firstName ? errors.firstName : ""}
        />
        <Input
          label="Middle Name"
          name="middleName"
          value={formData.middleName || ""}
          onChange={onChange}
          placeholder="Enter middle name"
          error={errors.middleName ? errors.middleName : ""}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName || ""}
          onChange={onChange}
          placeholder="Enter last name"
          error={errors.lastName ? errors.lastName : ""}
        />
        <Dropdown
          label="Gender"
          name="gender"
          options={genderOptions}
          value={formData.gender || ""}
          onChange={handleSelectChange}
          error={errors.gender ? errors.gender : ""}
        />
        <Input
          label="Age"
          type="number"
          value={formData.age || ""}
          onChange={onChange}
          placeholder="Enter age"
          name="age"
          error={errors.age ? errors.age : ""}
        />
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth || ""}
          onChange={onChange}
          placeholder="Enter date of birth"
          error={errors.dateOfBirth ? errors.dateOfBirth : ""}
        />
        <Input
          label="Nationality"
          name="nationality"
          value={formData.nationality || ""}
          onChange={onChange}
          placeholder="Enter nationality"
          error={errors.nationality ? errors.nationality : ""}
        />
        <Input
          label="National ID"
          name="nationalityId"
          onChange={onChange}
          value={formData.nationalityId || ""}
          placeholder="Enter national ID"
          error={errors.nationalityId ? errors.nationalityId : ""}
        />
        <Input
          label="National ID Attachment"
          name="nationalIdAttachment"
          type="file"
          value={formData.nationalIdAttachment || null}
          onChange={onChange}
          fileName={formData.nationalIdAttachment?.name}
          error={errors.nationalIdAttachment ? errors.nationalIdAttachment : ""}
        />
        <Dropdown
          label="Marital Status"
          options={maritalStatusOptions}
          name="maritalStatus"
          value={formData.maritalStatus || ""}
          onChange={handleSelectChange}
          error={errors.maritalStatus ? errors.maritalStatus : ""}
        />
        <Dropdown
          label="Military Status"
          options={militaryOptions}
          name="militaryStatus"
          value={formData.militaryStatus || ""}
          onChange={handleSelectChange}
          error={errors.militaryStatus ? errors.militaryStatus : ""}
        />
        <Input
          label="City"
          name="city"
          value={formData.city || ""}
          onChange={onChange}
          placeholder="Enter city"
          error={errors.city ? errors.city : ""}
        />
        <Input
          label="Address"
          name="address"
          value={formData.address || ""}
          onChange={onChange}
          placeholder="Enter address"
          error={errors.address ? errors.address : ""}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={onChange}
          placeholder="Enter email"
          error={errors.email ? errors.email : ""}
        />
        <Input
          label="Phone Number 1"
          name="phoneNumber1"
          value={formData.phoneNumber1 || ""}
          onChange={onChange}
          placeholder="Enter phone number 1"
          error={errors.phoneNumber1 ? errors.phoneNumber1 : ""}
        />
        <Input
          label="Phone Number 2"
          name="phoneNumber2"
          value={formData.phoneNumber2 || ""}
          onChange={onChange}
          placeholder="Enter phone number 2"
          error={errors.phoneNumber2 ? errors.phoneNumber2 : ""}
        />
        <Input
          label="Social Insurance Number"
          name="socialInsuranceNumber"
          value={formData.socialInsuranceNumber || ""}
          onChange={onChange}
          placeholder="Enter social insurance number"
          error={
            errors.socialInsuranceNumber ? errors.socialInsuranceNumber : ""
          }
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

export default PersonalInformation;
