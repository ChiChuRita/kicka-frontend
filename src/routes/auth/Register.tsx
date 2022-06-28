import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const formValidation = yup.object().shape({
    username: yup.string().min(5).max(25).required(),
});

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "" }}
                validationSchema={formValidation}
                onSubmit={() => {
                    //TODO submit to server register
                    console.log("submit");
                }}
            >
                {() => (
                    <Form className="flex flex-col gap-5 text-black">
                        <Field name="username" type="text" />
                        <ErrorMessage name="username" />
                        <button className="button" type="submit">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
