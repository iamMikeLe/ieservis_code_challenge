import React from "react";

type Image = {
  src: string;
};

type ThumbnailProps = {
  image: Image;
  onRemove: () => void;
};

const Thumbnail: React.FC<ThumbnailProps> = ({ image, onRemove }) => {
  return (
    <div className="custom-thumb">
      <div className="custom-thumbInner">
        <img src={image.src} className="custom-img-style" />
        <button onClick={onRemove}>x</button>
      </div>
    </div>
  );
};

export default Thumbnail;
