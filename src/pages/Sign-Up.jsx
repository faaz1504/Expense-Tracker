import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import './signup.css'
import { Link } from "react-router-dom";

function SignUp({setUser}){

    const navigate = useNavigate();
    const formik = useFormik({

        initialValues:{
            name:"",
            email:"",
            password:"",
            confirmpassword:""
        },

         validationSchema:Yup.object({

            name:Yup.string()
                    .required("name is required"),

            email:Yup.string()
                     .email("invalid email")
                     .required("email is required"),
                     

            password:Yup.string()
                        .min(6,"password must be atleast 6 characters")
                        .max(12)
                        .matches(/[A-Z]/,"uppercase only")
                        .required("password is required"),

            confirmpassword:Yup.string()
                                .oneOf([Yup.ref('password')],'password does not match')
                                .required("confirm password is must")
         }),

         onSubmit:(values) =>{
            console.log(values);
            
            
            navigate('/sign-in')
         }


    })


return (
  <div className="signup-page">

    <div className="signup-card">

      <h2>Create Account</h2>
      <p className="signup-subtitle">
        Create an account to start tracking your expenses
      </p>

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
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

        <div className="form-group">
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmpassword}
          />

          {formik.touched.confirmpassword &&
            formik.errors.confirmpassword && (
              <div className="error">
                {formik.errors.confirmpassword}
              </div>
            )}
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
            
            <p className="signup-link">
    Already Have An Account?{" "}
    <Link to="/sign-in">
        Sign-In
    </Link>
</p>

        

      </form>

    </div>

  </div>
);

}
export default SignUp;
