import React from 'react';
import { withTheme } from 'react-native-paper';
import { FlatList, View } from 'react-native';

const ScrollList = ({
  data,
  renderItem: RenderItem,
  keyExtractor,
  extraData,
  ItemSeparatorComponent,
  contentContainerStyle,
  ListEmptyComponent,
  theme,
  showScrollView = true,
}) => (
  <>
    {showScrollView ? (
      <FlatList
        data={data}
        renderItem={RenderItem}
        style={{
          scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        }}
        keyExtractor={keyExtractor}
        extraData={extraData}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={ListEmptyComponent}
      />
    ) : (
      <>
        {data ? (
          <>
            {data.map((item, index) => (
              <View
                key={keyExtractor(item)}
                theme={theme}
                style={{
                  scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
                }}
              >
                <RenderItem item={item} />
                {index < data.length - 1 && <ItemSeparatorComponent />}
              </View>
            ))}
          </>
        ) : (
          <ListEmptyComponent />
        )}
      </>
    )}
  </>
);

export default withTheme(ScrollList);
