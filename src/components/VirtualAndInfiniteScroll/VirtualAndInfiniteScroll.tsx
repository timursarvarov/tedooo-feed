import React, {FC, ReactNode} from 'react';
import VirtualScrollChild from "../VirtualScrollChild/VirtualScrollChild";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

export type TypeVirtualAndInfiniteScrollProps = {
    listItems: ReactNode[];
    height: number;
    hasMore: boolean;
    loading: boolean;
    hasError: boolean;
    lastRowHandler: Function
}
const VirtualAndInfiniteScroll: FC<TypeVirtualAndInfiniteScrollProps> = (
    {listItems, height, lastRowHandler, hasMore, loading, hasError}) => {
    const VirtualScrollChildren = listItems.map(listItem =>
        <VirtualScrollChild height={height} children={listItem}/>
    );

    return (
        <>
            <InfiniteScroll
                listItems={VirtualScrollChildren}
                hasMore={hasMore}
                lastRowHandler={lastRowHandler}/>
            <div hidden={!loading} style={{"backgroundColor": "yellow", "height": "230px", "overflow": "hidden"}}>
                <div>Loading</div>
            </div>
            <div hidden={hasMore} style={{"backgroundColor": "blue", "height": "430px", "overflow": "hidden"}}>
                <div>End of the list</div>
            </div>
            <div hidden={!hasError} style={{"backgroundColor": "red", "height": "430px", "overflow": "hidden"}}>
                <div>Oops something went wrong</div>
            </div>

        </>
    );
}

export default VirtualAndInfiniteScroll;
