import {ReactNode} from "react";

export async function get_average_rgb(img: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            reject(new Error('Failed to create 2d context for canvas'));
            return;
        }

        context.imageSmoothingEnabled = true;
        canvas.width = 1;
        canvas.height = 1;

        context.drawImage(img, 0, 0, 1, 1);
        const imageData = context.getImageData(0, 0, 1, 1);
        const rgba = toRGBAString(new Uint8ClampedArray(imageData.data.slice(0, 3), ), 0.5)
        resolve(rgba);
    });
}

function toRGBAString(uint8Array: Uint8ClampedArray, opacity: number): string {
    const [r, g, b] = Array.from(uint8Array);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
