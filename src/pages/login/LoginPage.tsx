import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "../../utils/validations";
import { FiMail, FiLock, FiInfo } from "react-icons/fi";
import { InputField } from "../../components/form";
import { Button, Loader } from "../../components/ui";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(
      login({
        email: values.email.trim(),
        password: values.password.trim(),
      }),
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    toast("Use email: admin@test.com and password: 123456", {
      duration: 10000,
      position: "top-center",
      icon: <FiInfo />,
      style: {
        background: "#ebf8ff",
        color: "#1d4ed8",
        fontWeight: "500",
      },
    });
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen w-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="bg-white dark:bg-gray-800 dark:border dark:border-white p-8 m-10 shadow-xl rounded-xl max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Welcome Back
                </h2>
                <p className="text-gray-500 text-sm mt-1 dark:text-white">
                  Please login to your account
                </p>
              </div>

              <div className="space-y-5 mb-5">
                <div>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    prefixIcon={<FiMail />}
                    className="dark:placeholder:text-gray-400 dark:text-white dark:bg-gray-800"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    prefixIcon={<FiLock />}
                    className="dark:placeholder:text-gray-400 dark:text-white dark:bg-gray-800"
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="mt-2 !w-full">
                  {!loading ? (
                    "Login"
                  ) : (
                    <span className="flex gap-2.5">
                      <Loader size={25} color="white" className="!py-0" />
                      Login
                    </span>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default LoginPage;
