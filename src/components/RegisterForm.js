import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikContainer/FormikControl";

const RegisterForm = () => {
  const modeContacts = [
    { key: "Email", value: "email" },
    { key: "Telephone", value: "telephone" },
  ];
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    phoneNumber: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string.email("Invalid Email Format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control=""
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
            <FormikControl
              control="radio"
              type="radio"
              label="Mode of Contact"
              name="contact"
              options={modeContacts}
            />
            <FormikControl
              control="input"
              type="number"
              label="Phone Number"
              name="phoneNumber"
            />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
