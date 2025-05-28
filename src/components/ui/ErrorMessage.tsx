import cn from "@/utils/cn";
import React, { FC } from "react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <span className={cn("text-xs text-red-600", className)}>{message}</span>
  );
};

export default ErrorMessage;
