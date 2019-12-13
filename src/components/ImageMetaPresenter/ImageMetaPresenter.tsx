import React, { FC } from "react";

export type ImageMeta = {
  name: string;
  width: number;
  height: number;
};

type ImageMetaPresenterProps = {
  imageMeta: ImageMeta;
};

const ImageMetaPresenter: FC<ImageMetaPresenterProps> = ({
  imageMeta: { name, width, height }
}: ImageMetaPresenterProps) => {
  return (
    <>
      {name && (
        <>
          <div>name: <b>{name}</b></div>
          <div>width: <b>{width}px</b></div>
          <div>height: <b>{height}px</b></div>
        </>
      )}
    </>
  );
};

export default ImageMetaPresenter;
