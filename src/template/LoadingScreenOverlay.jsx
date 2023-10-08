import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { withTheme, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "../components/Splash/SplashScreen";
import { isMobile } from "../utils/checkPlatform";

const LoadingOverlay = ({ isVisible, theme }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const debounceLoad = useCallback(
    debounce((isVis) => setIsLoading(isVis), 500, {
      leading: true,
      trailing: true,
    }),
    []
  );

  useLayoutEffect(React.useCallback(() => {
    debounceLoad(isVisible);
  }, [isVisible]));

  const insets = useSafeAreaInsets();

  return (
    <Portal theme={theme}>
      {((isMobile() && isLoading) ||
        !isMobile()) && (
          <View
            style={{
              height: "100%",
              width: "100%",
              visibility: isLoading ? "visible" : "hidden",
              flexGrow: 1,
              flex: 1,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }}
            theme={theme}
          >
            <SplashScreen />
          </View>
        )}
    </Portal>
  );
};

export default withTheme(LoadingOverlay);
