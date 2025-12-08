import { useGuessGame } from "../../../../context/guess-game-context";
import { S_Tooltip } from "./styles";

export default function Tooltip() {
  const { tooltipObj } = useGuessGame();

  return (
    tooltipObj.visible && (
      <S_Tooltip style={{ top: tooltipObj.y, left: tooltipObj.x }}>
        {tooltipObj.text}
      </S_Tooltip>
    )
  );
}
