import { FC, useState } from "react";

const Image: FC<{ filename: string; className: string }> = ({
  filename,
  className,
}) => {
  const [state] = useState(() => (Math.random() * 100).toFixed(10));

  return (
    <div className="grid justify-items-center">
      <img
        src={`/image/${filename}.png`}
        className={`transition-all duration-1000 ${className}`}
      />
      <span>HP: {state}</span>
    </div>
  );
};

export default Image;
