import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full grid place-items-center min-h-[calc(100vh-80px)]">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
