import * as React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  ImageURISource,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';

export type ProgressBarProps = {
  isIndeterminate?: boolean;
  duration?: number;
  isAnimated?: boolean;
  progress?: number;
  color?: string;
  trackColor?: string;
  progressImage?: ImageURISource | ImageURISource[];
  trackImage?: ImageURISource | ImageURISource[];
  height?: number;
  borderRadius?: number;
  style?: ImageBackgroundProps['style'];
};

const ProgressBar = ({
  isIndeterminate = false,
  duration = isIndeterminate ? 1000 : 500,
  isAnimated = false,
  progress = isIndeterminate ? 0.5 : 0,
  height = 7,
  borderRadius = height * 0.5,
  color = '#007aff',
  trackColor = 'transparent',
  style,
  trackImage,
  progressImage,
}: ProgressBarProps) => {
  const [width, setWidth] = React.useState(0);
  const [animatedWidth, setAnimatedWidth] = React.useState(0);

  React.useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        setAnimatedWidth((prevWidth) => {
          const nextWidth = prevWidth + (progress - prevWidth) * 0.1; // Adjust speed here
          return nextWidth > progress ? progress : nextWidth;
        });
      }, 16); // Adjust interval here

      return () => clearInterval(interval);
    }
  }, [isAnimated, progress]);

  React.useEffect(() => {
    if (isIndeterminate) {
      const interval = setInterval(() => {
        setAnimatedWidth((prevWidth) =>
          prevWidth >= width ? 0 : prevWidth + 5
        ); // Adjust speed here
      }, 16); // Adjust interval here

      return () => clearInterval(interval);
    }
  }, [isIndeterminate, width]);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <ImageBackground
      onLayout={onLayout}
      resizeMode={'stretch'}
      style={[
        styles.container,
        {
          height: 2,
          borderRadius,
          backgroundColor: trackColor,
        },
        style,
      ]}
      source={trackImage}
    >
      <ImageBackground
        style={[
          styles.bar,
          {
            width:
              isAnimated || isIndeterminate ? animatedWidth : progress * width,
            backgroundColor: color,
          },
        ]}
        source={progressImage}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    height: 1,
  },
  bar: {
    resizeMode: 'stretch',
    left: 0,
    position: 'absolute',
    height: '100%',
  },
});

export default ProgressBar;
