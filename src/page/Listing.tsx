import { Link } from "react-router-dom";
import Image from "../component/Image";
import { Port } from "../starport";

const Listing = () => {
  const imageList = new Array(6)
    .fill(null)
    .map((_, idx) => `pokemon-${idx + 1}`);

  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      {imageList.map((filename, idx) => (
        <Link
          key={idx}
          style={{ textDecoration: "none" }}
          to={`/detail/${filename}`}
        >
          <Port id={filename}>
            <Image filename={filename} className="rounded-1 p-1 object-cover" />
          </Port>
        </Link>
      ))}
    </div>
  );
};

export default Listing;
