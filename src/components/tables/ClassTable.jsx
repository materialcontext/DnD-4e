import ClassCard from "../ClassCard";

const classes = [
  {
    className: "class 1",
    combatRole: "striker",
    powerSource: "primal",
    keyAttribute: "strength",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
  {
    className: "class 2",
    combatRole: "controller",
    powerSource: "arcane",
    keyAttribute: "intelligence",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
  {
    className: "class 3",
    combatRole: "commander",
    powerSource: "divine",
    keyAttribute: "constitution",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
  {
    className: "class 4",
    combatRole: "support",
    powerSource: "psionic",
    keyAttribute: "wisdom",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
  {
    className: "class 5",
    combatRole: "striker",
    powerSource: "martial",
    keyAttribute: "dexterity",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
  {
    className: "class 6",
    combatRole: "controller",
    powerSource: "shadow",
    keyAttribute: "charisma",
    refSource: "Player's Handbook",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum labore voluptatibus libero facere itaque temporibus iusto corrupti minus voluptates. Dignissimos, laboriosam unde ullam ipsam obcaecati pariatur dolorem enim amet?",
  },
];

const classList = classes.map((c) => {
  return <ClassCard {...c} />;
});

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
