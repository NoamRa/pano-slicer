import React, { forwardRef, RefForwardingComponent } from "react";

type CanvasProps = {};

/**
 * This React Canvas component uses forwardRef, enabling manipulation outside of component
 * @param CanvasProps
 * @param children
 * @param ref
 * @example usage (parent component) -
 *  const canvasRef = useRef<HTMLCanvasElement>(null);
 *  <Canvas ref={canvasRef} />
 */
const Canvas: RefForwardingComponent<HTMLCanvasElement, CanvasProps> = (
  { children },
  ref
): JSX.Element => {
  return <canvas ref={ref}>{children}</canvas>;
};

export default forwardRef(Canvas);
