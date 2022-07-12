import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { faker } from "@faker-js/faker";
import Image from "../component/Image";
import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    to: 1;
  }
`;

const Detail = () => {
  const { filename } = useParams();

  if (!filename) return null;

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-20">
      <Link to="/" className="fixed left-4 top-4">
        <Icon
          icon="akar-icons:arrow-back-thick"
          className="text-white text-3xl"
        />
      </Link>

      <Image
        page="DETAIL"
        filename={`${filename}`}
        className="w-50vw max-h-80vh rounded-3xl"
      />

      <p
        className="text-white text-3xl order-2 animate-delay-1000"
        css={css`
          animation: ${fadeIn} 2s ease-in;
        `}
      >
        {faker.lorem.sentences(8)}
      </p>
    </div>
  );
};

export default Detail;
