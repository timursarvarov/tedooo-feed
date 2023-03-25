import React, {FC, useState} from "react";
import TDImageWithPlaceholder from "../TDImageWithPlaceholder/TDImageWithPlaceholder";
import {TDImageSkeleton} from "../TDImageSkeleton/TDImageSkeleton";
import "./TDImageBox.scss";

type TypeTDImagesBox = {
    images: string[];
    style?: React.CSSProperties;
    stopLoading: boolean;
}

const  ImageLayoutClasses: Record<number, string> = {
    1:"one-image",
    2:"two-images",
    3:"three-images",
    4:"four-images",
    5:"five-images",
}


const TDImageBox: FC<TypeTDImagesBox> = ({images,style, stopLoading }) => {
    const classIndex = images.length >= 5 ? 5 : images.length;
    const imageLayoutClass = ImageLayoutClasses[classIndex];
    const [backGroundColor, setBackGroundColor] = useState<string>("");

  return (
      <div className="wrapper-image-container" style={{...style, backgroundColor:backGroundColor}}>
        <div className={`image-grid-container ${imageLayoutClass}`}>
            {images?.map((image, index) =>
                index < 5 && (
                <div className="image-container" key={index} >
                    <TDImageWithPlaceholder
                        stopLoading={stopLoading}
                        style={{
                            height: "100%",
                            objectFit: "cover",
                            borderStyle: "none",
                            verticalAlign: "middle"}}
                        ImagePlaceholder={<TDImageSkeleton
                            style={{width: "100%", height: "50vh", objectFit: "cover"}}/>}
                        rgbaCallback={(rgba) => setBackGroundColor(rgba)}
                        src={image}/>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TDImageBox;


