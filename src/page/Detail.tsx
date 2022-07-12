import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../component/Image";
import { Port } from "../starport";

const Detail = () => {
  const { filename } = useParams();

  if (!filename) return null;

  return (
    <div className="flex justify-center items-center m-10">
      <Link to="/" className="fixed left-2 top-2">
        <Icon
          icon="akar-icons:arrow-back-thick"
          className="text-white text-2xl"
        />
      </Link>

      <Port id={filename}>
        <Image filename={`${filename}`} className="max-h-80vh rounded-3xl" />
      </Port>
    </div>
  );
};

export default Detail;
