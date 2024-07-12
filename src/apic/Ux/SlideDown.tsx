import * as React from "react";
import { useSpring, animated } from "@react-spring/web";

interface SlideDownProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const SlideDown: React.FC<SlideDownProps> = ({ isVisible, children }) => {
  const slideDownAnimation = useSpring({
    transform: isVisible ? "translateY(0%)" : "translateY(-100%)",
    opacity: isVisible ? 1 : 0,
  });

  return <animated.div style={slideDownAnimation}>{children}</animated.div>;
};

export default SlideDown;
