import InfiniteScroll from "../../utils/infiniteScroll"
import { useStore } from "@nanostores/preact";
import { FeatCard } from "../Cards";
import { featsPageState } from "../../store/builderStore";
import TableTemplate from "./TableTemplate";
import featData from "../../data/feats";

//sort data by sort property and then by name then reduce it to groups of 25
const featsPages = [...featData].sort((a, b) => {
  if (a.sort < b.sort) { return -1; };
  if (a.sort > b.sort) { return 1; };
  if (a.featName < b.featName) { return -1; };
  if (a.featName > b.featName) { return 1; };
  return 0;
}).reduce((acc, feat, index) => {
  const groupIndex = Math.floor(index / 250);
  if (!acc[groupIndex]) {
    acc[groupIndex] = [];
  }
  acc[groupIndex].push(feat);
  return acc;
}, []);

// create cards for the current page
const getCards = () => {
  const featsPage = featsPageState.get();
  const cards = [];
  featsPages[featsPage].forEach((feat) => {
    cards.push(
      <FeatCard 
        featName={feat.featName}
        tier={feat.tier}
        refSource={feat.refSource} 
      />
    );
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
    <TableTemplate titles={["Feat", "Tier", "Source"]}>
        <InfiniteScroll loadMore={loadMore}>
          {content}
        </InfiniteScroll>
    </TableTemplate>
  );
};
