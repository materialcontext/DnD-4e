import { viewMore } from "../store/builderStore";

export default function ClassCard({className, combatRole, powerSource, keyAttribute, refSource, description}) {
  return (
    <div class="even:bg-gray-50">
      <ul id={className} class="card-row hover:bg-gray-200 hover:font-medium font-light px-2">
        <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{className}</li>
        <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{combatRole}</li>
        <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{powerSource}</li>
        <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{keyAttribute}</li>
        <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{refSource}</li>
      </ul>
      <div id={className + "description"} class="hidden font-light p-3 bg-gray-100">{description}</div>
  </div>
  );
}
