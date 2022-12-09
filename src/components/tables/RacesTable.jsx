import {RaceCard} from "../Cards";
import racesData from "../../data/races";
import TableTemplate from "./TableTemplate";

const raceList = racesData.map((raceData) => (
  <RaceCard
    raceName={raceData.raceName}
    raceSize={raceData.raceSize}
    raceBonus={raceData.raceBonus}
    refSource={raceData.refSource}
  />
));

export default function RaceTable() {
  return (
    <TableTemplate titles={["Race", "Size", "Bonus", "Source"]}>
      {raceList}
    </TableTemplate>
  );
}
