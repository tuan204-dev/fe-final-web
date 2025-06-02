/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ErrorMessages } from "@/constants/common";
import UserServices, { RegisterParams } from "@/services/userServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { isUndefined, omit, omitBy } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z
  .object({
    loginName: z
      .string()
      .min(1, "Login name is required")
      .min(5, "Login name must be at least 5 characters")
      .max(100, "Login name must be at most 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name must be at most 100 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name must be at most 100 characters"),
    description: z
      .string()
      .max(500, "Description must be at most 500 characters")
      .optional(),
    location: z
      .string()
      .max(100, "Location must be at most 100 characters")
      .optional(),
    occupation: z
      .string()
      .max(100, "Occupation must be at most 100 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid registration token. Please try again.");
      router.push("/auth/login");
    }
  }, [token]);

  const onSubmit = async (data: FormValues) => {
    let toastId;
    try {
      toastId = toast.loading("Registering...");
      const objectCleaned = omitBy(data, isUndefined);

      const submitData = {
        ...omit(objectCleaned, ["confirmPassword"]),
        token,
      };

      await UserServices.register(submitData as RegisterParams);

      toast.success("Registration successful!");

      router.push("/auth/login");
    } catch (e) {
      const errorMessage = (e as any)?.response?.data?.message;
      if (errorMessage === ErrorMessages.LOGIN_NAME_ALREADY_EXISTS) {
        setError("loginName", {
          message: "Login name already exists. Please choose a different one.",
        });
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      if (toastId) {
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 min-h-screen">
      <h1 className="text-2xl">Photo App</h1>

      <p className="text-gray-500">Register a new account</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-[380px]"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="loginName" className="text-sm text-gray-950">
            User name <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
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

            <ErrorMessage message={errors.loginName?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-sm text-gray-950">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
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

            <ErrorMessage message={errors.password?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="confirmPassword" className="text-sm text-gray-950">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input.Password
                  id="confirmPassword"
                  {...field}
                  placeholder="Enter your password"
                  className="w-full"
                  status={errors.confirmPassword ? "error" : undefined}
                />
              )}
            />

            <ErrorMessage message={errors.confirmPassword?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="firstName" className="text-sm text-gray-950">
              First name <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    id="firstName"
                    {...field}
                    placeholder="Enter your first name"
                    className="w-full"
                    status={errors.firstName ? "error" : undefined}
                  />
                )}
              />

              <ErrorMessage message={errors.firstName?.message} />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="lastName" className="text-sm text-gray-950">
              Last name <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    id="lastName"
                    {...field}
                    placeholder="Enter your last name"
                    className="w-full"
                    status={errors.lastName ? "error" : undefined}
                  />
                )}
              />

              <ErrorMessage message={errors.lastName?.message} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="location" className="text-sm text-gray-950">
              Location
            </label>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Input
                    id="location"
                    {...field}
                    placeholder="Enter your location"
                    className="w-full"
                    status={errors.location ? "error" : undefined}
                  />
                )}
              />

              <ErrorMessage message={errors.location?.message} />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="occupation" className="text-sm text-gray-950">
              Occupation
            </label>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="occupation"
                render={({ field }) => (
                  <Input
                    id="occupation"
                    {...field}
                    placeholder="Enter your occupation"
                    className="w-full"
                    status={errors.occupation ? "error" : undefined}
                  />
                )}
              />

              <ErrorMessage message={errors.occupation?.message} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="description" className="text-sm text-gray-950">
            Description
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Input.TextArea
                  id="description"
                  {...field}
                  placeholder="Enter a description"
                  className="w-full"
                  status={errors.description ? "error" : undefined}
                />
              )}
            />

            <ErrorMessage message={errors.description?.message} />
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
