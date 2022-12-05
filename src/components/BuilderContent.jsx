import {tabStore} from './TabStore';
import ClassTable from './ClassTable.astro';
import RaceTable from './RaceTable.astro';
import BackgroundsTable from './BackgroundsTable.astro';
import SkillsTable from './SkillsTable.astro';
import PowersTable from './PowersTable.astro';
import FeatsTable from './FeatsTable.astro';

function setView() {
    const currentTab = tabStore.get();
    switch (currentTab) {
        case 'tab-1':
        return <ClassTable />;
        case 'tab-2':
        return <RaceTable />;
        case 'tab-3':
        return <BackgroundsTable />;
        case 'tab-5':
        return <SkillsTable />;
        case 'tab-6':
        return <PowersTable />;
        case 'tab-7':
        return <FeatsTable />;
        default:
        return <ClassTable />;
    }
}

export default function BuilderContent() {
    return setView();
};