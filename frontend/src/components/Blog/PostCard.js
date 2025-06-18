import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, showAuthor = true, compact = false }) => {
  const handleLike = (e) => {
    e.preventDefault();
    // Mock like functionality
    console.log('Liked post:', post.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/post/${post.slug}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`);
    }
  };

  if (compact) {
    return (
      <Link to={`/post/${post.slug}`} className="block group">
        <Card className="h-full hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              {post.featuredImage && (
                <div className="flex-shrink-0">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}m read
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
      <Link to={`/post/${post.slug}`} className="block">
        {post.featuredImage && (
          <div className="relative overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge 
                className={`${post.category.color} text-white border-none shadow-md`}
              >
                {post.category.name}
              </Badge>
            </div>
            {post.status === 'draft' && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">Draft</Badge>
              </div>
            )}
          </div>
        )}
      </Link>

      <CardContent className="p-6">
        <Link to={`/post/${post.slug}`}>
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag.id} to={`/tags/${tag.id}`}>
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag.name}
              </Badge>
            </Link>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline">+{post.tags.length - 3} more</Badge>
          )}
        </div>

        {showAuthor && (
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}m read
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/20 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex items-center space-x-1"
            >
              <Link to={`/post/${post.slug}#comments`}>
                <MessageCircle className="w-4 h-4" />
                <span>Comments</span>
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex items-center space-x-1"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;