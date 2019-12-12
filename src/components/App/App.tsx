import React, { useCallback, useRef } from "react";
import "./App.css";

import Canvas from "../Canvas";
import FileInput from "../FileInput";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hangleImageChange = useCallback((imageFile: Blob) => {
    const reader = new FileReader();
    reader.onload = function(evt: ProgressEvent<FileReader>) {
      const img = new Image();
      img.onload = function() {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        }
      };
      img.src = evt!.target!.result as string;
    };
    reader.readAsDataURL(imageFile);
  }, []);

  return (
    <div className="App">
      <FileInput onChange={hangleImageChange} />
      <Canvas ref={canvasRef} />
    </div>
  );
};

export default App;
