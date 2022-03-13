import React from "react";
// import { useFormik } from "formik";
// import { Formik, Field, Form, ErrorMessage } from "formik"
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 15) {
//     errors.firstName = "Must be 15 characters or less";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Required";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Must be 20 characters or less";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyRadio = ({ name, type, value, ...props }) => {
  const [field] = useField(props);
  return (
    // <div>
    //   <label htmlFor={props.id || props.name}>{label}</label>
    //   <input className="radio-input" {...field} {...props} />
    //   {meta.touched && meta.error ? (
    //     <div className="error">{meta.error}</div>
    //   ) : null}
    // </div>
    <label htmlFor={props.id || props.name}>
      <input className="radio-input" {...field} {...props} type="radio" />
      <span className="text-sm">{value}</span>
    </label>
  );
};

const Test1 = () => {
  // using useFormik

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //   },
  //   // validate,
  //   validationSchema: Yup.object({
  //     firstName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .required("Required"),
  //     lastName: Yup.string()
  //       .max(20, "Must be 20 characters or less")
  //       .required("Required"),
  //     email: Yup.string().email("Invalid email address").required("Required"),
  //   }),
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <>
      <h1>Subscribe !</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          colors: "",
          gender: "",
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),

          message: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          colors: Yup.string()
            .oneOf(["red", "green", "blue"], "Invalid Job Type")
            .required("Required"),
          gender: Yup.string()
            .oneOf(["male", "female"], "Invalid Gender")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <Form>
            {/* <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />

            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="message">Message</label>
            <Field name="message" type="text" as="textarea" />
            <ErrorMessage name="message" />

            <label htmlFor="message">Select Color</label>
            <Field name="colors" as="select" className="my-select">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Field>
            <ErrorMessage name="colors" /> */}
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Tima"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Chris"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="tima@gmail.com"
            />

            <MyTextInput
              label="Message"
              name="message"
              // as="textarea"
              type="text"
              placeholder="Write a message"
            />

            <MySelect label="Select Colors" name="colors">
              <option value="">Select a color</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </MySelect>

            <MyRadio label="Male" type="radio" name="gender" value="Male" />
            <MyRadio label="Female" type="radio" name="gender" value="Female" />

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Test1;
