import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ScoreInput } from "../../components/ScoreInput";

interface RegisterFormProps {
    registerToken: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ registerToken }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation("register", (username: string) => {
        return axios.post<AuthData>("/public/finalregistration", null, {
            headers: { Authorization: registerToken },
            params: { username: username },
        });
    });

    return (
        <Formik
            initialValues={{ username: "", score: 0 }}
            validationSchema={yup.object({
                username: yup.string().min(5).max(20).required(),
                score: yup.number().min(0).max(30).required(),
            })}
            onSubmit={async ({ username }, { setSubmitting }) => {
                setSubmitting(true);
                const response = await mutateAsync(username);
                if (response.data.isRegistered) {
                    login(response.data.token);
                    navigate("/");
                } else {
                    navigate("/login");
                }
                setSubmitting(false);
            }}
        >
            <Form className="flex flex-col grow gap-5">
                <label>Username</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" />
                <ScoreInput name="score" />
                <button type="submit" className="button bg-primary-action">
                    Register
                </button>
            </Form>
        </Formik>
    );
};

export default RegisterForm;
