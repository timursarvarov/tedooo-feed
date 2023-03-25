import {TypeFeedItem} from "../components/TDFeedItem/TDFeedItem";
import {UUID} from "crypto";

export interface FeedResponse {
    feedList: TypeFeedItem[];
    hasMore: boolean;
}

export interface FeedApiInterface {
    getFeedList: (skip: number) => Promise<FeedResponse>;
    sendImpression: (itemId: UUID) => Promise<void>;
}


