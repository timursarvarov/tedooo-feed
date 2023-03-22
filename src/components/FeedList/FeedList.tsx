import React, {useState, useEffect, ReactNode} from 'react';
import {FeedItem, TypeFeedItem} from "../FeedItem/FeedItem";
import {useEffectOnce} from "../../hooks/UseEffectOnce";
import VirtualAndInfiniteScroll from "../VirtualAndInfiniteScroll/VirtualAndInfiniteScroll";
import Api from "../../services/api";
import {FeedResponse} from "../../services/FeedApiInterface";

const FeedList: React.FC = () => {
    const [feedItems, setFeedItems] = useState<TypeFeedItem[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchFeedItems = async () => {
        try {
            const data: FeedResponse = await Api.getFeedList(skip) // get(`https://dev.tedooo.com/hw/feed.json?skip=${skip}`);

            setFeedItems(prevItems => {
                return [...prevItems, ...data.feedList]
            });
            setSkip(skip + 6);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error(error);
        }
    };


    useEffectOnce(() => {
        fetchFeedItems();
        console.log('useEffect', skip);
    });


    const NodeFeedItems = feedItems.map(feedItem =>
        <FeedItem item={feedItem} key={feedItem.id} />
    );



    return (
        <VirtualAndInfiniteScroll
            lastRowHandler={fetchFeedItems}
            height={230}
            listItems={NodeFeedItems}
            hasMore={hasMore}
        />);


};

export default FeedList;
