import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const FormikContainer = () => {
  const checkOptions = [
    { key: "option 1", value: "option1" },
    { key: "option 2", value: "option2" },
    { key: "option 3", value: "option3" },
    { key: "option 4", value: "option4" },
  ];
  const genderOptions = [
    { key: "Female", value: "female" },
    { key: "Male", value: "male" },
  ];
  const dropdownOptions = [
    { key: "Selct an option", value: "" },
    { key: "HTML", value: "HTML" },
    { key: "CSS", value: "CSS" },
    { key: "JavaScript", value: "JavaScript" },
    { key: "React", value: "React" },
  ];
  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    genderOptions: "",
    checkBoxOption: [],
    birthDate: null,
  };
  const ValidationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    genderOptions: Yup.string().required("Required"),
    checkBoxOption: Yup.array().required("Required"),
    birthDate: Yup.date().required("Required").nullable(),
  });
  const onSubmit = (values) => console.log("Form datas", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select a course"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            name="genderOptions"
            label="Gender"
            options={genderOptions}
          />
          <FormikControl
            control="checkbox"
            name="checkBoxOption"
            label="Checkbox options"
            options={checkOptions}
          />
          <FormikControl control="date" name="birthDate" label="Pick a date" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
