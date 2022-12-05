export default function ClassCard({className, combatRole, powerSource, keyAttribute, refSource}) {
  console.log("hello")
  return (
  <ul class="card-row odd:bg-gray-100 hover:bg-gray-300 hover:font-medium font-light">
    <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]">{className}</li>
    <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]">{combatRole}</li>
    <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]">{powerSource}</li>
    <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]">{keyAttribute}</li>
    <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]">{refSource}</li>
  </ul>
  );
}
