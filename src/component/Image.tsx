import { FC, useState } from "react";

const Image: FC<{ filename: string; className: string }> = ({
  filename,
  className,
}) => {
  const [state] = useState(() => (Math.random() * 100).toFixed(10));

  return (
    <div className="grid justify-items-center">
      <div className="rounded-md aspect-square">
        <img
          src={`/image/${filename}.png`}
          className={`transition-all duration-1000 w-full h-full ${className}`}
        />
      </div>
      <span className="w-full text-center text-gray-300 truncate">HP: {state}</span>
    </div>
  );
};

export default Image;
