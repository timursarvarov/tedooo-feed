import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FeedItem, TypeItem} from "../FeedItem/FeedItem";
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffectOnce} from "../../hooks/UseEffectOnce";

const FeedList: React.FC = () => {
    const [feedItems, setFeedItems] = useState<TypeItem[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchFeedItems = async () => {
        try {
            const response = await axios.get(`https://dev.tedooo.com/hw/feed.json?skip=${skip}`);
            const data = response.data;

            setFeedItems(prevItems => {
                console.log(prevItems, skip, data.data, hasMore);
                return [...prevItems, ...data.data]
            });
                console.log( skip);
            setSkip(skip + 6);
            setHasMore(data.has_more);
        } catch (error) {
            console.error(error);
        }
    };


    useEffectOnce(() => {
        fetchFeedItems();
        console.log('useEffect', skip);
    });

    return (
        <InfiniteScroll
            dataLength={feedItems.length}
            next={fetchFeedItems}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items to display.</p>}
            refreshFunction={()=>{console.log('refresh')}}
            pullDownToRefresh={true}
            scrollThreshold={0.9}
        >
            {feedItems.map((item: TypeItem) => (
                <FeedItem key={item.id} item={item}/>
            ))}
        </InfiniteScroll>
    );
};

export default FeedList;
