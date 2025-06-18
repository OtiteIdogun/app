import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockApi, mockCategories, mockTags } from '../../services/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import RichTextEditor from './RichTextEditor';
import { useToast } from '../../hooks/use-toast';
import { X, Plus, Save, Eye, Upload } from 'lucide-react';

const PostForm = ({ post, isEditing = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    tags: [],
    status: 'draft',
    featuredImage: ''
  });

  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load categories and tags
    mockApi.getCategories().then(setCategories);
    mockApi.getTags().then(setAvailableTags);

    // If editing, populate form with existing data
    if (isEditing && post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categoryId: post.category.id,
        tags: post.tags,
        status: post.status,
        featuredImage: post.featuredImage || ''
      });
    }
  }, [isEditing, post]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.find(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
      const tag = availableTags.find(t => t.name.toLowerCase() === newTag.toLowerCase()) || {
        id: Date.now().toString(),
        name: newTag.trim()
      };
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagId) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag.id !== tagId)
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a server or cloud storage
      // For now, we'll use a placeholder URL
      const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=400&fit=crop`;
      setFormData({
        ...formData,
        featuredImage: imageUrl
      });
      toast({
        title: "Image uploaded",
        description: "Featured image has been updated successfully.",
      });
    }
  };

  const handleSubmit = async (e, status = formData.status) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const category = categories.find(c => c.id === formData.categoryId);
      
      const postData = {
        ...formData,
        status,
        author: user,
        category
      };

      if (isEditing) {
        await mockApi.updatePost(post.id, postData);
        toast({
          title: "Post updated",
          description: "Your post has been updated successfully.",
        });
      } else {
        await mockApi.createPost(postData);
        toast({
          title: "Post created",
          description: status === 'published' ? "Your post has been published!" : "Your post has been saved as draft.",
        });
      }

      navigate(status === 'published' ? `/post/${formData.slug}` : '/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (previewMode) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Preview Mode</h1>
          <Button onClick={handlePreview} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Exit Preview
          </Button>
        </div>
        
        <article className="prose prose-lg max-w-none">
          {formData.featuredImage && (
            <img 
              src={formData.featuredImage} 
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1>{formData.title}</h1>
          <p className="lead">{formData.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: formData.content }} />
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>
        <div className="flex items-center space-x-2">
          <Button onClick={handlePreview} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, 'draft')} 
            variant="outline"
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={(e) => handleSubmit(e, 'published')} 
            disabled={isLoading}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="post-url-slug"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of your post..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Content</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your post content here..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                      {tag.name}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag.id)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.status === 'published'}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'published' : 'draft' })}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featuredImage && (
                <div className="mb-4">
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Input
                  placeholder="Or enter image URL..."
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostForm;