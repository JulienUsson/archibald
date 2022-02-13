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
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    position: 'relative',
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
  glassPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

type ArrowType = {
  x: number;
  y: number;
};

type PanContext = {
  cursorOriginX: number;
  cursorOriginY: number;
  translateX: number;
  translateY: number;
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
        {translateX: -translateX.value},
        {translateY: -translateY.value},
        {scale: pressed.value ? SCALE_FACTOR : 1},
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const cursorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pressed.value ? 1 : 0,
      transform: [{translateX: cursorX.value}, {translateY: cursorY.value}],
    };
  });

  const addArrow = (arrow: {x: number; y: number}) => {
    setArrows(old => [...old, arrow]);
  };

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanContext
  >({
    onStart: (event, ctx) => {
      pressed.value = true;

      translateX.value = ctx.translateX = targetSize / 2 - event.x;
      translateY.value = ctx.translateY = targetSize / 2 - event.y - 50;

      cursorX.value = ctx.cursorOriginX = -(targetSize / 2 - event.x);
      cursorY.value = ctx.cursorOriginY = -(targetSize / 2 - event.y);
    },
    onActive: (event, ctx) => {
      cursorX.value = ctx.cursorOriginX + event.translationX / SCALE_FACTOR;
      cursorY.value = ctx.cursorOriginY + event.translationY / SCALE_FACTOR;
    },
    onEnd: (event, ctx) => {
      runOnJS(addArrow)({
        x: targetSize / 2 - ctx.translateX + event.translationX / SCALE_FACTOR,
        y:
          targetSize / 2 -
          ctx.translateY +
          event.translationY / SCALE_FACTOR -
          50,
      });
      pressed.value = false;
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
    onFail: (event, ctx) => {
      runOnJS(addArrow)({
        x: targetSize / 2 - ctx.translateX,
        y: targetSize / 2 - ctx.translateY - 50,
      });
      pressed.value = false;
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
  });

  return (
    <View style={styles.root} onLayout={handleLayout}>
      <View style={[styles.container, {width: targetSize, height: targetSize}]}>
        <Animated.View style={[styles.straw, strawAnimatedStyle]}>
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
          <Animated.View
            style={[
              styles.arrow,
              {
                left: targetSize / 2 - ARROW_SIZE / 2,
                top: targetSize / 2 - ARROW_SIZE / 2,
              },
              cursorAnimatedStyle,
            ]}
          />
        </Animated.View>
        <PanGestureHandler onGestureEvent={handleGestureEvent} minDist={1}>
          <Animated.View style={styles.glassPanel} />
        </PanGestureHandler>
      </View>
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
