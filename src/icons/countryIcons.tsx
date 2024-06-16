import Image from "next/image";

const NigeriaIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_212_26)">
        <path
          d="M0.5 7.99999C0.5 11.275 2.6 14.05 5.5 15.075V0.924988C2.6 1.94999 0.5 4.72499 0.5 7.99999ZM15.5 7.99999C15.5 4.72499 13.425 1.94999 10.5 0.924988V15.075C13.425 14.05 15.5 11.275 15.5 7.99999Z"
          fill="#83BF4F"
        />
        <path
          d="M5.5 15.075C6.275 15.35 7.125 15.5 8 15.5C8.875 15.5 9.725 15.35 10.5 15.075V0.925C9.725 0.65 8.875 0.5 8 0.5C7.125 0.5 6.275 0.65 5.5 0.925V15.075Z"
          fill="#F9F9F9"
        />
      </g>
      <defs>
        <clipPath id="clip0_212_26">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const USIcon = () => (
  <Image
    src="/icons/uk.svg"
    alt="icon"
    width={0}
    height={0}
    sizes="100vw"
    className="w-auto h-auto"
  />
);

const UKIcon = () => (
  <Image
    src="/icons/us.svg"
    alt="icon"
    width={0}
    height={0}
    sizes="100vw"
    className="w-auto h-auto"
  />
);

export { NigeriaIcon, USIcon, UKIcon };
