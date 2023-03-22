import React, {FC, ReactNode, useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

export type TypeInfiniteScrollProps = {
    listItems: ReactNode[];
    lastRowHandler: Function;
    hasMore: boolean;
}

const InfiniteScroll: FC<TypeInfiniteScrollProps> = ({listItems, lastRowHandler, hasMore}) => {
    const [lastRowRef, lastRowInView] = useInView();
    // if last row is in view, call the last row handler
    const callLastRowHandler = () => {
        console.log(lastRowInView, hasMore);
        hasMore && lastRowInView && lastRowHandler();
    }

    useEffect(callLastRowHandler, [lastRowInView]);

    const Elements = listItems.map((listItem, i) => {
        const props: Record<string, any> = {key: i};
        (i === listItems.length - 1) && (props['ref'] = lastRowRef);

        return (
            <div {...props}>
                {listItem} {hasMore } - {listItems.length - 1} - {i}
                <div hidden={!(i === listItems.length - 1 && !hasMore) } style={{"backgroundColor": "red", "height": "430px", "overflow": "hidden"}}>
                    <div>End of the list</div>
                </div>
            </div>
        );
    });
    return (<>{Elements}</>);
}

export default InfiniteScroll;
