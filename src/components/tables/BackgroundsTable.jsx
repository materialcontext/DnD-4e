import InfiniteScroll from "../../utils/infiniteScroll"
import { useStore } from "@nanostores/preact";
import { BackgroundCard } from "../Cards";
import { backgroundPageState } from "../../store/builderStore";
import backgroundData from "../../data/backgrounds";
import TableTemplate from "./TableTemplate";

//sort data by name then reduce it to groups of 25
const backgroundPages = [...backgroundData].sort((a, b) => {
    if (a.backgroundName < b.backgroundName) { return -1; };
    if (a.backgroundName > b.backgroundName) { return 1; };
    return 0;
  }).reduce((acc, background, index) => {
    const groupIndex = Math.floor(index / 250);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(background);
    return acc;
  }, []);
  
// create cards for the current page
const getCards = () => {
    const backgroundsPage = backgroundPageState.get();
    const cards = [];
    backgroundPages[backgroundsPage].forEach((background) => {
        cards.push(
        <BackgroundCard
            backgroundName={background.backgroundName}
            backgroundType={background.backgroundType}
            backgroundSkills={background.backgroundSkills}
            campaign={background.campaign}
            refSource={background.refSource}
        />
        );
    });
    return cards;
};

// set content to the first page of cards
let content = getCards();
  
export default function FeatsTable() {
    const backgroundsPage = useStore(backgroundPageState);
  
    const loadMore = () => {
      if (backgroundsPage < backgroundPages.length - 1) {
        backgroundPageState.set(backgroundsPage + 1);
        content = content.concat(getCards());
      }
    };
  return (
  <TableTemplate titles={["Background", "Type", "Skills", "Campaign", "Source"]}>
    <InfiniteScroll loadMore={loadMore}>
      {content}
    </InfiniteScroll>
  </TableTemplate>
  );
}
