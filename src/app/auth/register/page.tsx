"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    loginName: z.string().min(1, "Login name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    description: z.string().optional(),
    location: z.string().optional(),
    occupation: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        return data.confirmPassword && data.password === data.confirmPassword;
      }

      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

interface FormValues {
  loginName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  description?: string;
  location?: string;
  occupation?: string;
}

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {};

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 min-h-screen">
      <h1 className="text-2xl">Photo App</h1>

      <p className="text-gray-500">Register a new account</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-[300px]"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="loginName" className="text-sm text-gray-950">
            User name
          </label>
          <Controller
            control={control}
            name="loginName"
            render={({ field }) => (
              <Input
                id="loginName"
                {...field}
                placeholder="Enter your user name"
                className="w-full"
                status={errors.loginName ? "error" : undefined}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-sm text-gray-950">
            Password
          </label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password
                id="password"
                {...field}
                placeholder="Enter your password"
                className="w-full"
                status={errors.password ? "error" : undefined}
              />
            )}
          />
        </div>

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
