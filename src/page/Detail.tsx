import { useParams } from "react-router-dom";
import Image from "../component/Image";
import { Port } from "../starport";

const Detail = () => {
  const { filename } = useParams();

  if (!filename) return null;

  return (
    <div className="flex justify-center items-center m-10">
      <Port id="image-1">
        <Image filename={`${filename}`} className="max-h-80vh" />
      </Port>
    </div>
  );
};

export default Detail;
