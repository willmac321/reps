import React, { useState } from "react";
import {
  View,
  Animated,
  Easing,
  Text,
  StyleSheet,
} from "react-native";
import {
  IconButton,
  Card,
  withTheme,
  TouchableRipple,
} from "react-native-paper";
import { useIsMounted } from "../../../../utils/useIsMounted";
import { isMobile, useIsSmallScreen } from "../../../../utils/checkPlatform";

const nextButtonIconArr = [
  "check",
  "heart",
  "cheese",
  "trophy",
  "hat-cowboy",
  "fire",
  "skull",
  "arrow-down",
  "cookie-bite",
  "crown",
  "candy-cane",
  "meteor",
  "dog",
  "star",
  "horse",
  "hippo",
  "sun",
  "rocket",
  "snowman",
  "gem",
  "cat",
  "carrot",
];

const ExerciseOnPressLog = ({ theme, content, onProgress }) => {
  const springAnim = React.useRef(new Animated.Value(0)).current;
  const isMounted = useIsMounted();
  const animColor = React.useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(0);
  const [icon, setIcon] = useState("check");

  const styles = StyleSheet.create({
    item: {
      marginHorizontal: 10,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRightWidth: 6,
    },
    selectedText: {
      ...theme.buttonTextSecondary,
      color: theme.buttonTextSecondary.color,
      marginVertical: "auto",
    },
    subItemView: {
      flex: 0,
      flexGrow: 1,
      textAlignVertical: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    selectedSubItemText: {
      margin: 4,
      padding: 4,
      borderRadius: 8,
      backgroundColor: `${theme.colors.primary}19`,
      flex: 0,
      flexGrow: 1,
    },
    subItemText: {
      marginVertical: "auto",
      flex: 1,
      flexGrow: 1,
      padding: 4,
    },
    subItem: {
      ...theme.item,
      flexDirection: "row",
      flex: 0,
      flexGrow: 1,
      borderWidth: 1,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.secondarySelected,
      padding: 5,
      margin: 1,
      minHeight: 40,
    },
    selectedSubItem: {
      ...theme.item,
      borderWidth: 1,
      borderColor: theme.colors.secondarySelected,
      padding: 5,
      margin: 1,
      minHeight: 40,
      backgroundColor: theme.colors.secondarySelected,
    },
    icon: {
      color: theme.buttonText.color,
      marginVertical: 20,
      paddingRight: 20,
      ...theme.title,
    },
    text: {
      marginVertical: "auto",
      color: theme.buttonText.color,
    },
    rowTextHeader: {
      fontSize: 24,
      fontWeight: "bold",
      color: `${theme.colors.secondary}`,
    },
    rowTextContainer: {
      marginHorizontal: 4,
      paddingHorizontal: 4,
      textAlignVertical: "middle",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderBottomColor: `${theme.colors.accent}`,
    },
  });

  React.useEffect(() => {
    Animated.spring(springAnim, {
      toValue: 100,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  const onLocalPress = (index) => {
    if (isMounted.current) {
      setSelected(index);
      Animated.timing(animColor, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
        easing: Easing.in(Easing.exp),
      }).start(() => {});
    }
  };

  const goNext = React.useCallback(() => {
    if (isMounted.current) {
      setIcon(
        nextButtonIconArr[Math.floor(Math.random() * nextButtonIconArr.length)]
      );
      if (parseInt(content.sets, 10) - 1 > selected) {
        onLocalPress(selected + 1);
      } else {
        onProgress();
        setSelected(null);
      }
    }
  }, [
    isMounted,
    selected,
    onProgress,
    onLocalPress,
    setSelected,
    content.sets,
  ]);

  React.useEffect(() => {
    const listener = (event) => {
      if (
        isMounted.current &&
        (event.code === "Space" ||
          event.code === "Enter" ||
          event.code === "NumpadEnter")
      ) {
        goNext();
      }
    };
    if (isMounted.current && !isMobile()) {
      document.addEventListener("keydown", listener);
    }
    return () => {
      if (isMounted.current && !isMobile()) {
        document.removeEventListener("keydown", listener);
      }
    };
  }, [goNext, isMounted]);

  return (
    <>
      <Animated.View
        style={{
          transform: [
            {
              scale: springAnim.interpolate({
                inputRange: [1, 100],
                outputRange: [0.8, 1],
              }),
            },
          ],
          opacity: springAnim.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        }}
      >
        <Card theme={theme} style={styles.item}>
          <Card.Title
            style={styles.rowTextContainer}
            theme={theme}
            title={
              <Text theme={theme} style={[styles.rowTextHeader]}>
                {content.title}
              </Text>
            }
          />
          <Card.Content style={{ paddingTop: 8 }}>
            {[...Array(content.sets)].map((_, i) => (
              <TouchableRipple
                // eslint-disable-next-line
                key={`selected_${Date.now()}_${i}`}
                rippleColor={theme.colors.secondarySelected}
                underlayColor={theme.colors.secondarySelected}
                theme={theme}
                style={[
                  { marginTop: 4 },
                  selected === i ? styles.selectedSubItem : styles.subItem,
                ]}
                onPress={(e) => onLocalPress(i, e)}
              >
                <View
                  theme={theme}
                  style={[
                    {
                      flexDirection: "column",
                    },
                    styles.subItemView,
                    selected
                      ? {
                          flexDirection: "row",
                          flexGrow: 1,
                        }
                      : {},
                  ]}
                >
                  <View
                    style={
                      selected === i
                        ? styles.selectedSubItemText
                        : styles.subItemText
                    }
                  >
                    <Text
                      theme={theme}
                      style={selected === i ? styles.selectedText : styles.text}
                    >
                      Set {i + 1}
                    </Text>
                  </View>
                  <View
                    style={
                      selected === i
                        ? styles.selectedSubItemText
                        : styles.subItemText
                    }
                  >
                    <Text
                      theme={theme}
                      style={selected === i ? styles.selectedText : styles.text}
                    >
                      Rep Range: {content.repRange[0]} to {content.repRange[1]}
                    </Text>
                  </View>
                  <View
                    style={[
                      selected === i
                        ? styles.selectedSubItemText
                        : styles.subItemText,
                    ]}
                  >
                    <Text
                      theme={theme}
                      style={selected === i ? styles.selectedText : styles.text}
                    >
                      Rest Target:{" "}
                      {new Date(content.rest * 1000)
                        .toISOString()
                        .substring(14, 19)}
                    </Text>
                  </View>
                  {selected === i && (
                    <View theme={theme} style={{ alignItems: "flex-end" }}>
                      <IconButton
                        icon={icon}
                        color={theme.buttonTextSecondary.color}
                        style={[
                          {
                            marginVertical: "auto",
                            backgroundColor: theme.colors.backgroundShadow,
                          },
                        ]}
                        size={24}
                        onPress={goNext}
                      />
                    </View>
                  )}
                </View>
              </TouchableRipple>
            ))}
          </Card.Content>
        </Card>
      </Animated.View>
    </>
  );
};

export default withTheme(ExerciseOnPressLog);
