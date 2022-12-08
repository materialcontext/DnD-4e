import InfiniteScroll from "../../utils/infiniteScroll"
import { useStore } from "@nanostores/preact";
import { FeatCard } from "../Cards";
import { featsPageState } from "../../store/builderStore";
import featData from "../../data/feats";

//filter data into an array of 4 groups
const featGroups = featData.reduce((acc, feat) => {
  const group = feat.sort;
  acc[group] = acc[group] || [];
  acc[group].push(feat);
  return acc;
}, []);

//break the groups into pages of 250 feats
const featsPages = featGroups.map((group) => {
  const pages = [];
  let page = [];
  group.forEach((feat) => {
    if (page.length < 250) {
      page.push(feat);
    } else {
      pages.push(page);
      page = [feat];
    }
  })
  pages.push(page);
  return pages;
});

// create cards for the current page
const getCards = () => {
  const featsPage = featsPageState.get();
  const cards = [];
  featsPages.forEach((group) => {
    group[featsPage].forEach((feat) => {
      cards.push(<FeatCard featName={feat.featName} tier={feat.tier} refSource={feat.refSource}/>);
    });
  });
  return cards;
};

// set content to the first page of cards
let content = getCards();

export default function FeatsTable() {
  const featsPage = useStore(featsPageState);

  const loadMore = () => {
    if (featsPage < featsPages.length) {
      featsPageState.set(featsPage + 1);
      content = content.concat(getCards());
    }
  };

  return (
  <div class="flex h-full flex-col shadow bg-white">
    <div class="flex px-2">
      <div class="flex w-1/3 h-12 px-3 py-6 font-medium text-base items-center">
        Class
      </div>
      <div class="flex w-1/3 h-12 px-3 py-6 font-medium text-base items-center">
        Tier
      </div>
      <div class="flex w-1/3 h-12 px-3 py-6 font-medium text-base items-center">
        Source
      </div>
    </div>
    <InfiniteScroll loadMore={loadMore}>
      {content}
    </InfiniteScroll>
  </div>
  );
};
