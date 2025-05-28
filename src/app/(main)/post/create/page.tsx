"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.instanceof(File),
});

interface FormValues {
  title: string;
  content: string;
  image: File;
}

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return <div>CreatePost</div>;
};

export default CreatePost;
