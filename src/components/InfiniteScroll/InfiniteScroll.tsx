import React, {FC, ReactElement, ReactNode, useEffect, useRef} from 'react';
import {InView} from 'react-intersection-observer';
import Api from "../../services/api";
import {IMPRESSION_TIMEOUT, IMPRESSION_THRESHOLD, IMPRESSION_MULTIPLE_MODE} from "../../contants/Settings";

export type TypeInfiniteScrollProps = {
    listItems: ReactNode[];
    lastRowHandler: Function;
    hasMore: boolean;
}

const InfiniteScroll: FC<TypeInfiniteScrollProps> = ({listItems, lastRowHandler, hasMore}) => {
    const timeouts: { [index: string]: any } = useRef({})

    const handleInView = (i: number, listItem: ReactNode, inView: boolean) => {
        // @ts-ignore
        if (listItems.length - 1 === i && hasMore) {
            lastRowHandler();
        }

        const itemID = (listItem as ReactElement)?.props?.children?.key;

        if (!itemID) {
            return;
        }

        if (inView) {
            timeouts.current[itemID] = setTimeout(() => {
                Api.sendImpression(itemID);
            }, IMPRESSION_TIMEOUT)
        } else {
            clearTimeout(timeouts.current[itemID])
        }

    }

    const Elements = listItems.map((listItem, i) => {
        return (
            <InView
                triggerOnce={IMPRESSION_MULTIPLE_MODE}
                threshold={IMPRESSION_THRESHOLD}
                as="div" onChange={(inView) => handleInView(i, listItem, inView)}>
                {listItem}
            </InView>
        );
    });
    return (<>
        {Elements}
        <div hidden={hasMore} style={{"backgroundColor": "red", "height": "430px", "overflow": "hidden"}}>
            <div>End of the list</div>
        </div>
    </>);
}

export default InfiniteScroll;
