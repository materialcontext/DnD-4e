export default function TableTemplate(props) {
    // return a template component that contains a component as a child
    // the template should contain a series of column titles followed by the child component

    const ColumnTitles = (props) => {
        // generate a list of column titles based on the titles passed in 
        const columnTitles = props.titles.map((title) => {
            return <div class="flex w-1/3 h-12 px-3 py-6 font-medium text-base items-center mr-6 md:min-w-[125px]">{title}</div>
        });
        return (
            <div class="flex px-2">
                {columnTitles}
            </div>
        );
    };

    return (
        <div class="h-full flex flex-col shadow bg-white">
            <ColumnTitles titles={props.titles}/>
            {props.children}
        </div>
    )
};