import { useState } from 'react';

export const usePhotoData = () => {
  const [photoData] = useState([]);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string>('');

  //   const usePhoto = () => {
  //     try {
  //       setIsLoading(true);
  //     } catch (e) {
  //       setError((e as Error).message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return [photoData, isLoading, error] as const;
};
