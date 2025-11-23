import React, { useEffect } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, withSequence, withRepeat, Easing
} from 'react-native-reanimated';
import { CellModel } from './types';

type CellProps = {
  model: CellModel;
  size: number; // px
  selected: boolean;
  onPress: (model: CellModel) => void;
  onDeselect: (model: CellModel) => void;
  invalidSignal?: number; // bump to trigger wiggle
  onAnimationEnd?: () => void;
  removing?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Cell({
  model,
  size,
  selected,
  onPress,
  onDeselect,
  invalidSignal = 0,
  onAnimationEnd,
  removing = false,
}: CellProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const wiggle = useSharedValue(0);

  // Selection pulse
  useEffect(() => {
    if (selected) {
      scale.value = withSequence(
        withTiming(1.05, { duration: 120 }),
        withSpring(1.03, { damping: 8 })
      );
    } else {
      scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
    }
  }, [selected]);

  // Remove animation (pop & vanish)
  useEffect(() => {
    if (removing) {
      // pop then vanish
      scale.value = withSequence(
        withTiming(1.25, { duration: 160 }),
        withTiming(0.0, { duration: 260 })
      );
      opacity.value = withTiming(0, { duration: 300 }, () => {
        onAnimationEnd && onAnimationEnd();
      });
    }
  }, [removing]);

  // invalid wiggle trigger (bumped by parent)
  useEffect(() => {
    if (invalidSignal > 0) {
      wiggle.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 60 }),
          withTiming(-1, { duration: 60 }),
          withTiming(0, { duration: 60 })
        ),
        1,
        false
      );
    }
  }, [invalidSignal]);

  const aStyle = useAnimatedStyle(() => {
    const rotate = `${wiggle.value * 6}deg`;
    return {
      transform: [{ scale: scale.value }, { rotate }],
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedPressable
      style={[styles.cell, { width: size, height: size }, aStyle]}
      onPress={() => {
        if (selected) onDeselect(model); else onPress(model);
      }}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
    >
      <Text style={styles.valueText}>{model.value}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
});
