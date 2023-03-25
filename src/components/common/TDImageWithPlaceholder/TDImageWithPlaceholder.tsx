import {get_average_rgb} from "../../../helpers/ImageToRGB";
import React, {FC, ReactNode, useRef, useState, useCallback} from "react";

interface ImageWithPlaceholderProps {
    ImagePlaceholder: ReactNode;
    src: string;
    style: React.CSSProperties;
    rgbaCallback?: (rgba: string) => void;
    stopLoading: boolean;
}

const TDImageWithPlaceholder: FC<ImageWithPlaceholderProps> =
    ({
         ImagePlaceholder,
         src,
         style,
         rgbaCallback,
         stopLoading,
     }) => {
        const [loaded, setLoaded] = useState(false);
        const imageRef = useRef(null);

        const handleImageLoaded = useCallback(async () => {
            setLoaded(true);
            if (imageRef.current) {
                try {
                    const rgba = await get_average_rgb(imageRef.current);
                    rgbaCallback && rgbaCallback(rgba);
                } catch (error) {
                    console.error("Error", error);
                }
            }
        }, [rgbaCallback]);

        const getSource = () => {
            //TODO Need to find better way to stop loading images on fast scrolling
            return src;


            // if (!loaded && stopLoading) {
            //     return '';
            // } else {
            //     return src;
            // }
        };

        const imageStyle = !loaded ? {display: "none"} : {};

        return (
            <div style={{height: "100%", width: "100%"}}>
                {!loaded && ImagePlaceholder}
                <img
                    crossOrigin="anonymous"
                    ref={imageRef}
                    style={{...imageStyle, ...style}}
                    src={getSource()}
                    hidden={!loaded}
                    onLoad={handleImageLoaded}
                />
            </div>
        );
    };

export default TDImageWithPlaceholder;
