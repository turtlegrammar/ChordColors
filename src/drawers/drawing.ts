import { RGBA } from "@/domain/services/colorGiver";

export type Box = { width: number; height: number; xOrigin: number; yOrigin: number; }

export type BoxedImage = { box: Box; image: ImageData; }

export function drawBoxedImage(ctx: CanvasRenderingContext2D, boxedImage: BoxedImage ) {
    ctx.putImageData(boxedImage.image, boxedImage.box.xOrigin, boxedImage.box.yOrigin);
}

// percent: between 0 and 1, % along the way to draw the split line.
// same as the % that the left box will have.
// returns [left, right]
export function splitVertical(box: Box, percent: number): [Box, Box] {
    const leftWidth = Math.floor(box.width * percent) - 1;
    const rightWidth = Math.ceil(box.width * (1 - percent)) - 1;
    const leftBox = { width: leftWidth, height: box.height, xOrigin: box.xOrigin, yOrigin: box.yOrigin};
    const rightBox = { width: rightWidth, height: box.height, xOrigin: box.xOrigin + leftWidth, yOrigin: box.yOrigin};
    return [leftBox, rightBox];
}

// return [top, bottom]
export function splitHorizontal(box: Box, percent: number): [Box, Box] {
    const topHeight = Math.floor(box.height * percent);
    const bottomHeight = Math.ceil(box.height * (1 - percent));
    const topBox = { width: box.width, height: topHeight, xOrigin: box.xOrigin, yOrigin: box.yOrigin };
    const bottomBox = { width: box.width, height: bottomHeight, xOrigin: box.xOrigin, yOrigin: box.yOrigin + topHeight};
    return [topBox, bottomBox];
}

export type PixelFn = (x: number, y: number) => RGBA

export function makeBoxedImage(box: Box, pixelFn: PixelFn): BoxedImage {
    const arr = new Uint8ClampedArray(box.width * box.height * 4);
    const imgData = new ImageData(arr, box.width);
    for (let y = 0; y < box.height; y++) {
        const ywidth = y*box.width;
        for (let x = 0; x < box.width; x++) {
            const i4 = 4 * (x + ywidth);
            const rgb = pixelFn(x, y);
            arr[i4] = rgb.red;
            arr[i4 + 1] = rgb.green;
            arr[i4 + 2] = rgb.blue;
            arr[i4 + 3] = rgb.alpha;
        }
    }
    return {box: box, image: imgData};
}