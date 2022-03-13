import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  firstName: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  socials: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [" "],
};

const savedValues = {
  firstName: "Fatima",
  email: "savetes@gmail.com",
  channel: "KraksTV",
  comments: "Today is Friday sha",
  address: "33, ilesanmi street",
  socials: {
    facebook: "fatty",
    twitter: "fati01",
  },
  phoneNumbers: ["", ""],
  phNumbers: [" "],
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Formsubmit", values);
  onSubmitProps.setSubmitting(false);
  //reset submit with formikpractice
  onSubmitProps.resetForm();
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  channel: Yup.string().required("Required!"),
  // comments: Yup.string().required("Required!"),
  // address: Yup.string().required("Required!"),
  // facebook: Yup.string().required("Required!"),
  // twitter: Yup.string().required("Required!"),
  // phoneNumbers: Yup.number().required("Required!"),
});

const YoutubeForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="firstName">Name</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" id="facebook" name="socials.facebook" />
              <ErrorMessage name="socials.facebook" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <Field type="text" id="twitter" name="socials.twitter" />
              <ErrorMessage name="socials.twitter" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="PrimaryNumber">Primary Phone Number</label>
              <Field type="text" id="PrimaryNumber" name="phoneNumbers[0]" />
              <ErrorMessage name="phoneNumbers" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="SecondaryNumber">Secondary Phone Number</label>
              <Field type="text" id="SecondaryNumber" name="phoneNumbers[1]" />
              <ErrorMessage name="phoneNumbers" component={TextError} />
            </div>

            {/* using custom component hooked with formik */}
            {/* render props pattern */}
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
            </div>

            <div className="form-control">
              <label>List of Phone Numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  console.log("fieldArrayProps", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field type="text" name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="submit" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="submit" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button type="reset">Reset</button>
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load Saved Data
            </button>
            <button
              type="submit"
              disabled={!(formik.isValid || formik.isSubmitting)}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
