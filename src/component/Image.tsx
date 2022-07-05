import { FC, useState } from "react";

const Image: FC<{ filename: string; className: string }> = ({
  filename,
  className,
}) => {
  const [state] = useState(() => (Math.random() * 100).toFixed(10));

  return (
    <div className="grid justify-items-center ">
      <div className="bg-gray-300 rounded-md">
        <img
          src={`/image/${filename}.png`}
          className={`transition-all duration-1000 ${className}`}
        />
      </div>
      <span>HP: {state}</span>
    </div>
  );
};

export default Image;
