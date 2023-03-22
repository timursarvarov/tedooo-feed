import React, {FC, ReactNode} from 'react';
import VirtualScrollChild from "../VirtualScrollChild/VirtualScrollChild";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

export type TypeVirtualAndInfiniteScrollProps = {
    listItems: ReactNode[];
    height: number;
    hasMore: boolean;
    lastRowHandler: Function
}
const VirtualAndInfiniteScroll: FC<TypeVirtualAndInfiniteScrollProps> = (
    {listItems, height, lastRowHandler, hasMore}) => {
    const VirtualScrollChildren = listItems.map(listItem =>
        <VirtualScrollChild height={height} children={listItem}/>
    );

    return (
        <InfiniteScroll
            listItems={VirtualScrollChildren}
            hasMore={hasMore}
            lastRowHandler={lastRowHandler}/>
    );
}

export default VirtualAndInfiniteScroll;
