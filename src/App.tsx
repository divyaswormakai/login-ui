import "./App.css";
import AnimatedBackground from "./components/animated-background";
import MainLayout from "./layout/main-layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import PasswordField from "./components/password-field";
import { IDataSchema } from "./types/main.types";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be less than 32 characters.")
    .required("Password is required."),
});

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: IDataSchema) => {
    setIsLoading(true);
    console.log({ data });

    // sleep for 2 seconds to mimic fetch
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoggedIn(true);
    setIsLoading(false);
    // Call fetch respons here
  };

  return (
    <MainLayout>
      <AnimatedBackground />
      {isLoggedIn ? (
        <div className="">
          <h1>User Login Successful</h1>
        </div>
      ) : (
        <div className="login-container">
          <h1>Sign In</h1>
          <div className="card">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  {...register("email")}
                  placeholder="john.doe@gmail.com"
                  type="email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <PasswordField
                register={register} // Pass the register function
                error={errors.password?.message} // Pass error message if exists
              />

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default App;
