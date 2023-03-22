import React, {useState} from 'react';
import {useInView} from "react-intersection-observer";


export type TypeFeedItem = {
    id: string;
    user_name: string;
    shop_name: string;
    post_text: string;
    post_images?: string[];
    total_likes: number;
    total_comments: number;
    is_liked: boolean;
}

export type TypeFeedItemProps = {
    item: TypeFeedItem;
}

export const FeedItem: React.FC<TypeFeedItemProps> = ({item}: TypeFeedItemProps) => {
    const [is_liked, setIsLiked] = useState<boolean>(item.is_liked);
    const [likes, setLikes] = useState<number>(item.total_likes);
    const [ref, inView] = useInView()

    function handleLike() {
        setIsLiked(!is_liked);
        setLikes(likes + (is_liked ? -1 : 1));
    }

    return (

        <div >
            <div>{item.id}</div>
            <div>{item.shop_name}</div>
            <div>{item.post_text}</div>
            {item.post_images?.map((image, index) => (
                <img key={index} src={image} alt=""/>
            ))}
            <div>{item.total_likes} likes</div>
            <div>{item.total_comments} comments</div>
            <button onClick={() => handleLike()}>{item.is_liked ? 'Unlike' : 'Like'}</button>
        </div>
    )
}
