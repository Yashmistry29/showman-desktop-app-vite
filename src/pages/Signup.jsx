import React, {
  useState,
  // useEffect
} from "react";
import mainlogo from "../images/SM_Logo.png";
import { validateSignup } from "../utils/Validation/FormValidation";
import { SignupForm } from "../utils/Data/InitialValues";
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import { toast, ToastContainer } from 'react-toastify';
import { CssTextField } from "../components/FormElements/TextfieldForm";

const Signup = () => {

  const [data, setData] = useState(SignupForm);
  const [errors, setErrors] = useState({});
  const resetData = SignupForm;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      console.log(data);
      sendRequest("/user/signup", "POST", data)
        .then(res => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            handleReset();
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      toast.error("Please check you Inputs");
    }
  };

  const handleReset = (e) => {
    setData(resetData);
  }

  const handleChange = (e) => {
    // e.persist();
    // console.log(e.target.value);
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="flex m-12 space-x-3 items-center">
        <div className="flex flex-col w-6/10 mx-auto">
          <img src={mainlogo} alt="logo" className="w-100" />
          <p
            className='text-red-950 tracking-wide title-font'
          >Showman <span className="black">Tailors</span></p>
        </div>
        <div className="flex flex-col w-4/10">
          <CssTextField
            name="email"
            label="Email Id"
            size="small"
            variant="outlined"
            autoFocus
            margin="dense"
            value={data.email}
            onChange={handleChange}
            {...(errors.email && { error: true, helperText: errors.email })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="username"
            label="Username"
            size="small"
            variant="outlined"
            margin="dense"
            value={data.username}
            onChange={handleChange}
            {...(errors.username && { error: true, helperText: errors.username })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="password"
            label="Password"
            size="small"
            variant="outlined"
            type="password"
            margin="dense"
            value={data.password}
            onChange={handleChange}
            {...(errors.password && { error: true, helperText: errors.password })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <CssTextField
            name="confirmPassword"
            label="Confirm Password"
            size="small"
            variant="outlined"
            type="password"
            margin="dense"
            value={data.confirmPassword}
            onChange={handleChange}
            {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword })}
            // focused
            InputProps={{ style: { fontSize: "90%", color: "#000" } }}
            InputLabelProps={{ style: { fontSize: "90%", color: "#000" } }}
            fullWidth
          />
          <button
            className="cursor-pointer bg-blue-900 py-1 mt-3 text-white rounded hover:bg-blue-800 border-[3px] border-black"
            onClick={handleSubmit}
          >Signup</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;