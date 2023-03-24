import React, {useState} from 'react';
import {FeedItem, TypeFeedItem} from "../FeedItem/FeedItem";
import {useEffectOnce} from "../../hooks/UseEffectOnce";
import Api from "../../services/Api";
import {Virtuoso} from 'react-virtuoso'

const FeedList: React.FC = () => {
    const [feedItems, setFeedItems] = useState<TypeFeedItem[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchFeedItems = async () => {
        if (!hasMore) return;
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
            console.log(error);
            setHasError(true);
        }).finally(() => {
            setLoading(false);
        })
    };


    useEffectOnce(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchFeedItems();
    });


    const getLoadingState = () => {
        if (loading) return 'Loading...'
        else if (hasError) return 'Error'
        else if (!hasMore) return 'No more data'
        else return null
    }

    const Footer = () => {
        return (
            <div
                style={{
                    padding: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {getLoadingState()}
            </div>
        )
    }

    return (
        <Virtuoso
            style={{height: '100vh'}}
            data={feedItems}
            endReached={fetchFeedItems}
            overscan={200}
            itemContent={(index, feedItem) => {
                return <FeedItem item={feedItem} key={feedItem.id}/>
            }}
            components={{Footer}}
        />)
};
export default FeedList;
