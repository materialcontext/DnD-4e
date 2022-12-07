import {ClassCard} from "../Cards";
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
  <div class="h-full flex flex-col shadow bg-white">
    <div class="flex px-2">
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Class
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Role
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Power Source
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Key Ability
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Source
      </div>
    </div>
    {classList}
  </div>
  );
}
