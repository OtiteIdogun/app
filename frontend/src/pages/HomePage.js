import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../services/mockData';
import FeaturedPost from '../components/Blog/FeaturedPost';
import PostGrid from '../components/Blog/PostGrid';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { TrendingUp, Users, BookOpen, Search, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          mockApi.getPosts({ status: 'published' }),
          mockApi.getCategories()
        ]);
        
        setPosts(postsData.slice(1, 7)); // Get 6 posts for grid, excluding featured
        setFeaturedPost(postsData[0]); // First post as featured
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const stats = [
    { icon: BookOpen, label: 'Articles', value: '50+', color: 'text-blue-600' },
    { icon: Users, label: 'Writers', value: '15+', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Views', value: '10K+', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Share Your Stories
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A modern platform where ideas come to life. Discover amazing content, 
              connect with writers, and share your own unique perspective.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg"
                />
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/signup">Start Writing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/categories">Explore Topics</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg mb-4 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Article</h2>
              <p className="text-muted-foreground text-lg">
                Handpicked content that's worth your time
              </p>
            </div>
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground text-lg">
                Fresh content from our community of writers
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/posts" className="flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <PostGrid posts={posts} loading={loading} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-muted-foreground text-lg">
              Discover content organized by your interests
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.postCount} articles
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of passionate writers and readers. 
            Your unique perspective matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;