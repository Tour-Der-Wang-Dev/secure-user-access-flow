
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [radius, setRadius] = useState([50]); // Default 50km
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual data fetching
      // For now, we'll just simulate a delay
      setTimeout(() => {
        setPosts([
          {
            id: '1',
            platform: 'twitter',
            content: 'วันนี้อากาศดีที่วังสามหมอ',
            keyword: ['วังสามหมอ'],
            url: 'https://twitter.com/example/status/123',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            platform: 'facebook',
            content: 'ไฟดับที่วังสามหมอ ใครรู้บ้าง?',
            keyword: ['วังสามหมอ', 'ไฟดับ'],
            url: 'https://facebook.com/post/123',
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };

  // Check if user is authenticated
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  };

  React.useEffect(() => {
    const loadData = async () => {
      const session = await checkAuth();
      if (!session) {
        window.location.href = '/auth/login';
      }
    };
    
    loadData();
  }, []);

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Filter posts by keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Search keywords (e.g., วังสามหมอ, ไฟดับ)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Radius: {radius[0]} km
                </label>
                <Slider
                  value={radius}
                  max={100}
                  step={1}
                  onValueChange={setRadius}
                  className="mb-4"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Post activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>
            Showing posts within {radius[0]}km of Wang Sam Mo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {getPlatformIcon(post.platform)}
                      <span className="ml-2 text-sm font-medium capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mb-2">{post.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.keyword.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-teal-500 hover:underline mt-2 inline-block"
                  >
                    View Original
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
