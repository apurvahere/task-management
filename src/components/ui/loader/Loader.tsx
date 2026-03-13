import clsx from "clsx";
import { Oval } from "react-loader-spinner";

type LoaderProps = {
  size?: number;
  color?: string;
  fullScreen?: boolean;
  className?: string;
};

const Loader = ({
  size = 40,
  color = "#3b82f6",
  fullScreen = false,
  className = "",
}: LoaderProps) => {
  const loader = (
    <Oval
      visible={true}
      height={size}
      width={size}
      color={color}
      secondaryColor={color}
      strokeWidth={4}
      strokeWidthSecondary={4}
      ariaLabel="loading"
    />
  );

  if (fullScreen) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center min-h-screen",
          className,
        )}
      >
        {loader}
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center justify-center py-6", className)}>
      {loader}
    </div>
  );
};

export default Loader;
