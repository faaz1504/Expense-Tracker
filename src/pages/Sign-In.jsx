import { useFormik } from "formik";
import { useNavigate, Link, replace } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";

function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({

    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password can only be 12 characters")
        .required("Password is required")

    }),

    onSubmit: (values) => {

      const users =
        JSON.parse(localStorage.getItem("registereduser")) || [];

      const registeredUser = users.find(
        (user) =>
          user.email === values.email &&
          user.password === values.password
      );

      if (registeredUser) {

        dispatch(signIn(registeredUser));

        if (registeredUser.role === "admin") {
          navigate("/AdminDashboard" , {replace:true});
        } else {
          navigate("/user-dashboard" , {replace:true});
        }

      } else {

        alert("Invalid email or password");

      }

    }

  });

  return (

    <div
      className="min-h-[85vh] flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: "#fafafa" }}
    >

      <div className="w-full max-w-sm">

        <div
          className="bg-white p-6 rounded-lg"
          style={{
            border: "1px solid #e4e4e7",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
          }}
        >

          {/* HEADING */}

          <div className="text-center mb-6">

            <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
              Sign In
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Welcome back to EXpensoo
            </p>

          </div>


          <form onSubmit={formik.handleSubmit}>

            {/* EMAIL */}

            <div className="mb-4">

              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 text-sm border rounded outline-none transition
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  }
                `}
              />

              {formik.touched.email && formik.errors.email && (

                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>

              )}

            </div>


            {/* PASSWORD */}

            <div className="mb-5">

              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 text-sm border rounded outline-none transition
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  }
                `}
              />

              {formik.touched.password && formik.errors.password && (

                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>

              )}

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-2 px-4 rounded text-sm font-medium hover:bg-zinc-800 transition"
            >
              Sign In
            </button>


            {/* REGISTER */}

            <p className="text-center text-xs text-zinc-500 mt-4">

              Don't have an account?{" "}

              <Link
                to="/sign-up"
                className="text-zinc-900 font-medium hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );
}

export default SignIn;