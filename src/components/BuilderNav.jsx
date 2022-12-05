import {tabStore} from '../components/TabStore';

export default function BuilderNav() {
  const changeTab = (e) => {
    const currentTab = tabStore.get();
    const newTab = e.target.id;
    console.log(currentTab, newTab);

    if (currentTab !== newTab) {
      tabStore.set(newTab);
      document.getElementById(currentTab).classList.remove('glide-active');
      document.getElementById(e.target.id).classList.add("glide-active");
    }
  };

  return(
    <nav>
        <ul class="flex border-b border-b-gray-300 overflow-hidden" role="tablist">
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