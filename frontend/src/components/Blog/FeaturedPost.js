import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const FeaturedPost = ({ post }) => {
  if (!post) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 shadow-2xl">
      <div className="relative overflow-hidden rounded-xl bg-background">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[400px]">
          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
                Featured
              </Badge>
              <Badge 
                className={`${post.category.color} text-white border-none`}
              >
                {post.category.name}
              </Badge>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              <Link 
                to={`/post/${post.slug}`}
                className="hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            </h1>

            <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author info */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}m read
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {post.views}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                {post.likes}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <Link key={tag.id} to={`/tags/${tag.id}`}>
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Button asChild size="lg" className="w-fit">
              <Link to={`/post/${post.slug}`} className="flex items-center">
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;