import React from 'react';
import { withTheme } from 'react-native-paper';
import { FlatList } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist
// https://stackoverflow.com/questions/65591640/how-might-i-implement-a-react-native-draggable-flatlist-as-a-function-component

const ScrollList = ({
  data,
  renderItem,
  keyExtractor,
  extraData,
  ItemSeparatorComponent,
  contentContainerStyle,
  ListEmptyComponent,
  theme,
}) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    style={{
      scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
    }}
    keyExtractor={keyExtractor}
    extraData={extraData}
    ItemSeparatorComponent={ItemSeparatorComponent}
    contentContainerStyle={contentContainerStyle}
    ListEmptyComponent={ListEmptyComponent}
  />
);

export default withTheme(ScrollList);
