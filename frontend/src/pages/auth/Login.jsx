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
import { RxAvatar } from "react-icons/rx";
import { IoKeyOutline } from "react-icons/io5";

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
    <div className="bg-gradient-to-b from-[#ffffff] from-[0%] via-[#BFC5EA] via-[61%] to-[#6E6F73] to-[100%]">
      <Wrapper>
        <Header />
        <div className="h-screen flex md:flex-row flex-col md:gap-24 justify-center items-center text-tertiary">
          <div className="basis-1/2 space-y-10 max-md:hidden">
          <div className="grid grid-cols-2 grid-rows-2 max-h-[500px] gap-3 h-full">
  <div className="flex justify-center items-center col-span-1 row-span-1">
    <span className="text-2xl font-bold text-[#5765C5]">
      Stay Connected To you loved Ones
    </span>
  </div>
  <div className="flex justify-center items-center col-span-1 row-span-1">
    <img
      src="rightPill.jpg"
      className="rounded-2xl object-cover w-[110%] h-[140%] object-top"
      alt=""
    />
  </div>
  <div className="flex justify-center items-center col-span-1 row-span-1">
    <img
      src="leftPill.jpg"
      className="rounded-2xl object-cover w-full h-[120%]"
      alt=""
    />
  </div>
  <div className="flex justify-center items-center col-span-1 row-span-1">
    <span className="text-2xl font-bold text-[#5765C5]">Using ChatFrame</span>
  </div>
</div>
          </div>
          <div className="md:basis-1/2 w-full">
            <div className="space-y-10  min-h-[600px] content-center p-10 text-white py-20 md:max-w-[600px] w-full bg-[#5765C5] rounded-3xl">
              <div clas>
                <h1 className="md:text-3xl text-start font-semibold capitalize">
                  {" "}
                  <span className="text-base">Welcome Back!</span>
                  <br />
                  Log In To your account and Start Chatting
                </h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="max-w-full mx-auto flex gap-2 bg-white rounded-lg overflow-hidden text-black items-center px-2 border border-neutral-500 ">
                <RxAvatar size={30}/>
                  <input
                    ref={ref}
                    type="email"
                    className=" rounded-lg  shadow-sm w-full placeholder:text-black/60 text-black  outline-none py-2 autofill:bg-white"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="max-w-full mx-auto flex gap-2 bg-white rounded-lg overflow-hidden text-black items-center px-2  border border-neutral-500">
                <IoKeyOutline size={30}/>
                  <input
                    type="password"
                    className=" rounded-lg  shadow-sm w-full placeholder:text-black/60 text-black outline-none  py-2 autofill:bg-white"
                    placeholder="Enter Password"
                    {...register("password")}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="flex justify-end">
                  <a
                    href="/forgotpassword"
                    className="text-primary hover:text-sky-400 transition-colors duration-200 ease-in"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <Button
                    className={
                      "bg-primary text-[#5765C5] font-bold w-28 rounded-lg"
                    }
                    type="submit"
                  >
                    Log In
                  </Button>
                  <Button
                    className={
                      "border-primary border text-primary font-bold w-28 rounded-lg"
                    }
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
