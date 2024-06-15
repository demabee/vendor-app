import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

type UploadImageProps = {
  image: string | null;
  setImage: (uri: string) => void;
  placeholder?: string;
}

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.light.orange};
  border-radius: 100px;
  border-width: 4px;
  border-color: ${Colors.dark.darkRed};
  width: 150px;
  height: 150px;
`;

const StyledImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-width: 4px;
  border-color: ${Colors.dark.darkRed};
  border-radius: 100px;
  margin-top: 20px;
`;

const PlaceholderLabel = styled(Text)`
  color: ${Colors.light.white};
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
`;

const UploadImage: React.FC<UploadImageProps> = ({ image, setImage, placeholder }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {image ? (
        <StyledImage source={{ uri: image }} />
      ) : (
        <Container>
          <Feather
            name="upload"
            size={30}
            color={Colors.light.white}
          />
          <PlaceholderLabel>{placeholder ?? 'Upload Image'}</PlaceholderLabel>
        </Container>
      )}
    </TouchableOpacity>
  );
};

export default UploadImage;
