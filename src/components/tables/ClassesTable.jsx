import {ClassCard} from "../Cards";
import TableTemplate from "./TableTemplate";
import classData from "../../data/classes";

const classList = classData.map((classData) => (
  <ClassCard
    className={classData.className}
    combatRole={classData.combatRole}
    powerSource={classData.powerSource}
    keyAttributes={classData.keyAttributes}
    refSource={classData.refSource}
  />
));

export default function ClassTable() {
  return (
    <TableTemplate titles={["Class", "Role", "Power Source", "Key Attributes", "Source"]}>
      {classList}
    </TableTemplate>
  );
}
