import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { FlatList, View } from 'react-native';

const ScrollList = ({
  data,
  renderItem,
  keyExtractor,
  extraData,
  ItemSeparatorComponent,
  contentContainerStyle,
  ListEmptyComponent,
  theme,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={{ scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}` }}
      keyExtractor={keyExtractor}
      extraData={extraData}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default withTheme(ScrollList);
