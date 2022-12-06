import { tabState } from "../store/builderStore";
import { useStore } from "@nanostores/preact";

import ClassTable from "./ClassTable.jsx";
import FeatsTable from "./FeatsTable.jsx";

const Nav = () => {
    const currentTab = useStore(tabState);

  function changeTab(e) {
    const newTab = e.target.id;

    if (currentTab !== newTab) {
      tabState.set(newTab);
      document.getElementById(currentTab).classList.remove('glide-active');
      document.getElementById(e.target.id).classList.add("glide-active");
      }
    }

    return (
        <nav>
            <ul class="flex border-b border-b-gray-300 overflow-hidden shadow" role="tablist">
                <li role="tab" id="tab-1" onClick={changeTab} class="glide-tab glide-active">Class</li>
                <li role="tab" id="tab-2" onClick={changeTab} class="glide-tab">Race</li>
                <li role="tab" id="tab-3" onClick={changeTab} class="glide-tab">Background</li>
                <li role="tab" id="tab-4" onClick={changeTab} class="glide-tab">Stats</li>
                <li role="tab" id="tab-5" onClick={changeTab} class="glide-tab">Skills</li>
                <li role="tab" id="tab-6" onClick={changeTab} class="glide-tab">Powers</li>
                <li role="tab" id="tab-7" onClick={changeTab} class="glide-tab">Feats</li>
            </ul>
        </nav>
    );
}

const Content = () => {
    const currentTab = useStore(tabState);
    switch (currentTab) {
        case 'tab-1':
        return <ClassTable />;
        case 'tab-7':
        return <FeatsTable />;
        default:
        return <ClassTable />;
    }
};

export default function Builder() {
    return (
      <div class="grow flex flex-col">
        <Nav />
        <Content />
      </div>
    );
  };
