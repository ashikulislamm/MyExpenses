import * as ImagePicker from 'expo-image-picker';
import { Paths, File } from 'expo-file-system';
import { Platform } from 'react-native';

export const AvatarService = {
  async pickAvatar(): Promise<string | null> {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const sourceUri = result.assets[0].uri;
      if (Platform.OS === 'web') {
        return sourceUri;
      }

      // Copy image to permanent App Documents directory
      const fileName = `avatar_${Date.now()}.jpg`;
      const sourceFile = new File(sourceUri);
      const targetFile = new File(Paths.document, fileName);

      sourceFile.copy(targetFile);

      return targetFile.uri;
    } catch (error) {
      console.error('Failed to pick and save avatar image:', error);
      return null;
    }
  },
};
