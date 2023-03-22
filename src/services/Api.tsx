import axios, {AxiosInstance} from 'axios';
import {FeedApiInterface, FeedResponse} from "./FeedApiInterface";
import {TypeFeedItem} from "../components/FeedItem/FeedItem";
import {UUID} from "crypto";
import {API_URL} from '../contants/Settings';


class Api implements FeedApiInterface {
    private readonly apiToken: string | null;
    private client: AxiosInstance | null;
    private readonly apiUrl: string;

    private static instance: Api | null = null;

    constructor() {
        this.apiToken = null;
        this.client = null;
        this.apiUrl = API_URL;
    }

    init = (): AxiosInstance => {

        let headers = {
            Accept: 'application/json',
            Authorization: ''
        };

        if (this.apiToken) {
            headers.Authorization = `Bearer ${this.apiToken}`;
        }

        this.client = axios.create({
            baseURL: this.apiUrl,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }

    getFeedList = (skip: number) => {
        return this.init()
            .get(`/hw/feed.json`, {params: {skip}})
            .then((response) => {
                return {
                    feedList: response.data.data as TypeFeedItem[],
                    hasMore: response.data.hasMore
                } as FeedResponse;
            });
    };

    sendImpression(itemId: UUID): Promise<void> {
        return this.init()
            .get(``, {params: {itemId}});
    }

}

export default Api.getInstance();
