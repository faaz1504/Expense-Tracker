import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import './signin.css'
import { Link } from "react-router-dom";

function SignIn({setUser}){

    const navigate = useNavigate();

    const formik = useFormik({
        
        initialValues:{

            name:"",
            email:"",
            password:""
        },

        validationSchema:Yup.object({

            name:Yup.string()
                    .required("Username is required"),
            
            email:Yup.string()
                     .email("invalid email")
                     .required('email is required'),

            password:Yup.string()
                        .min(6,'password must be 6 characters')
                        .max(12,'password can only be 12 characters')
                        // .matches(/[A-Z]/,'password must be Uppercase')
                        .required('password is required')


        }),

        onSubmit:(values)=>{
            console.log(values);

            setUser({
                name:values.name,
                email:values.email
            });

            navigate('/user-dashboard');


        }


    })

   return (
  <div className="signin-page">

    <div className="signin-card">

      <h2>Welcome Back</h2>
      <p className="signin-subtitle">Sign in to manage your expenses</p>

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label>UserName</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name && (
            <div className="error">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          {formik.touched.email && formik.errors.email && (
            <div className="error">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          {formik.touched.password && formik.errors.password && (
            <div className="error">
              {formik.errors.password}
            </div>
          )}
        </div>

        <button type="submit" className="signin-btn">
          Sign In
        </button>

        <p  className="signup-link">

                  Don't have an account?{" "}

                  <Link
                    to="/sign-up">
                    Register
                  </Link>

                </p>

      </form>

    </div>

  </div>
);

}
export default SignIn;