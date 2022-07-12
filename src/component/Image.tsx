import { css, keyframes } from "@emotion/react";
import { faker } from "@faker-js/faker";
import { FC, useMemo, useState } from "react";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
`;

const drop = keyframes`
  0% {
    transform: translate(0, 0);
  }
  30% {
    transform: translate(0, 20rem);
  }
  100% {
    transform: rotate(0, 0);
  }
`;

const jump = keyframes`
  0% {
    transform: translate(0, 0);
  }
  30% {
    transform: translate(0, -20rem);
  }
  100% {
    transform: rotate(0, 0);
  }
`;

const Image: FC<{
  page: "LIST" | "DETAIL";
  filename: string;
  className: string;
  starportProps?: {
    moving: boolean;
    duration: number;
  };
}> = ({ page, filename, className, starportProps }) => {
  const [state] = useState(() => (Math.random() * 100).toFixed(3));

  const bounceAnimation = useMemo(
    () => (faker.datatype.boolean() ? drop : jump),
    []
  );

  return (
    <div
      className="grid justify-items-center"
      css={css`
        animation: ${page === "LIST" ? rotate : bounceAnimation}
          ${starportProps?.duration}ms ease-out;
        animation-play-state: ${starportProps?.moving ? "running" : "paused"};
      `}
    >
      <div className="w-full rounded-md aspect-square">
        <img
          src={`/image/${filename}.png`}
          className={`transition-all duration-1000 w-full h-full ${className}`}
        />
      </div>
      <span
        className="w-full text-center text-green-300 truncate"
        css={css`
          font-size: ${page === "LIST" ? "1rem" : "1.75rem"};
        `}
      >
        HP: {state}
      </span>
    </div>
  );
};

export default Image;
