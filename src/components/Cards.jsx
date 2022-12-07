import { viewMore } from "../store/builderStore";

// create a ul with a list of li elements for each item in the data array
const CardContent = (data) => {
  return (
      <ul id={data.name} class="card-row hover:bg-gray-200 hover:font-medium font-light px-2">
        {data.data.map((item) => {
          return <li class="w-1/5 px-3 py-2 md:min-w-[125px] text-[1rem]" onClick={viewMore}>{item}</li>;
        })}
      </ul>
  );
};

// class card-row
export function ClassCard({className, combatRole, powerSource, keyAttributes, refSource, fullText = "No description available."}) {
  return (
    <div class="even:bg-gray-50">
      <CardContent data={[className, combatRole, powerSource, keyAttributes, refSource]} />
      <div id={className + "description"} class="hidden font-light p-3 bg-gray-100">{fullText}</div>
  </div>
  );
};

// feat card-row
export function FeatCard ({featName, sort, tier, refSource, fullText = "No description available."}) {
  return (
    <div class="even:bg-gray-50">
      <CardContent data={[featName, sort, tier, refSource]} />
      <div id={featName + "description"} class="hidden font-light p-3 bg-gray-100">{fullText}</div>
    </div>
  );
};