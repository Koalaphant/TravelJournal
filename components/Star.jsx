import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Star = ({ rating, onPress }) => {
  const numStars = 5;
  const stars = [];

  const handlePress = (starIndex) => {
    if (starIndex === rating) {
        onPress(starIndex - 1)
    } else {
        onPress(starIndex)
    }
  }

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableOpacity key={x} onPress={() => handlePress(x)}>
        <FontAwesome
          name={x <= rating ? 'star' : 'star-o'}
          color='#D76778'
          size={30}
          style={{ marginHorizontal: 1 }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <>
      {stars}
    </>
  );
}

export default Star;