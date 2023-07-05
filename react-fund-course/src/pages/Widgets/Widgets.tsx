import { useEffect, useState } from 'react';
import PhotoService from '../../api/PhotoService';
import { useFetching } from '../../hooks/useFetching';
import { getPageCount } from '../../utils/pages';
import { IPhotoItem } from '../../types/interfaces/PhotoItem';
import MyWidget from '../../components/ui/widget/MyWidget';

const Widgets = () => {
  const [photos, setPhotos] = useState<IPhotoItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [page] = useState<number>(1);

  // hooks

  const [fetchPhotos, isPhotoLoading] = useFetching(async (limit: number, page: number) => {
    const response = await PhotoService.getAll(limit, page);
    //setPosts([...posts, ...response.data]);
    setPhotos(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
    console.log(totalPages);
  });

  //   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  //     setPage(page + 1);
  //   })

  useEffect(() => {
    fetchPhotos(limit, page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <h1
    //   style={{ marginTop: '1rem' }}
    //   data-testid='widgets-page'
    // >
    //   Here will be widgets!
    // </h1>

    <div className='widgets'>
      {!isPhotoLoading ? (
        photos.map((photoData) => (
          <MyWidget
            key={photoData.id}
            {...photoData}
          />
        ))
      ) : (
        <p className='loading-text'>Loading Data...</p>
      )}
    </div>
  );
};

export default Widgets;
