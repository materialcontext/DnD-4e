import {tabStore} from './TabStore';
import {useStore} from '@nanostores/preact';
import ClassTable from './ClassTable.jsx';
import RaceTable from './RaceTable.astro';
import BackgroundsTable from './BackgroundsTable.astro';
import SkillsTable from './SkillsTable.astro';
import PowersTable from './PowersTable.astro';
import FeatsTable from './FeatsTable.jsx';

export default function BuilderContent() {
    const currentTab = useStore(tabStore);
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
};