import { FC, useEffect } from "react";
import {
  FormInput,
  Button,
  FormSubTitle,
  FormText,
  FormTitle,
  FormWrapper,
  Link,
  Alert,
} from "..";
import { AuthActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";

interface InputValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgree: boolean;
}

const RegisterForm: FC = () => {
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(AuthActionCreators.setError(""));
    }, 1000);
  }, [error]);

  const validationSchema = yup.object().shape({
    username: yup.string().required("Введите имя"),
    email: yup.string().email("Некорректный email").required("Введите email"),
    password: yup.string().required("Введите пароль"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Введите пароль"),
  });

  if (
    !localStorage.getItem("register-email") ||
    !localStorage.getItem("register-username")
  ) {
    localStorage.setItem("register-username", "");
    localStorage.setItem("register-email", "");
  }
  return (
    <>
      {error && <Alert>{error}</Alert>}
      <FormWrapper>
        <FormTitle>Регистрация</FormTitle>
        <FormSubTitle>Введите пожалуйста свои данные</FormSubTitle>
        <Formik
          initialValues={{
            username: localStorage.getItem("register-username")!,
            email: localStorage.getItem("register-email")!,
            password: "",
            confirmPassword: "",
            isAgree: true,
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={(
            values: InputValues,
            formikHelpers: FormikHelpers<InputValues>
          ) => {
            localStorage.setItem("login-email", values.email);
            dispatch(
              AuthActionCreators.registration(
                values.username,
                values.email,
                values.confirmPassword
              )
            );
            formikHelpers.setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            errors,
            values,
            isSubmitting,
          }: FormikProps<InputValues>) => (
            <Form>
              <FormInput
                type={`text`}
                name={`username`}
                label={"Ваше имя"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={
                  touched.username && errors.username && errors.username
                }
              />
              <FormInput
                type={`email`}
                name={`email`}
                label={"Email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email && errors.email}
              />
              <FormInput
                type={`password`}
                name={`password`}
                label={"Пароль"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <FormInput
                type={`password`}
                name={`confirmPassword`}
                label={"Повторите пароль"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Зарегестрироваться
              </Button>
            </Form>
          )}
        </Formik>
        <FormText>
          Есть аккаунт? <Link to="/auth/login">Войти</Link>
        </FormText>
      </FormWrapper>
    </>
  );
};

export default RegisterForm;
