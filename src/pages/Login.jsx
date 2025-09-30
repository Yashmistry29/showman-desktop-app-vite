import React, {
  useState,
  useEffect
} from "react";
// import "../styles/login.scss";
import mainlogo from "../images/SM_Logo.png";
import { validateSignin } from "../utils/Validation/FormValidation";
import { LoginForm } from "../utils/Data/InitialValues";
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import { CssChildTextField as CssTextField } from "../components/FormElements/TextfieldForm";
import { toast, ToastContainer } from 'react-toastify';
const electron = window.require("electron");

const Login = () => {

  const ipcRenderer = electron.ipcRenderer;
  const [data, setData] = useState(LoginForm);
  const [errors, setErrors] = useState({});
  const [keyPress, setKeyPress] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = () => {
    const validationErrors = validateSignin(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      // console.log(data);
      sendRequest("/user/login", "POST", data)
        .then(res => {
          if (res.success) {
            ipcRenderer.send('Authenticated', true);
          } else {
            toast.error(res.message, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "colored",
            });
            ipcRenderer.send('Authenticated', false);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    else {
      console.log(errors);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      setKeyPress(e.key);
    });
    if (keyPress === 'Enter') {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPress])

  return (
    <div className="pt-12 flex flex-col w-2/3 items-center mx-auto">
      <ToastContainer />
        <div className="w-full mx-auto mb-5">
          <img src={mainlogo} alt="logo" className="w-100" />
        </div>
        <div className="w-full">
          <CssTextField
            name="username"
            label="Username"
            size="small"
            variant="outlined"
            margin="dense"
            autoFocus
            value={data.username}
            fullWidth
            onChange={handleChange}
            slotProps={{
              input: { style:{fontSize: "90%"} },
              inputLabel: { style:{fontSize: "90%", color: "#000"} }
            }}
            {...(errors.username && { error: true, helperText: errors.username })}
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
            fullWidth
            slotProps={{
              input: { style: { fontSize: "90%" } },
              inputLabel: { style: { fontSize: "90%", color: "#000" } }
            }}
            {...(errors.password && { error: true, helperText: errors.password })}
          />
        </div>
        <div className="flex justify-center mt-2">
          <button
            className="bg-rose-900 py-1 px-14 rounded-md text-md shadow-2xl border-2 border-black text-white cursor-pointer"
            onClick={handleSubmit}
          >Login</button>
        </div>
    </div>
  )
}

export default Login;