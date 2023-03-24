import React, { useState} from 'react';
import {UUID} from "crypto";
import Avatar from "../common/Avatar/Avatar";
import {InView} from 'react-intersection-observer';
import './FeedItem.scss';
import {IMPRESSION_DELAY, IMPRESSION_THRESHOLD, IMPRESSION_TRIGGER_ONCE} from "../../contants/Settings";
import Api from "../../services/Api";


export type TypeFeedItem = {
    id: UUID;
    avatar: string;
    comments: number
    date: string
    didLike: boolean
    images: string[]
    likes: number
    premium: boolean
    shopId: UUID
    shopName: string
    text: string
    userId: UUID
    username: string
}

export type TypeFeedItemProps = {
    item: TypeFeedItem;

    className?: string;
    style?: React.CSSProperties;
}

export const FeedItem: React.FC<TypeFeedItemProps> = ({item, className, style}: TypeFeedItemProps) => {
    const [didLike, setIsLiked] = useState<boolean>(item.didLike);
    const [likes, setLikes] = useState<number>(item.likes);

    function handleLike() {
        setIsLiked(!didLike);
        setLikes(likes + (didLike ? -1 : 1));
    }

    const handleInView = (inView: boolean) => {
        inView && Api.sendImpression(item.id);
    }

    return (
        <InView
            delay={IMPRESSION_DELAY}
            triggerOnce={IMPRESSION_TRIGGER_ONCE}
            threshold={IMPRESSION_THRESHOLD}
            as="div" onChange={(inView) => handleInView(inView)}
        >
            <div className={className} style={style}>
                <div className="card_header">
                    <div className="card_header-user_info">
                        <Avatar src={item.avatar} alt={item.username}/>
                        <div className="user_info">
                            <div className="user_info-username">{item.username}</div>
                            <div className="user_info-shop_name">{item.shopName}</div>
                        </div>
                    </div>
                    <div className="card_header-data">{item.text}</div>
                </div>
                <div>{item.text}</div>
                {item.images?.map((image, index) => (
                    <img key={index} src={image} alt=""/>
                ))}
                <div>{item.likes} likes</div>
                <div>{item.comments} comments</div>
                <button onClick={() => handleLike()}>{item.didLike ? 'Unlike' : 'Like'}</button>
            </div>
        </InView>
    )
}
