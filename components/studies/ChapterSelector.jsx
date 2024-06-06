import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChapterSelector = ({ chapters, chapterState, setChapter }) => {
  const [selectedChapter, setSelectedChapter] = useState(chapterState);

  const handleChapterPress = (chapter) => {
    setSelectedChapter(chapter);
    setChapter(chapter);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleChapterPress(item)}
        style={{
          padding: 10,
          backgroundColor: item === selectedChapter ? 'lightgray' : 'white',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Text>REORDER</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={chapters}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

export default ChapterSelector;