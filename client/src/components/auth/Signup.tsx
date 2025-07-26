/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useFormik } from "formik";
// import { useAuthStore } from "../../lib/stores/useAuthStore";
// import { signupSchema } from "@/lib/schema/auth.schema";
// import { User } from "../types/type";
// import { useRouter } from "next/navigation";

// // import { useLoadingBar } from "react-top-loading-bar";

// import { Label } from "../ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/buttons";
// import { Spinner } from "../ui/spinner";

// const Signup = () => {
//   const router = useRouter();
//   // const { registeruser } = useAuthStore();
//   // const { start, complete } = useLoadingBar();

//   const formik = useFormik<User>({
//     initialValues: {
//       email: "",
//       password: "",
//       repassword: "",
//       _id: "",
//     },
//     validationSchema: signupSchema,
//     onSubmit: async (values, { resetForm }) => {
//       // start()
//       const { repassword, ...userData } = values;
//       // const registration = await registeruser(userData);

//       resetForm();
//     },
//   });

//   return (
//     <div className="min-h-screen bg-[#161616] flex items-center justify-center">
//       <div className="w-full max-w-md px-6">
//         <div className="flex flex-col items-center">
//           <h2 className="text-white text-2xl font-semibold">
//             Create new Account
//           </h2>
//           <p className="text-gray-400 mt-1">
//             Your journey to better habits starts here
//           </p>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">
//           <Label htmlFor="email">
//             EMAIL <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="your-email@example.com"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//           )}

//           <Label htmlFor="password">
//             PASSWORD <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-sm mt-1">
//               {formik.errors.password}
//             </p>
//           )}

//           <Label
//             className="text-sm text-gray-300 block mb-1 mt-4"
//             htmlFor="repassword"
//           >
//             RE-ENTER PASSWORD <span className="text-red-500">*</span>
//           </Label>
//           <Input
//             id="repassword"
//             name="repassword"
//             type="password"
//             placeholder="Confirm Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.repassword}
//           />
//           {formik.touched.repassword && formik.errors.repassword && (
//             <p className="text-red-500 text-sm mt-1">
//               {formik.errors.repassword}
//             </p>
//           )}

//           <Button
//             type="submit"
//             variant={"blue"}
//             rounded={"md"}
//             // disabled={loading}
//             className="flex justify-between"
//           >
//             Sign Up
//             {/* <span > {loading && <Spinner />}</span> */}
//           </Button>
//         </form>
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-t border-gray-300" />
//           <span className="mx-4 text-gray-500">or</span>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>
//         <p className="text-center text-gray-300 text-sm mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-400 hover:underline">
//             Sign In
//           </a>
//         </p>

//         <p className="text-center text-gray-500 text-xs mt-6">
//           By continuing, you agree to our{" "}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;







"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
// import { useLoadingBar } from "react-top-loading-bar";
import { useAuthStore } from "../../lib/stores/useAuthStore";
import { loginSchema } from "../../lib/schema/auth.schema";
import { User } from "../types/type";
import {Label} from "../ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const { registeruser, loading, error } = useAuthStore();
  // const { start, complete } = useLoadingBar();
  const [isMounted, setIsMounted] = useState(false);
  const [findFun,setFindFun]=useState("")



  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formik = useFormik({
     initialValues: {
      username:"",
      email: "",
      password: "",
      repassword: "",
      _id: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setFindFun("signup")
      // start();
      const { repassword, ...userData } = values;
      const result = await registeruser(userData);
        console.log("result",result);
        
      if (result?.success) {
        // complete();
        toast.success(result.message);
        router.push("/");
      } else {
        // complete();
      }
    },
  });

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-400 mt-1">Log in to continue your journey</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">
           <Label  htmlFor="username">
            NAME <span className="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            type="username"
            placeholder="your-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
       
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
          )}
     
          <Label  htmlFor="email">
            EMAIL <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your-email@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
       
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}

      
          <Label  htmlFor="password">
            PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
     
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}

           <Label
            className="text-sm text-gray-300 block mb-1 mt-4"
            htmlFor="repassword"
          >
            RE-ENTER PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repassword}
          />
          {formik.touched.repassword && formik.errors.repassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.repassword}
            </p>
          )}

       
       <Button
            type="submit"
            variant={"blue"}
            rounded={"md"}
            disabled={loading}
            className="flex justify-between"
          >
            Sign Up
            <span > {loading && <Spinner />}</span>
          </Button>

        </form>

     

      
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {/* <div className=" flex flex-col items-end justify-start">

          <p className="text-center text-gray-300 text-xs mt-2 ">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 text-xs hover:underline">
             signup
            </a>
          </p>
          <p className="text-center text-gray-300 text-xs">
            Forgot your password?{" "}

          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;


