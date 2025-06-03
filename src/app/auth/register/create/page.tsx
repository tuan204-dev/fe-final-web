/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ALLOWED_FILE_TYPES, ErrorMessages } from "@/constants/common";
import UserServices, { RegisterParams } from "@/services/userServices";
import { uploadImage } from "@/utils/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { isUndefined, omit, omitBy } from "lodash";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { z } from "zod";

const schema = z
  .object({
    loginName: z
      .string()
      .min(1, "Login name is required")
      .min(5, "Login name must be at least 5 characters")
      .max(15, "Login name must be at most 15 characters"),
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
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { avatar } = watch();

  const token = searchParams.get("token");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAvatar = () => {
    inputRef.current?.click?.();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let toastId;
    try {
      toastId = toast.loading("Uploading image...");

      const file = e.target.files?.[0];

      if (!file) {
        toast.error("No file selected. Please choose an image to upload.");
        return;
      }

      const fileExtension = file?.name.split(".").pop()?.toLowerCase();

      if (!ALLOWED_FILE_TYPES.includes(fileExtension || "")) {
        toast.error("Unsupported file type. Please upload a valid image.");
        return;
      }

      const url = await uploadImage(file);

      setValue("avatar", url);

      toast.success("Upload image successful.");
    } catch (e) {
      console.error("Error uploading image:", e);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      toast.dismiss(toastId);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

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
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
        accept="image/*"
      />
      <h1 className="text-2xl">Photo App</h1>

      <p className="text-gray-500">Register a new account</p>

      <div className="flex justify-center items-center w-full mt-3">
        <div
          onClick={handleClickAvatar}
          className="size-24 rounded-full border border-gray-200 overflow-hidden grid place-items-center cursor-pointer"
        >
          {avatar ? (
            <Image
              src={avatar}
              width={100}
              height={100}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <FiPlus className="text-2xl" />
          )}
        </div>
      </div>

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
