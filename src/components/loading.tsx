import { LoaderCircle } from "lucide-react";

const Loading = ({size , width , color = 'black'}:{size:number , width: number , color?:string}) => {
  return <LoaderCircle color={color} size={size} strokeWidth={width} className={`animate-spin`}/>;
};

export default Loading;
