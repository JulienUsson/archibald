import React, {ReactNode, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ARROW_SIZE = 15;
const SCALE_FACTOR = 4;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  straw: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossHorizontal: {
    position: 'absolute',
    height: 1,
    width: '30%',
    backgroundColor: 'black',
  },
  crossVertical: {
    position: 'absolute',
    width: 1,
    height: '30%',
    backgroundColor: 'black',
  },
  arrow: {
    borderRadius: ARROW_SIZE / 2,
    height: ARROW_SIZE,
    width: ARROW_SIZE,
    backgroundColor: 'black',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'absolute',
  },
});

type ArrowType = {
  x: number;
  y: number;
};

export default function TargetInput() {
  const [arrows, setArrows] = useState<ArrowType[]>([]);

  const [size, setSize] = useState({width: 0, height: 0});
  function handleLayout(event: LayoutChangeEvent) {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }
  const targetSize = Math.min(size.height, size.width);

  const pressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cursorX = useSharedValue(0);
  const cursorY = useSharedValue(0);
  const strawAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: withTiming(pressed.value ? SCALE_FACTOR : 1)},
        {translateX: -translateX.value},
        {translateY: -translateY.value},
      ],
    };
  });

  const cursorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: SCALE_FACTOR}],
      left: cursorX.value,
      top: cursorY.value,
      opacity: pressed.value ? 1 : 0,
    };
  });

  const addArrow = (arrow: {x: number; y: number}) => {
    setArrows(old => [...old, arrow]);
  };

  const handleGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: event => {
        pressed.value = true;
        const startX = event.x - targetSize / 2;
        const startY = event.y - targetSize / 2;
        translateX.value = withTiming(startX);
        translateY.value = withTiming(startY);
        cursorX.value = event.absoluteX;
        cursorY.value = event.absoluteY;
      },
      onActive: event => {
        cursorX.value = event.absoluteX;
        cursorY.value = event.absoluteY;
      },
      onEnd: event => {
        runOnJS(addArrow)({x: event.x, y: event.y});
        pressed.value = false;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      },
      onCancel: () => {
        pressed.value = false;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      },
      onFail: event => {
        runOnJS(addArrow)({x: event.x, y: event.y});
        pressed.value = false;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      },
    });

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View
          style={[
            styles.straw,
            {width: targetSize, height: targetSize},
            strawAnimatedStyle,
          ]}>
          <Circle color="#FAFAFA" size={(targetSize * 11) / 12}>
            <Circle color="#FAFAFA" size={(targetSize * 10) / 12}>
              <Circle color="#212121" size={(targetSize * 9) / 12}>
                <Circle color="#212121" size={(targetSize * 8) / 12}>
                  <Circle color="#03A9F4" size={(targetSize * 7) / 12}>
                    <Circle color="#03A9F4" size={(targetSize * 6) / 12}>
                      <Circle color="red" size={(targetSize * 5) / 12}>
                        <Circle color="red" size={(targetSize * 4) / 12}>
                          <Circle color="yellow" size={(targetSize * 3) / 12}>
                            <Circle color="yellow" size={(targetSize * 2) / 12}>
                              <Circle
                                color="yellow"
                                size={(targetSize * 1) / 12}>
                                <View style={styles.crossHorizontal} />
                                <View style={styles.crossVertical} />
                              </Circle>
                            </Circle>
                          </Circle>
                        </Circle>
                      </Circle>
                    </Circle>
                  </Circle>
                </Circle>
              </Circle>
            </Circle>
          </Circle>
          {arrows.map((arrow, index) => (
            <View
              key={index}
              style={[
                styles.arrow,
                {
                  left: arrow.x - ARROW_SIZE / 2,
                  top: arrow.y - ARROW_SIZE / 2,
                },
              ]}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.arrow, cursorAnimatedStyle]} />
    </View>
  );
}

function Circle(props: {color: string; size: number; children?: ReactNode}) {
  return (
    <View
      style={[
        styles.circle,
        {
          borderRadius: props.size / 2,
          backgroundColor: props.color,
          width: props.size,
          height: props.size,
        },
      ]}>
      {props.children}
    </View>
  );
}
