import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
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
          navigate("/AdminDashboard");
        } else {
          navigate("/user-dashboard");
        }

      } else {

        alert("Invalid email or password");

      }

    }

  });

  return (

    <div className="min-h-[85vh] bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-sm">

        <div className="bg-white shadow-md rounded-xl p-6">

          {/* HEADING */}

          <div className="text-center mb-6">

            <h3 className="text-2xl font-bold text-gray-800">
              Sign In
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Welcome back to EXpensoo
            </p>

          </div>


          <form onSubmit={formik.handleSubmit}>

            {/* EMAIL */}

            <div className="mb-4">

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className={`w-full px-3 py-2 border rounded-lg outline-none transition
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }
                `}
              />

              {formik.touched.email && formik.errors.email && (

                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>

              )}

            </div>


            {/* PASSWORD */}

            <div className="mb-6">

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className={`w-full px-3 py-2 border rounded-lg outline-none transition
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }
                `}
              />

              {formik.touched.password && formik.errors.password && (

                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>

              )}

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Sign In
            </button>


            {/* REGISTER */}

            <p className="text-center text-gray-500 text-sm mt-4">

              Don't have an account?{" "}

              <Link
                to="/sign-up"
                className="text-blue-600 font-semibold hover:underline"
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