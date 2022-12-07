import { FeatCard } from "../Cards";
import featData from "../../data/feats";

const featList = featData.map((featData) => (
  <FeatCard
    featName={featData.featName}
    sort={featData.sort}
    tier={featData.tier}
    refSource={featData.refSource}
  />
));

export default function FeatsTable() {
  return (
  <div class="flex h-full flex-col shadow bg-white">
    <div class="flex px-2">
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Class
      </div>ize
      
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Role
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Power Source
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Key Ability
      </div>
      <div class="flex w-1/5 h-12 px-3 py-6 font-medium text-base items-center">
        Source
      </div>
    </div>
    {featList}
  </div>
  );
};
