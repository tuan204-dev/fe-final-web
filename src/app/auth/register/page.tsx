/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ErrorMessages } from "@/constants/common";
import AuthServices from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

interface FormValues {
  email: string;
}

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isSended, setIsSended] = useState(false);

  const onSubmit = async (data: FormValues) => {
    let toastId;

    try {
      toastId = toast.loading("Sending registration email...");

      await AuthServices.sendRegisterMail(data.email);

      toast.success("Registration email sent successfully!");
      setIsSended(true);
    } catch (e) {
      const errorMessage = (e as any)?.response?.data?.message;
      if (errorMessage === ErrorMessages.EMAIL_ALREADY_EXISTS) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (isSended) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-3 min-h-screen">
        <h1 className="text-2xl font-medium">Registration Email Sent</h1>
        <p className="text-gray-500">
          Please check your email to complete the registration process.
        </p>

        <Link href={"/auth/login"} className="text-blue-500 hover:underline text-sm">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 min-h-screen">
      <h1 className="text-2xl">Photo App</h1>

      <p className="text-gray-500">Login to your account</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-[300px]"
      >
        <div className="flex flex-col gap-y-1 mt-6">
          <label htmlFor="email" className="text-sm text-gray-950">
            Email <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  id="email"
                  {...field}
                  placeholder="Enter your email"
                  className="w-full"
                  status={errors.email ? "error" : undefined}
                />
              )}
            />

            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>

        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Register
        </Button>

        <Link
          href={"/auth/login"}
          className="text-xs text-center text-blue-500 hover:underline"
        >
          {"Already have an account? Login"}
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
