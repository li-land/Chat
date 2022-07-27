import { FC, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import {
  Button,
  FormTitle,
  FormSubTitle,
  FormWrapper,
  FormText,
  FormInput,
  Link,
  Alert,
} from "..";
import { AuthActionCreators } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface InputValues {
  email: string;
  password: string;
}
const LoginForm: FC = () => {
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(AuthActionCreators.setError(""));
    }, 1000);
  }, [error]);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Некорректный email").required("Введите email"),
    password: yup.string().required("Введите пароль"),
  });

  if (!localStorage.getItem("login-email")) {
    localStorage.setItem("login-email", "");
  }

  return (
    <>
      {error && <Alert>{error}</Alert>}
      <FormWrapper>
        <FormTitle>Добро пожаловать</FormTitle>
        <FormSubTitle>Введите пожалуйста данные для входа в чат</FormSubTitle>
        <Formik
          initialValues={{
            email: localStorage.getItem("login-email")!,
            password: "",
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={(
            values: InputValues,
            formikHelpers: FormikHelpers<InputValues>
          ) => {
            localStorage.setItem("login-email", values.email);
            dispatch(AuthActionCreators.login(values.email, values.password));
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
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Войти
              </Button>
            </Form>
          )}
        </Formik>
        <FormText>
          Нет аккаунта? <Link to="/auth/registration">Зарегистрироваться</Link>
        </FormText>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
