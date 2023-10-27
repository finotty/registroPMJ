/* 
import React, { useState, useRef } from 'react';
import { View, Image, Button, PanResponder } from 'react-native';

interface ImageCropperProps {
  imageUri: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUri }) => {
  const [cropCoordinates, setCropCoordinates] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, gestureState) => {
        const x = gestureState.moveX - cropCoordinates.width / 2;
        const y = gestureState.moveY - cropCoordinates.height / 2;
        if (x >= 0 && x + cropCoordinates.width <= imageWidth && y >= 0 && y + cropCoordinates.height <= imageHeight) {
          setCropCoordinates({ x, y, width: cropCoordinates.width, height: cropCoordinates.height });
        }
      },
    })
  );

  const onImageLayout = (e: any) => {
    setImageWidth(e.nativeEvent.layout.width);
    setImageHeight(e.nativeEvent.layout.height);
  };

  const cropImage = () => {
    // Aqui você pode recortar a imagem usando as coordenadas em cropCoordinates
    // Por exemplo: cropAndSaveImage(imageUri, cropCoordinates);
    console.log('Imagem recortada:', imageUri, cropCoordinates);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: imageUri }}
        style={{ width: '100%', height: '100%' }}
        onLayout={onImageLayout}
      />
      <View
        {...panResponder.current.panHandlers}
        style={{
          position: 'absolute',
          left: cropCoordinates.x,
          top: cropCoordinates.y,
          width: cropCoordinates.width,
          height: cropCoordinates.height,
          borderColor: 'red',
          borderWidth: 2,
        }}
      />
      <Button title="Recortar Imagem" onPress={cropImage} />
    </View>
  );
};

export default ImageCropper;
*/

/*
 import React, { useState } from 'react';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CropPicker from 'react-native-image-crop-picker';

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('É necessário permissão para acessar a câmera!');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImageUri(pickerResult.uri);
  };

  const cropImage = async () => {
    if (imageUri) {
      // Copy the image to a location react-native-image-crop-picker can access
      const newUri = FileSystem.documentDirectory + 'tempImage.jpg';
      await FileSystem.copyAsync({ from: imageUri, to: newUri });

      CropPicker.openCropper({
        path: newUri,
        width: 300,
        height: 400,
      })
        .then(image => {
          setImageUri(image.path);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Button title="Tirar foto" onPress={takePhoto} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={{ width: 300, height: 400 }} />
          <Button title="Recortar" onPress={cropImage} />
        </>
      )}
    </>
  );
}

*/
