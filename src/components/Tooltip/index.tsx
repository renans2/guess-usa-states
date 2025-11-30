import type { Tooltip as TooltipType } from "../../types/Tooltip";
import { S_Tooltip } from "./styles";

export default function Tooltip({ tooltipObj }: { tooltipObj: TooltipType }) {
  return (
    tooltipObj.visible && (
      <S_Tooltip style={{ top: tooltipObj.y, left: tooltipObj.x }}>
        {tooltipObj.text}
      </S_Tooltip>
    )
  );
}
