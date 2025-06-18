// Mock data service for frontend-only implementation
export const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with React Development',
    slug: 'getting-started-react-development',
    content: '<h2>Introduction to React</h2><p>React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we\'ll explore the fundamentals of React development and best practices.</p><h3>Key Concepts</h3><ul><li>Components and JSX</li><li>State and Props</li><li>Event Handling</li><li>Lifecycle Methods</li></ul><p>Let\'s dive deeper into each of these concepts...</p>',
    excerpt: 'Learn the fundamentals of React development and best practices for building modern web applications.',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff',
      bio: 'Senior Frontend Developer'
    },
    category: { id: '1', name: 'Technology', color: 'bg-blue-500' },
    tags: [
      { id: '1', name: 'React' },
      { id: '2', name: 'JavaScript' },
      { id: '3', name: 'Frontend' }
    ],
    status: 'published',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    createdAt: '2024-06-15T10:30:00Z',
    updatedAt: '2024-06-15T10:30:00Z',
    publishedAt: '2024-06-15T10:30:00Z',
    readTime: 8,
    likes: 42,
    views: 1205
  },
  {
    id: '2',
    title: 'The Art of Modern Web Design',
    slug: 'art-modern-web-design',
    content: '<h2>Design Principles</h2><p>Modern web design is more than just making things look pretty. It\'s about creating intuitive, accessible, and performant user experiences.</p><h3>Core Principles</h3><ol><li>User-centered design</li><li>Visual hierarchy</li><li>Responsive layouts</li><li>Performance optimization</li></ol>',
    excerpt: 'Explore the principles and practices that define modern web design in today\'s digital landscape.',
    author: {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=ec4899&color=fff',
      bio: 'UX/UI Designer'
    },
    category: { id: '2', name: 'Design', color: 'bg-purple-500' },
    tags: [
      { id: '4', name: 'Design' },
      { id: '5', name: 'UX' },
      { id: '6', name: 'UI' }
    ],
    status: 'published',
    featuredImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    createdAt: '2024-06-14T14:20:00Z',
    updatedAt: '2024-06-14T14:20:00Z',
    publishedAt: '2024-06-14T14:20:00Z',
    readTime: 6,
    likes: 38,
    views: 892
  },
  {
    id: '3',
    title: 'Building Scalable Node.js Applications',
    slug: 'building-scalable-nodejs-applications',
    content: '<h2>Scalability Fundamentals</h2><p>Building applications that can handle growth is crucial for any successful project. Node.js provides excellent tools and patterns for creating scalable architectures.</p>',
    excerpt: 'Learn how to architect and build Node.js applications that can scale with your business needs.',
    author: {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff',
      bio: 'Backend Engineer'
    },
    category: { id: '3', name: 'Backend', color: 'bg-green-500' },
    tags: [
      { id: '7', name: 'Node.js' },
      { id: '8', name: 'Backend' },
      { id: '9', name: 'Scalability' }
    ],
    status: 'draft',
    featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    createdAt: '2024-06-13T09:15:00Z',
    updatedAt: '2024-06-13T09:15:00Z',
    publishedAt: null,
    readTime: 12,
    likes: 0,
    views: 0
  }
];

export const mockComments = [
  {
    id: '1',
    postId: '1',
    author: {
      id: '4',
      name: 'Alex Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=f97316&color=fff'
    },
    content: 'Great article! Really helped me understand React hooks better.',
    createdAt: '2024-06-15T12:30:00Z',
    likes: 5,
    replies: [
      {
        id: '2',
        parentId: '1',
        postId: '1',
        author: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff'
        },
        content: 'Thanks Alex! Glad it was helpful. Feel free to ask if you have any questions.',
        createdAt: '2024-06-15T13:15:00Z',
        likes: 2
      }
    ]
  },
  {
    id: '3',
    postId: '1',
    author: {
      id: '5',
      name: 'Emily Davis',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=8b5cf6&color=fff'
    },
    content: 'Would love to see a follow-up article on advanced React patterns!',
    createdAt: '2024-06-15T15:45:00Z',
    likes: 8,
    replies: []
  }
];

export const mockCategories = [
  { id: '1', name: 'Technology', color: 'bg-blue-500', postCount: 15 },
  { id: '2', name: 'Design', color: 'bg-purple-500', postCount: 8 },
  { id: '3', name: 'Backend', color: 'bg-green-500', postCount: 12 },
  { id: '4', name: 'Mobile', color: 'bg-orange-500', postCount: 6 },
  { id: '5', name: 'AI & ML', color: 'bg-red-500', postCount: 4 }
];

export const mockTags = [
  { id: '1', name: 'React', postCount: 8 },
  { id: '2', name: 'JavaScript', postCount: 12 },
  { id: '3', name: 'Frontend', postCount: 10 },
  { id: '4', name: 'Design', postCount: 6 },
  { id: '5', name: 'UX', postCount: 4 },
  { id: '6', name: 'UI', postCount: 5 },
  { id: '7', name: 'Node.js', postCount: 7 },
  { id: '8', name: 'Backend', postCount: 9 },
  { id: '9', name: 'Scalability', postCount: 3 }
];

// Mock API functions
export const mockApi = {
  // Posts
  getPosts: (filters = {}) => {
    let filteredPosts = [...mockPosts];
    
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => post.category.id === filters.category);
    }
    
    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => tag.id === filters.tag)
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status);
    }
    
    return Promise.resolve(filteredPosts);
  },
  
  getPost: (id) => {
    const post = mockPosts.find(p => p.id === id || p.slug === id);
    return Promise.resolve(post);
  },
  
  createPost: (postData) => {
    const newPost = {
      id: Date.now().toString(),
      slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: postData.status === 'published' ? new Date().toISOString() : null,
      likes: 0,
      views: 0,
      readTime: Math.ceil(postData.content.length / 1000) // Rough estimate
    };
    mockPosts.unshift(newPost);
    return Promise.resolve(newPost);
  },
  
  updatePost: (id, postData) => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts[index] = {
        ...mockPosts[index],
        ...postData,
        updatedAt: new Date().toISOString(),
        publishedAt: postData.status === 'published' && !mockPosts[index].publishedAt 
          ? new Date().toISOString() 
          : mockPosts[index].publishedAt
      };
      return Promise.resolve(mockPosts[index]);
    }
    return Promise.reject(new Error('Post not found'));
  },
  
  deletePost: (id) => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Post not found'));
  },
  
  // Comments
  getComments: (postId) => {
    const comments = mockComments.filter(c => c.postId === postId);
    return Promise.resolve(comments);
  },
  
  createComment: (commentData) => {
    const newComment = {
      id: Date.now().toString(),
      ...commentData,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    mockComments.push(newComment);
    return Promise.resolve(newComment);
  },
  
  // Categories and Tags
  getCategories: () => Promise.resolve(mockCategories),
  getTags: () => Promise.resolve(mockTags),
  
  // Search
  search: (query) => {
    const results = mockPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
    );
    return Promise.resolve(results);
  }
};