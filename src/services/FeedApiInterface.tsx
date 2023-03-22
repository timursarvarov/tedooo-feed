import {TypeFeedItem} from "../components/FeedItem/FeedItem";

export interface FeedResponse {
    feedList: TypeFeedItem[];
    hasMore: boolean;
}

export interface FeedApiInterface {
    getFeedList: (skip: number) => Promise<FeedResponse>;
}
