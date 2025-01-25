import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Wrapper from "../../components/Wrapper";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../../components/Header"

const schema = z.object({
  fullName: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data.fullName, data.email, data.password);
      setUser(response.data);
      toast.success("Signed Up Successfully", {
        position:"top-right",
        duration:4000
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message)
      // Handle login error (e.g., show error message)
    }
  };

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  return (
    <Wrapper>
        <Header />

      <div className="h-screen flex justify-center items-center">
        <div className="space-y-10 min-w-80 w-[500px] py-20 p-10 bg-neutral-100 rounded-2xl">
          <h1 className="md:text-5xl p-1 text-center font-semibold">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                className="p-2 rounded-md shadow-sm w-full outline-neutral-400 border placeholder:text-sm border-neutral-500"
                placeholder="Enter your Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="text-red-400 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                className="p-2 rounded-md shadow-sm w-full outline-neutral-400 border placeholder:text-sm border-neutral-500"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                className="p-2 rounded-md shadow-sm w-full outline-neutral-400 border placeholder:text-sm border-neutral-500"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-400 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button type="submit">Sign Up</Button>
          </form>

          <div className="flex justify-end">
            <span className="text-sm">
              Dont have an account?{" "}
              <a href="/login" className="text-blue-400">
                Log In
              </a>
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
