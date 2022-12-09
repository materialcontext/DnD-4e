import { viewMore } from "../store/builderStore";

// create a ul with a list of li elements for each item in the data array
const CardContent = (props) => {
  return (
      <ul id={props.name} class="flex flex-row justify-between hover:bg-gray-200 hover:font-medium font-light px-2">
        {props.data.map((item) => {
          return <li class="px-3 py-2 md:min-w-[125px] text-[1rem] w-1/3 mr-6" onClick={viewMore}>{item}</li>;
        })}
      </ul> 
  );
};

// background card-row
export function BackgroundCard({backgroundName, backgroundType, campaign, backgroundSkills, refSource, fullText = "No description available."}) {
  return (
    <div class="even:bg-gray-50">
      <CardContent data={[backgroundName, backgroundType, campaign, backgroundSkills, refSource]} columns="5"/>
      <div id={backgroundName + "description"} class="hidden font-light p-3 bg-gray-100">{fullText}</div>
  </div>
  );
};

// class card-row
export function ClassCard({className, combatRole, powerSource, keyAttributes, refSource, fullText = "No description available."}) {
  return (
    <div class="even:bg-gray-50">
      <CardContent data={[className, combatRole, powerSource, keyAttributes, refSource]} columns="5"/>
      <div id={className + "description"} class="hidden font-light p-3 bg-gray-100 mr-5">{fullText}</div>
  </div>
  );
};

// feat card-row
export function FeatCard ({featName, tier, refSource, fullText = "No description available."}) {
  return (
    <div class="even:bg-gray-50">
      <CardContent data={[featName, tier, refSource]} columns="3"/>
      <div id={featName + "description"} class="hidden font-light p-3 bg-gray-100">{fullText}</div>
    </div>
  );
};

// race card-row
export function RaceCard({raceName, raceSize, raceBonus, refSource, fullText = "No description available."}) {
  return (
  <div class="even:bg-gray-50">
      <CardContent data={[raceName, raceSize, raceBonus, refSource]} columns="4"/>
      <div id={raceName + "description"} class="hidden font-light p-3 bg-gray-100">{fullText}</div>
  </div>
  );
};