"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { uploadImage } from "@/firebase/func";
import { usePosts } from "@/hooks/post";
import PostServices from "@/services/postServices";
import cn from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Invalid image URL"),
});

interface FormValues {
  title: string;
  imageUrl: string;
}

const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "png", "gif"];

const CreatePost = () => {
  const { mutate: refreshPosts } = usePosts();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const formValues = watch();

  const inputFileRef = useRef<any>(null);

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

      setValue("imageUrl", url);

      toast.success("Upload image successful.");
    } catch (e) {
      console.error("Error uploading image:", e);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      toast.dismiss(toastId);

      inputFileRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    let toastId;
    try {
      toastId = toast.loading("Posting...");

      await PostServices.addPost(data);

      toast.success("Post successful");
      refreshPosts();
      router.push("/");
    } catch (e) {
      console.log(e);
      toast.error("Post failed!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 min-h-[calc(100vh-80px)]">
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <h1 className="text-2xl">Photo App</h1>

      <p className="text-gray-500">Create Post</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-[300px]"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <Image
              className={cn("size-28 rounded-2xl border border-gray-400", {
                "border-red-500": errors.imageUrl,
              })}
              fallback="https://archive.org/download/placeholder-image//placeholder-image.jpg"
              src={formValues.imageUrl}
              preview={!!formValues.imageUrl}
              alt=""
            />

            <ErrorMessage message={errors.imageUrl?.message} />
          </div>

          <Button
            onClick={() => inputFileRef.current?.click()}
            icon={<FiUpload />}
          >
            Upload image
          </Button>
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="title" className="text-sm text-gray-950">
            Title <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  id="title"
                  {...field}
                  placeholder="Enter your user name"
                  className="w-full"
                  status={errors.title ? "error" : undefined}
                />
              )}
            />

            <ErrorMessage message={errors.title?.message} />
          </div>
        </div>

        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Create post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
