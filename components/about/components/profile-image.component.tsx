import { downloadPdf } from "@/data/util";

export default function AboutImage() {
  return (
    <>
      <img
        src="/avatar.jpeg"
        alt="jainil solanki"
        className="rounded-full w-full border-2 p-2 hover:p-0 duration-300 self-start"
      />

      <div
        className="cursor-pointer absolute flex justify-center items-center bottom-[-25px] lg:bottom-[-15px] max-w-[15vmin] w-full"
        onClick={downloadPdf}
      >
        <div className="w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlLang="en"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 500 500"
            className="border outline  outline-offset-[-12px] md:outline-offset-[-20px] outline-black outline-1 max-w-[15vmin] rounded-full border-black"
          >
            <defs>
              <path
                id="textcircle"
                d="M250,400
                       a150,150 0 0,1 0,-300 a150,150 0 0,1 0,300Z"
                transform="rotate(12,250,250) "
              />
            </defs>
            <path
              className="stroke-path"
              stroke="rgb(255 255 255 / .6)"
              strokeWidth="65"
              fill="none"
              d="M250 35 A 1 1 0 1 1 250 465 A 1 1 0 1 1 250 35"
            />
            <g className="textcircle">
              <text textLength="940" className="text-4xl font-bold">
                <textPath
                  xlinkHref="#textcircle"
                  aria-label="Download Resume"
                  textLength="940"
                >
                  Download Resume | Download Resume |&#160;
                </textPath>
              </text>
            </g>
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="black"
          className="size-8 absolute"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
    </>
  );
}
