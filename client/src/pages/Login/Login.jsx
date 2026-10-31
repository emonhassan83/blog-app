/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import "./Login.css";
import { Helmet } from "react-helmet-async";
import { Toaster} from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql `
  mutation login($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    userError
    token
  }
}
`

const Login = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signIn, { data, error, loading }] = useMutation(LOGIN);
  const [userError, setUserError] = useState(null);
  // console.log(data);


  const onSubmit = (data) => {
    signIn({
      variables: data
  })
  };

  useEffect(() => {
    if (data && data?.signIn?.token) {
        console.log("token", data.signIn.token)
        localStorage.setItem("token", data.signIn.token)
    }
    if (data && data.signIn?.userError) {
        setUserError(data.signIn.userError)
    }
}, [data]);

  return (
    <div className="login-card mx-auto mt-[10%] shadow-lg">
      <Helmet>
        <title>Uni Bookings | Login</title>
      </Helmet>
      <h2 className="text-xl sm:text-2xl font-medium mb-8 text-center">Login Please</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm sm:text-base">Username or Email</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
          required
        />
        {errors.email && (
          <p className="text-red-500 -mt-5">
            <small>Email field is required</small>
          </p>
        )}

        <label className="text-sm sm:text-base">Password</label>
        <input
          type={show ? "text" : "password" }
          name="password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          required
        />
        <p className="-mt-4 cursor-pointer" onClick={()=> setShow(!show)}><small> {show ? <span>Hide Password</span> : <span>Show Password</span> }</small></p>
        {errors.password?.type === "required" && (
          <p className="text-red-500 -mt-5">
            <small>Password is required</small>
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 -mt-5">
            <small>Password must be 6 character</small>
          </p>
        )}
        <input
          type="submit"
          value="Login"
          className="btn bg-pink-500 hover:bg-pink-600 border-none btn-block rounded-3xl"
        />
        <p className="text-center">
          <small>
            New to UniBookings? Please{" "}
            <Link to="/signUp" className="text-pink-600 font-bold">
              Sign Up
            </Link>
          </small>
        </p>
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;