import { useMemo } from 'react';
import { IPostItem } from '../types/interfaces/PostItem';

export const useSortedPosts = (posts: IPostItem[], sort: string) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a: any, b: any) =>
        a[sort].localeCompare(b[sort]),
      );
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts: IPostItem[], sort: string, query: string) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
