// create component for image skeleton

import {CSSProperties} from "react";
import "./TDImageSkeleton.scss";

export const TDImageSkeleton = ({style}: { style: CSSProperties }) => {
    return (
        <div style={style} className="image-skeleton"/>
    );
};
