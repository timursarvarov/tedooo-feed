import React, {useState, useEffect, ReactNode} from 'react';
import {FeedItem, TypeFeedItem} from "../FeedItem/FeedItem";
import {useEffectOnce} from "../../hooks/UseEffectOnce";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll/VirtualAndInfiniteScroll";
import Api from "../../services/Api";
import {FeedResponse} from "../../services/FeedApiInterface";

const FeedList: React.FC = () => {
    const [feedItems, setFeedItems] = useState<TypeFeedItem[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchFeedItems = async () => {
        setLoading(true);
        setHasError(false);
        Api.getFeedList(skip).then(
            (response) => {
                const {feedList, hasMore} = response;
                setFeedItems(prevItems => {
                    return [...prevItems, ...feedList]
                });
                setHasMore(hasMore);
                setSkip(skip + 6);
            }
        ).catch((error) => {
            console.error(error);
            setHasError(true);
        }).finally(() => {
            setLoading(false);
        })
    };


    useEffectOnce(() => {
        fetchFeedItems();
    });


    const NodeFeedItems = feedItems.map(feedItem =>
        <FeedItem item={feedItem} key={feedItem.id}/>
    );


    return (
        <VirtualAndInfiniteScroll
            lastRowHandler={fetchFeedItems}
            height={230}
            listItems={NodeFeedItems}
            hasMore={hasMore}
            loading={loading}
            hasError={hasError}
        />);
};

export default FeedList;
