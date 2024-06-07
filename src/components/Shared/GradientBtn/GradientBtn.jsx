import { Button } from "flowbite-react";

const GradientBtn = ({label, full = false}) => {
  return (
    <Button gradientMonochrome="lime" className={`shrink-0 ${full && "w-full"} rounded-xl`}>
      {label}
    </Button>
  );
};

export default GradientBtn;
