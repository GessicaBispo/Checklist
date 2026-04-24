import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export function usePhotoManager() {
    const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setPhotos(prev => [...prev, ...result.assets]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const hasPhotos = () => photos.length > 0;

    return {
        photos,
        pickImages,
        removePhoto,
        hasPhotos,
    };
}
