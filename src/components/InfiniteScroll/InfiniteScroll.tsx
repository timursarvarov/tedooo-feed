import React, {FC, ReactElement, ReactNode, useEffect, useRef} from 'react';
import {InView} from 'react-intersection-observer';
import Api from "../../services/Api";
import {
    IMPRESSION_THRESHOLD,
    IMPRESSION_TRIGGER_ONCE,
    IMPRESSION_DELAY
} from "../../contants/Settings";

export type TypeInfiniteScrollProps = {
    listItems: ReactNode[];
    lastRowHandler: Function;
    hasMore: boolean;
}

const InfiniteScroll: FC<TypeInfiniteScrollProps> = ({listItems, lastRowHandler, hasMore}) => {

    const handleInView = (i: number, listItem: ReactNode, inView: boolean) => {
        // @ts-ignore
        if (listItems.length - 1 === i && hasMore && inView) {
            lastRowHandler();
        }

        const itemID = (listItem as ReactElement)?.props?.children?.key;

        if (!itemID) {
            return;
        }

        if (inView) {
            Api.sendImpression(itemID);
        }

    }

    const Elements = listItems.map((listItem, i) => {
        return (
            <InView
                key={i}
                delay={IMPRESSION_DELAY}
                triggerOnce={IMPRESSION_TRIGGER_ONCE}
                threshold={IMPRESSION_THRESHOLD}
                as="div" onChange={(inView) => handleInView(i, listItem, inView)}>
                {listItem}
            </InView>
        );
    });
    return (<>
        {Elements}
    </>);
}

export default InfiniteScroll;
