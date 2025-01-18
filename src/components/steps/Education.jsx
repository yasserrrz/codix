import React, { useEffect, useState } from "react";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Education = ({
  onUpdate,
  currentStep,
  handlePrevious,
  handleNext,
  steps,
}) => {
  
  const [formData, setFormData] = useState({
    degree: "",
    fieldOfStudy: "",
    institutionName: "",
    locationOfInstitution: "",
    graduationDate: "",
    gpa: "",
    startDate: "",
    endDate: "",
    certificationsAndTraining: [
      {
        name: "",
        completionDate: "",
        attachment: null,
        englishProficiency: "",
        organization: "",
      },
    ],
  });
  const [errors, setErrors] = useState({
    degree: "",
    fieldOfStudy: "",
    institutionName: "",
    locationOfInstitution: "",
    graduationDate: "",
    gpa: "",
    startDate: "",
    endDate: "",
    certificationsAndTraining: [
      {
        name: "",
        completionDate: "",
        attachment: null,
        englishProficiency: "",
        organization: "",
      },
    ],
  });
  const {education} = useSelector((state) => state.employee.formData)
  useEffect(() => {
    if (education.name &&  education.certificationsAndTraining.length > 0) {
      setFormData(education);
    }
  } , [education])
  const educationLevelOptions = [
    { id: "highschool", label: "High School" },
    { id: "bachelors", label: "Bachelor's Degree" },
    { id: "masters", label: "Master's Degree" },
    { id: "phd", label: "PhD" },
  ];
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
      if (name === "gpa") {
        const value = e.target.value.replace(/[^0-9.]/g, "");
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

  };
  const isValide = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!formData.degree) {
      newErrors.degree = "Degree is required";
      isValid = false;
    }
    if (!formData.fieldOfStudy) {
      newErrors.fieldOfStudy = "Field of study is required";
      isValid = false;
    }
    if (!formData.institutionName) {
      newErrors.institutionName = "Institution name is required";
      isValid = false;
    }
    if (!formData.locationOfInstitution) {
      newErrors.locationOfInstitution = "Location of institution is required";
      isValid = false;
    }
    if (!formData.graduationDate) {
      newErrors.graduationDate = "Graduation date is required";
      isValid = false;
    }
    if (!formData.gpa) {
      newErrors.gpa = "GPA is required";
      isValid = false;
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    }
    formData.certificationsAndTraining.forEach((certification, index) => {
      if (!certification.name) {
        newErrors.certificationsAndTraining[index].name =
          "Certification name is required";
        isValid = false;
      }
      if (!certification.completionDate) {
        newErrors.certificationsAndTraining[index].completionDate =
          "Completion date is required";
        isValid = false;
      }
      if (!certification.englishProficiency) {
        newErrors.certificationsAndTraining[index].englishProficiency =
          "English proficiency is required";
        isValid = false;
      }
      if (!certification.organization) {
        newErrors.certificationsAndTraining[index].organization =
          "Organization is required";
        isValid = false;
      }
      if (!certification.attachment) {
        newErrors.certificationsAndTraining[index].attachment =
          "Attachment is required";
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValide()) return;
    onUpdate(formData);
    handleNext();
  };
  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certificationsAndTraining: [
        ...prev.certificationsAndTraining,
        {
          name: "",
          completionDate: "",
          attachment: null,
          englishProficiency: "",
          organization: "",
        },
      ],
    }));
    setErrors((prev) => ({
      ...prev,
      certificationsAndTraining: [
        ...prev.certificationsAndTraining,
        {
          name: "",
          completionDate: "",
          attachment: null,
          englishProficiency: "",
          organization: "",
        },
      ],
    }));
  };
  const handleDeleteCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certificationsAndTraining: prev.certificationsAndTraining.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div>
      <h2 className="text-2xl  my-5  mb-7 font-[700] text-[#003465] ">
        Educational Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dropdown
          label="Degree Type"
          options={educationLevelOptions}
          value={formData.degree}
          onChange={handleSelectChange}
          name="degree"
          error={errors.degree}
        />
        <Input
          label="Field of Study"
          value={formData.fieldOfStudy}
          placeholder=" Field of study"
          onChange={onChange}
          name="fieldOfStudy"
          error={errors.fieldOfStudy}
        />
        <Input
          label="Institution Name"
          value={formData.institutionName}
          placeholder=" institution name"
          onChange={onChange}
          name="institutionName"
          error={errors.institutionName}
        />
        <Input
          label="Location of Institution"
          value={formData.locationOfInstitution}
          placeholder=" Location of institution"
          onChange={onChange}
          name="locationOfInstitution"
          error={errors.locationOfInstitution}
        />
        <Input
          label="Graduation Date"
          placeholder=" Graduation Date"
          type="date"
          value={formData.graduationDate}
          onChange={onChange}
          name="graduationDate"
          error={errors.graduationDate}
        />
        <Input
          label="Grade/GPA "
          value={formData.gpa}
          onChange={onChange}
          name="gpa"
          type="number"
          placeholder=" GPA"
          error={errors.gpa}
        />
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={onChange}
          name="startDate"
          placeholder=" Start Date"
          error={errors.startDate}
        />
        <Input
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={onChange}
          placeholder=" End Date"
          name="endDate"
          error={errors.endDate}
        />
      </div>
      <h2 className="text-2xl my-7 font-[700] text-[#003465] ">
        Certifications & Training
      </h2>

      {formData?.certificationsAndTraining?.map((item, index) => (
        <div key={index + 12335552} className="relative pt-8">
          <h3 className="text-lg font-semibold text-[#003465] mb-4">
            Certification ({index + 1})
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            key={index}
          >
            <Input
              label={"Certification Name"}
              value={item.name}
              placeholder=" Certification Name"
              onChange={(e) => {
                const updatedItems = [...formData.certificationsAndTraining];
                updatedItems[index].name = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  certificationsAndTraining: updatedItems,
                }));

                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  updatedErrors.certificationsAndTraining[index].name = "";
                  return updatedErrors;
                });
              }}
              name="name"
              error={errors.certificationsAndTraining?.[index]?.name}
            />
            <Input
              label={"Issuing Organization"}
              value={item.organization}
              placeholder=" Issuing Organization"
              onChange={(e) => {
                const updatedItems = [...formData.certificationsAndTraining];
                updatedItems[index].organization = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  certificationsAndTraining: updatedItems,
                }));
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  updatedErrors.certificationsAndTraining[index].organization =
                    "";
                  return updatedErrors;
                });
              }}
              name="organization"
              error={errors.certificationsAndTraining?.[index]?.organization}
            />
            <Input
              label={"Completion Date"}
              type="date"
              value={item.completionDate}
              placeholder=" Completion Date"
              onChange={(e) => {
                const updatedItems = [...formData.certificationsAndTraining];
                updatedItems[index].completionDate = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  certificationsAndTraining: updatedItems,
                }));
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  updatedErrors.certificationsAndTraining[
                    index
                  ].completionDate = "";
                  return updatedErrors;
                });
              }}
              name="completionDate"
              error={errors.certificationsAndTraining?.[index]?.completionDate}
            />
            <Input
              label={"Attachment"}
              type="file"
              
              onChange={(e) => {
                const updatedItems = [...formData.certificationsAndTraining];
                const file = e.target.files[0];
                updatedItems[index].attachment = {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                };
                setFormData((prev) => ({
                  ...prev,
                  certificationsAndTraining: updatedItems,
                }));
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  updatedErrors.certificationsAndTraining[index].attachment =
                    null;
                  return updatedErrors;
                });
              }}
              placeholder=" Attachment"
              fileName={item?.attachment?.name}
              name={`attachment-${index}`}
              id={`attachment-${index}`}
              error={errors.certificationsAndTraining?.[index]?.attachment}
            />
            <Input
              label={"Institution Name"}
              value={item.englishProficiency}
              placeholder=" Institution Name"
              onChange={(e) => {
                const updatedItems = [...formData.certificationsAndTraining];
                updatedItems[index].englishProficiency = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  certificationsAndTraining: updatedItems,
                }));
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  updatedErrors.certificationsAndTraining[
                    index
                  ].englishProficiency = "";
                  return updatedErrors;
                });
              }}
              name="englishProficiency"
              error={
                errors.certificationsAndTraining?.[index]?.englishProficiency
              }
            />
            {formData.certificationsAndTraining?.length > 1 && (
              <div className=" absolute top-5 right-0">
                <button
                  className="   p-2"
                  onClick={() => handleDeleteCertification(index)}
                >
                  <CiCircleRemove className="h-8 w-8 text-red-600" />
                </button>
              </div>
            )}
            {formData.certificationsAndTraining?.length === 1 && (
              <div className={`flex justify-start items-end`}>
                <button
                  className="border borde-[#E0E0E0] rounded-md text-[#B1B1B1] p-2 flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => handleAddCertification()}
                >
                  <IoAddOutline className="h-6 w-6" /> Add Certification
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {formData?.certificationsAndTraining?.length > 1 && (
        <div className="mt-6">
          <button
            className="border borde-[#E0E0E0] rounded-md text-[#B1B1B1] p-2 flex items-center gap-2 hover:bg-gray-50"
            onClick={() => handleAddCertification()}
          >
            <IoAddOutline className="h-6 w-6" /> Add Certification
          </button>
        </div>
      )}
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

export default Education;
