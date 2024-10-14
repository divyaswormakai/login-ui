import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IDataSchema } from "../types/main.types";
import EyeSvg from "../assets/eye.svg";
import EyeSlashSvg from "../assets/eye-slash.svg";

interface IPasswordFieldProps {
  register: UseFormRegister<IDataSchema>;
  error?: string | undefined;
}

const PasswordField: React.FC<IPasswordFieldProps> = ({ register, error }) => {
  const [hidePassword, setHidePassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className="form-group">
      <label>Password</label>
      <div className="password-input-container">
        <input
          {...register("password")}
          type={hidePassword ? "password" : "text"}
          placeholder="Enter your password"
          className="password-input"
        />
        <span>
          <img
            src={hidePassword ? EyeSlashSvg : EyeSvg}
            alt="eye-slash"
            onClick={togglePasswordVisibility}
          />
        </span>
      </div>
      <p className="error-message">{error}</p>
    </div>
  );
};

export default PasswordField;
