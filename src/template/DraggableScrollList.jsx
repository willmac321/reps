import React from 'react';
import { withTheme } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';

const DraggableScrollList = ({
  data,
  renderItem: RenderItem,
  keyExtractor,
  extraData,
  ItemSeparatorComponent,
  contentContainerStyle,
  ListEmptyComponent,
  theme,
  onDragEnd = () => {},
}) => {
  const ref = React.useRef();

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <ListEmptyComponent />;
  }

  return (
    <DraggableFlatList
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
      ref={ref}
      onDragEnd={onDragEnd}
    />
  );
};

export default withTheme(DraggableScrollList);
