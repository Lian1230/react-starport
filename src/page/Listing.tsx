import { Link } from "react-router-dom";
import Image from "../component/Image";
import { Port } from "../starport";

const Listing = () => {
  const imageList = new Array(6)
    .fill(null)
    .map((_, idx) => `pokemon-${idx + 1}`);

  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      <Link to={`/detail/pokemon-1`} style={{ textDecoration: "none" }}>
        <Port id="pokemon-1">
          <Image filename="pokemon-1" className="rounded-1 p-1 object-cover" />
        </Port>
      </Link>
      <Link to={`/detail/pokemon-2`} style={{ textDecoration: "none" }}>
        <Port id="pokemon-2">
          <Image filename="pokemon-2" className="rounded-1 p-1 object-cover" />
        </Port>
      </Link>
      {/* {imageList.map((filename, idx) => (
        <Link key={idx} to={`/detail/${filename}`}>
          <img
            src={`/image/${filename}.jpg`}
            className="aspect-square rounded-1 object-contain cursor-pointer"
          />
        </Link>
      ))} */}
    </div>
  );
};

export default Listing;
