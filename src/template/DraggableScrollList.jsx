import React from 'react';
import { withTheme } from 'react-native-paper';
import DraggableFlatList, { NestableDraggableFlatList } from 'react-native-draggable-flatlist';
import { isMobile } from '../utils/checkPlatform';

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


  if (!isMobile()) {
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
  }

  return (
    <NestableDraggableFlatList
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
