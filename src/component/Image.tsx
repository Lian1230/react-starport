import { css, keyframes } from "@emotion/react";
import { FC, memo, useRef, useState } from "react";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
`;

const faint = keyframes`
  from {
    transform: rotate(0deg);
    transform-origin: 30vw;
  }
  to {
    transform: rotate(360deg);
    transform-origin: 0;
  }
`;

const bounce = keyframes`
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(0, 20vh);
  }
  20% {
    transform: translate(0, -20vh);
  }
  30% {
    transform: translate(0, 10vh);
  }
  40% {
    transform: translate(0, -10vh);
  }
  50% {
    transform: translate(0, 5vh);
  }
  60% {
    transform: translate(0, -5vh);
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
}> = memo(({ page, filename, className, starportProps }) => {
  const [hp] = useState(() => (Math.random() * 100).toFixed(3));
  const ref = useRef<HTMLDivElement>(null);

  const isLowHp = Number(hp) < 60;

  return (
    <div
      ref={ref}
      className="grid justify-items-center"
      css={css`
        animation: ${page === "LIST" ? rotate : isLowHp ? faint : bounce}
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
        className="w-full text-center truncate"
        css={css`
          font-size: ${page === "LIST" ? "1rem" : "1.75rem"};
          color: ${isLowHp ? "red" : "rgba(110, 231, 183)"};
        `}
      >
        HP: {hp}
      </span>
    </div>
  );
});

export default Image;
