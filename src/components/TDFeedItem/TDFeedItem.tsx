import React, {useState} from "react";
import {UUID} from "crypto";
import {InView} from "react-intersection-observer";
import "./TDFeedItem.scss";
import {IMPRESSION_DELAY, IMPRESSION_THRESHOLD, IMPRESSION_TRIGGER_ONCE} from "../../contants/Settings";
import Api from "../../services/Api";
import {Avatar, Card, Col, Divider, Row, Skeleton, Typography} from "antd";
import {LikeOutlined, LikeFilled} from "@ant-design/icons";
import {formatDistanceToNowStrict} from "date-fns";


import TDImageWithPlaceholder from "../common/TDImageWithPlaceholder/TDImageWithPlaceholder";
import TDImageBox from "../common/TDImageBox/TDImageBox";
import Meta from "antd/es/card/Meta";
import {Button, Space} from "antd";
import {TDCommentSVG} from "../common/icons/TDCommentSVG";
import {TDSmallLikeSVG} from "../common/icons/TDSmallLikeSVG";


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

export const TDFeedItem: React.FC<TypeFeedItemProps> = ({item, className, style}: TypeFeedItemProps) => {
    const [didLike, setIsLiked] = useState<boolean>(item.didLike);
    const [likes, setLikes] = useState<number>(item.likes);
    const [cardinView, setInVeiw] = useState<boolean>(false);

    function handleLike() {
        setIsLiked(!didLike);
        setLikes(likes + (didLike ? -1 : 1));
    }

    const handleInView = (inView: boolean) => {
        setInVeiw(inView);
        inView && Api.sendImpression(item.id);
    };


    return (
        <InView
            delay={IMPRESSION_DELAY}
            triggerOnce={IMPRESSION_TRIGGER_ONCE}
            threshold={IMPRESSION_THRESHOLD}
            as="div" onChange={(inView) => handleInView(inView)}
        >

            <div
                className="feed-item-card"
            >
                <Col>

                    <Row>
                        <Col span={24}>
                            <Row>
                                <Space size={8} direction={"vertical"}>
                                    <Row>
                                        <Space size={8}>
                                            <Col>
                                                <Avatar src={<TDImageWithPlaceholder
                                                    stopLoading={!cardinView}
                                                    style={{width: 32, height: 32, objectFit: "cover"}}
                                                    ImagePlaceholder={<Skeleton.Avatar active={true}/>}
                                                    src={item.avatar}/>}/>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Typography.Text strong style={{fontSize: "16px"}}
                                                    >
                                                        {item.username}
                                                    </Typography.Text>
                                                </Row>
                                                <Row>
                                                    <Space>
                                                        <Typography.Text
                                                            style={{color: "#0A66C2"}}>{item.shopName}</Typography.Text>
                                                        ·
                                                        <Typography.Text
                                                            type="secondary">{formatDistanceToNowStrict(new Date(item.date))}
                                                        </Typography.Text>
                                                    </Space>
                                                </Row>
                                            </Col>
                                        </Space>

                                    </Row>
                                    <Row>
                                        <Typography.Paragraph style={{
                                            textAlign: "start", fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                        }}>
                                            {item.text}
                                        </Typography.Paragraph>
                                    </Row>
                                </Space>
                            </Row>
                        </Col>

                    </Row>

                    <TDImageBox images={item.images}
                                stopLoading={!cardinView}
                                style={{
                                    marginLeft: "-24px",
                                    marginRight: "-24px",
                                    width: "calc(100% + 48px)"
                                }}/>


                    <Col>
                        <Row
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                height: "52px"
                            }}
                        >
                            <Col>
                                <Row>
                                    <Space>
                                        <TDSmallLikeSVG/>
                                        <Typography.Text
                                            type="secondary">{likes} Likes
                                        </Typography.Text>
                                    </Space>
                                </Row>
                            </Col>
                            <Col>
                                <Typography.Text
                                    type="secondary">{item.comments} Comments
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Divider style={{margin: 0}}/>
                        <Row align={"middle"} style={{height: "52px"}}>
                            <Col span={12}>
                                <Button type="ghost" style={{
                                    color: didLike ? "#4096ff" : "#737877",
                                }} shape="circle" icon={<LikeOutlined/>}
                                        onClick={handleLike}
                                />
                            </Col>
                            <Col span={12}>
                                <Button type="ghost" shape="circle" icon={
                                    <TDCommentSVG/>
                                }/>
                            </Col>
                        </Row>
                    </Col>

                </Col>
            </div>
        </InView>
    );
};
