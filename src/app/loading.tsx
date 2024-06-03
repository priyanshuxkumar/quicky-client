import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = ({size}) => {
  return <LoaderCircle size={size} className="animate-spin" />;
};

export default Loading;
