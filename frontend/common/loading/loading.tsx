import { BounceLoader } from "react-spinners";
import { ProgressBar } from "@hilla/react-components/ProgressBar";
import { ClassNames } from "Frontend/utils/classnames.js";

export const Loading = ({ size = 40 }: { size?: number }) => {
  return (
    <>
      <ProgressBar color="#007f5f" indeterminate={true} className="m-0" />
      <div
        className={ClassNames(
          "w-full flex items-center justify-center bg-background",
          size === 40 ? "min-h-[80vh]" : ""
        )}
      >
        <BounceLoader size={size} color="#007f5f" />
      </div>
    </>
  );
};
