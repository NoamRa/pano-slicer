import React, { useCallback, useRef, useState } from "react";
import "./App.css";

import Canvas from "../Canvas";
import FileInput from "../FileInput";
import ImageMetaPresenter, { ImageMeta } from "../ImageMetaPresenter";

const initialImageMeta: ImageMeta = {
  name: "",
  width: 0,
  height: 0
};

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageMeta, setImageMeta] = useState<ImageMeta>(initialImageMeta);

  const handleImageChange = useCallback((imageFile: Blob) => {
    const reader = new FileReader();
    reader.onload = function(evt: ProgressEvent<FileReader>) {
      const img = new Image();
      img.onload = function() {
        const canvas = canvasRef.current;
        if (canvas) {
          const { width, height } = img;
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
          setImageMeta({ width, height, name: (imageFile as any).name });
        }
      };
      img.src = evt!.target!.result as string;
    };
    reader.readAsDataURL(imageFile);
  }, []);

  return (
    <div className="App">
      <FileInput onChange={handleImageChange} />
      <Canvas ref={canvasRef} />
      <ImageMetaPresenter imageMeta={imageMeta}/>
    </div>
  );
};

export default App;
