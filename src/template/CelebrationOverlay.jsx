import { useLayoutEffect, useRef, useCallback, useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Animated, View, useWindowDimensions } from "react-native";
import { withTheme, Portal } from "react-native-paper";
import StateContext from "../controllers/state";
import { debounce } from "lodash";

const CelebrationItem = ({ style, theme, startX, startY }) => {
  const isStarted = useRef(false);
  const randIcon = Math.round(Math.random() * 3);
  const randX = (Math.random() + 0.1) % 1;
  const randY = (Math.random() + 0.3) % 1;
  const negX = Math.random() >= 0.5 ? 1 : -1;
  const randFade = ((Math.random() + 10) % 10) * 2500;
  const size = (Math.random() + 0.1) % 1;

  const icons = ["horse", "thumbs-up", "dumbbell"];

  // animated ValueXY doesnt seem to work in this application
  const celebration = useRef(
    new Animated.ValueXY({
      x: startX + negX * 20 * randX,
      y: startY + 20 * randY,
    })
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

  const parallel = Animated.parallel([decay, fadeOut, rotateAround]);

  useLayoutEffect(
    useCallback(() => {
      if (!isStarted.current) {
        isStarted.current = true;
        parallel.start();
      }
    }, [rotateAround, decay, fadeOut])
  );

  return (
    <Animated.View
      style={{
        ...style,
        position: "absolute",
        opacity: fade,
        transform: celebration.getTranslateTransform(),
      }}
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

const Celebration = ({ style, theme }) => {
  const {
    isCelebrationVisible: isVisible,
    setIsCelebrationsVisible: setIsVisible,
  } = useContext(StateContext);

  const { height, width } = useWindowDimensions();

  const debounceCelebrate = useCallback(
    debounce(() => setIsVisible(false), 2500),
    []
  );

  useLayoutEffect(
    useCallback(() => {
      if (isVisible) {
        debounceCelebrate();
      }
    }, [isVisible])
  );

  return (
    <Portal theme={theme}>
      {isVisible && (
        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            flexGrow: 1,
            flexShrink: 0,
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {[...Array(50).keys()].map((v) => (
            <CelebrationItem
              key={v}
              theme={theme}
              style={style}
              startX={width / 2 - 16}
              startY={height - 20}
            />
          ))}
        </View>
      )}
    </Portal>
  );
};

export default withTheme(Celebration);
