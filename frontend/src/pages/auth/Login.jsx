import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context/AuthContext";
import Wrapper from "../../components/Wrapper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../../components/Button";
import Header from "../../components/Header";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const Login = () => {
  const { login, user, isLoggingIn } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const ref = useRef(null);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setFocus("email");
    if (user) {
      navigate("/");
    }
  }, [setFocus, user]);

  if (isLoggingIn) {
    return <div>Logging In</div>;
  }

  return (
    <Wrapper>
      <Header />

      <div className="h-screen flex justify-center items-center text-tertiary">
        <div className="basis-1/2"></div>
        <div className="space-y-10 min-w-80 min-h-[500px] basis-1/2 content-center p-10 py-20 w-[500px] bg-primary rounded-2xl">
          <h1 className="md:text-5xl p-1 text-center font-semibold">Log In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                ref={ref}
                type="email"
                className="p-2 rounded-md shadow-sm w-full placeholder:text-sm outline-neutral-400 border border-neutral-500"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                className="p-2 rounded-md shadow-sm w-full placeholder:text-sm outline-neutral-400 border border-neutral-500"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="flex justify-center"><Button type="submit">Log In</Button></div>
          </form>

          <div className="flex justify-end">
            <span className="text-sm">
              Dont have an account?{" "}
              <a href="/signup" className="text-blue-400">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
