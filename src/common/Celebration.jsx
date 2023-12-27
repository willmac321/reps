import { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Animated, View } from "react-native";
import { Portal, withTheme } from "react-native-paper";

const CelebrationItem = ({ style, theme }) => {
  const isStarted = useRef(false);
  const randIcon = Math.round(Math.random() * 3);
  const randX = (Math.random() + 0.1) % 1;
  const randY = (Math.random() + 0.3) % 1;
  const negX = Math.random() >= 0.5 ? 1 : -1;
  const randFade = ((Math.random() + 10) % 10) * 2500;
  const size = (Math.random() + 0.1) % 1;

  const icons = ["horse", "thumbs-up", "dumbbell"];

  const celebration = useRef(
    new Animated.ValueXY({ x: negX * 20 * randX, y: 20 * randY })
  ).current;

  const rotated = useRef(new Animated.Value(2 * randY * 3.14)).current;

  const fade = useRef(new Animated.Value(3)).current;

  const rotateAround = Animated.timing(rotated, {
    toValue: -2 * randY,
    duration: 3000,
    useNativeDriver: true,
    isInteraction: false,
  });

  const decay = Animated.decay(celebration, {
    velocity: { x: negX * (0.5 * randX), y: -randY },
    deceleration: 0.9988,
    useNativeDriver: true,
    isInteraction: false,
  });

  const fadeOut = Animated.timing(fade, {
    toValue: 0,
    duration: randFade,
    useNativeDriver: true,
    isInteraction: false,
  });

  const spin = rotated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    if (!isStarted.current) {
      isStarted.current = true;
      rotateAround.start();
      decay.start();
      fadeOut.start();
    }
  }, [rotateAround, decay, fadeOut]);

  return (
    <Animated.View
      style={[
        {
          ...style,
          position: "absolute",
          bottom: 20,
          left: "48%",
          opacity: fade,
          transform: celebration.getTranslateTransform(),
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <FontAwesome5
          name={icons[randIcon]}
          style={{
            color: theme.colors.primary,
            fontSize: 24 * size,
            marginHorizontal: 4,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

const Celebration = ({ style, theme, isVisible, setIsVisible }) => {
  useEffect(() => {
    setTimeout(() => setIsVisible(false), 2500);
  }, []);

  return (
    <Portal>
      <View style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {[...Array(50).keys()].map((v) => (
          <CelebrationItem key={v} theme={theme} style={style} />
        ))}
      </View>
    </Portal>
  );
};

export default withTheme(Celebration);
