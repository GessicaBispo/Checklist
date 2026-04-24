import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export function useVideoManager() {
  const [videos, setVideos] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const pickVideos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setVideos(prev => [...prev, ...result.assets]);
    }
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const hasVideos = () => videos.length > 0;

  return {
    videos,
    pickVideos,
    removeVideo,
    hasVideos,
  };
}
