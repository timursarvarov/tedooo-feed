import {TypeFeedItem} from "../components/FeedItem/FeedItem";
import {UUID} from "crypto";

export interface FeedResponse {
    feedList: TypeFeedItem[];
    hasMore: boolean;
}

export interface FeedApiInterface {
    getFeedList: (skip: number) => Promise<FeedResponse>;
    sendImpression: (itemId: UUID) => Promise<void>;
}


