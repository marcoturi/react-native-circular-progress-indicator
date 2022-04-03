import React, { useMemo } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ProgressCircle from '@src/components/progressCircle';
import useAnimatedValue from '@src/hooks/useAnimatedValue';
import COLORS from '@src/utils/colors';
import styles from './styles';
import { CircularProgressProps } from './types';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  initialValue = 0,
  circleBackgroundColor = COLORS.TRANSPARENT,
  radius = 60,
  duration = 500,
  delay = 0,
  maxValue = 100,
  strokeLinecap = 'round',
  onAnimationComplete = () => null,
  activeStrokeColor = COLORS.GREEN,
  activeStrokeSecondaryColor = null,
  activeStrokeWidth = 10,
  inActiveStrokeColor = COLORS.BLACK_30,
  inActiveStrokeWidth = 10,
  inActiveStrokeOpacity = 1,
  clockwise = true,
  rotation = 0,
  title = '',
  titleStyle = {},
  titleColor,
  titleFontSize,
  progressValueColor,
  progressValueStyle = {},
  fontSize,
  valuePrefix = '',
  valueSuffix = '',
  showProgressValue = true,
  subtitle = '',
  subtitleStyle = {},
  subtitleColor,
  subtitleFontSize,
  progressFormatter = (v: number) => {
    'worklet';

    return Math.round(v);
  },
}: CircularProgressProps) => {
  const { animatedCircleProps, animatedTextProps } = useAnimatedValue({
    initialValue,
    radius,
    maxValue,
    clockwise,
    delay,
    value,
    duration,
    onAnimationComplete,
    valuePrefix,
    progressFormatter,
    valueSuffix,
  });

  const styleProps = useMemo(
    () => ({
      radius,
      rotation,
      progressValueColor,
      fontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
      subtitleStyle,
    }),
    [
      radius,
      rotation,
      progressValueColor,
      fontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
      subtitleStyle,
    ]
  );

  return (
    <View style={styles(styleProps).container}>
      <View style={styles(styleProps).rotatingContainer}>
        <ProgressCircle
          circleBackgroundColor={circleBackgroundColor}
          radius={radius}
          strokeLinecap={strokeLinecap}
          activeStrokeColor={activeStrokeColor}
          activeStrokeSecondaryColor={activeStrokeSecondaryColor}
          activeStrokeWidth={activeStrokeWidth}
          inActiveStrokeColor={inActiveStrokeColor}
          inActiveStrokeWidth={inActiveStrokeWidth}
          inActiveStrokeOpacity={inActiveStrokeOpacity}
          animatedCircleProps={animatedCircleProps}
        />
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          styles(styleProps).valueContainer,
        ]}
      >
        {showProgressValue && (
          <AnimatedInput
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue={`${valuePrefix}${initialValue}${valueSuffix}`}
            style={[
              styles(styleProps).input,
              progressValueStyle,
              styles(styleProps).fromProps,
            ]}
            animatedProps={animatedTextProps}
          />
        )}
        {title && title !== '' ? (
          <Text
            style={[styles(styleProps).title, titleStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : null}
        {subtitle && subtitle !== '' ? (
          <Text
            style={[
              styles(styleProps).title,
              styles(styleProps).subtitle,
              subtitleStyle,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CircularProgress;
