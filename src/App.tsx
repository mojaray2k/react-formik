import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from "formik";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import * as yup from "yup";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

/**
 * @function MyRadio
 * @param {object} props
 * @returns {html}
 */
const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

/**
 * @function MyTextField
 * @param {object} props
 * @returns {html}
 */
const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup.string().required().min(2),
  // pets: yup.array().of(
  //   yup.object({
  //     name: yup.string().required(),
  //   })
  // ),
});

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "Goldie" }],
        }}
        validationSchema={validationSchema}
        // validate={(values) => {
        //   const errors: Record<string, string> = {};
        //   if (values.firstName.includes("Amen")) {
        //     errors.firstName = "no Amen";
        //   }
        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {/* 
              What goes into a field component
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              /> 
            */}
            <div>
              {/* 
                <Field
                  placeholder="First Name"
                  as={TextField}
                  name="firstName"
                  type="input"
                /> 
              */}
              <MyTextField
                placeholder="First Name"
                name="firstName"
                type="input"
              />
            </div>
            <div>
              <Field
                placeholder="Last Name"
                as={TextField}
                name="lastName"
                type="input"
              />
            </div>
            <div>
              <Field name="isTall" type="checkbox" as={Checkbox} />
            </div>
            <div>cookies</div>
            <div>
              <Field
                name="cookies"
                value="Chocolate Chip"
                type="checkbox"
                as={Checkbox}
              />
              <Field
                name="cookies"
                value="Almond"
                type="checkbox"
                as={Checkbox}
              />
              <Field
                name="cookies"
                value="sugar"
                type="checkbox"
                as={Checkbox}
              />
            </div>
            <div>yogurt</div>
            <div>
              {/* <Field name="yogurt" value="blueberry" type="radio" as={Radio} /> */}
              <MyRadio
                name="yogurt"
                value="blueberry"
                type="radio"
                label="blueberry"
              />
              <MyRadio name="yogurt" value="apple" type="radio" label="apple" />
              <MyRadio
                name="yogurt"
                value="strawberry"
                type="radio"
                label="strawberry"
              />
            </div>
            <div>
              <FieldArray name="pets">
                {(arrayHelpers) => (
                  <div>
                    {values.pets.map((pet) => {
                      return (
                        <div key={pet.name}>
                          <MyTextField placeholder="pet name" name="" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
