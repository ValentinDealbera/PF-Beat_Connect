type MultiBoldTextProps = {
  startText: string;
  endText: string;
  className?: string;
  endClassName?: string;
};

const MultiBoldText = ({
  startText,
  endText,
  className,
  endClassName,
}: MultiBoldTextProps) => {
  const textClass = `text-titulo1-regular ${className}`;
  return (
    <h1 className={textClass}>
      {startText}{" "}
      <span className={`text-titulo1-semibold ${endClassName}`}>{endText}</span>
    </h1>
  );
};

export default MultiBoldText;
