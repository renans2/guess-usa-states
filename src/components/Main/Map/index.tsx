import MapSVG from '../../../assets/usa-map.svg?react'
import { useGuessGame } from '../../../context/guess-game-context';
import Tooltip from './Tooltip';

export default function Map() {
  const { svgRef } = useGuessGame();

  return (
    <>
      <MapSVG ref={svgRef} style={{ width: "100%", height: "auto" }} />
      <Tooltip />
    </>
  );
}
