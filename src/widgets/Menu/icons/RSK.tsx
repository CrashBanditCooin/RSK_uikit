import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" fill="none" viewBox="0 0 100 100"  {...props}>
      <image width={100} height={100} href="/images/home/rsk-icon.png"/>
    </Svg>
  );
};

export default Icon;
