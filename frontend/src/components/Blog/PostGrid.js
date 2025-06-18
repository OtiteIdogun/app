import React from 'react';
import PostCard from './PostCard';
import { Skeleton } from '../ui/skeleton';

const PostGrid = ({ posts, loading = false, compact = false }) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          {compact ? "No posts to display." : "Be the first to write a post!"}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          compact={compact}
        />
      ))}
    </div>
  );
};

export default PostGrid;