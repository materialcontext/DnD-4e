import { tabState } from "../store/builderStore";
import { useStore } from "@nanostores/preact";

export default function BuilderNav() {
  const currentTab = useStore(tabState);

  function changeTab(e) {
    const newTab = e.target.id;
    console.log(newTab);

    function changeTable(currentTable, NewTable) {
      document.getElementById(currentTable).classList.add("hidden");
      document.getElementById(NewTable).classList.remove("hidden");
    };

    if (currentTab !== newTab) {
      tabState.set(newTab);
      document.getElementById(currentTab).classList.remove('glide-active');
      document.getElementById(newTab).classList.add("glide-active");

      return changeTable(currentTab + "le", newTab + "le");
      }
    };

    return (
        <nav>
            <ul class="flex border-b border-b-gray-300 overflow-hidden shadow" role="tablist">
                <li role="tab" id="classesTab" onClick={changeTab} class="glide-tab glide-active">Class</li>
                <li role="tab" id="racesTab" onClick={changeTab} class="glide-tab">Race</li>
                <li role="tab" id="backgroundsTab" onClick={changeTab} class="glide-tab">Background</li>
                <li role="tab" id="statsTab" onClick={changeTab} class="glide-tab">Stats</li>
                <li role="tab" id="skillsTab" onClick={changeTab} class="glide-tab">Skills</li>
                <li role="tab" id="powersTab" onClick={changeTab} class="glide-tab">Powers</li>
                <li role="tab" id="featsTab" onClick={changeTab} class="glide-tab">Feats</li>
            </ul>
        </nav>
    );
};