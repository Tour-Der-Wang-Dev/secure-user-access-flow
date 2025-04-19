import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Share, Filter, Image, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NavBar from '@/components/NavBar';

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [platform, setPlatform] = useState("");
  const [radius, setRadius] = useState([50]); // Default 50km
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate('/auth/login');
        } else {
          setIsAuthenticated(true);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleFilter = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      setTimeout(() => {
        const filteredPosts = [
          {
            id: '1',
            platform: 'twitter',
            content: 'วันนี้อากาศดีที่วังสามหมอ',
            image: null,
            video: null,
            keyword: ['วังสามหมอ'],
            likes: 23,
            shares: 5,
            url: 'https://twitter.com/example/status/123',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            platform: 'facebook',
            content: 'ไฟดับที่วังสามหมอ ใครรู้บ้าง?',
            image: 'https://picsum.photos/400/300', // Placeholder image
            video: null,
            keyword: ['วังสามหมอ', 'ไฟดับ'],
            likes: 45,
            shares: 12,
            url: 'https://facebook.com/post/123',
            created_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: '3',
            platform: 'youtube',
            content: 'จระเข้ปรากฏตัวที่วังสามหมอ! ชาวบ้านแตกตื่น',
            image: 'https://picsum.photos/400/300?random=2', // Placeholder image
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
            keyword: ['วังสามหมอ', 'จระเข้'],
            likes: 132,
            shares: 76,
            url: 'https://youtube.com/watch?v=example',
            created_at: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: '4',
            platform: 'instagram',
            content: 'พระอาทิตย์ตกที่วังสามหมอ สวยงามมาก #วังสามหมอ #sunset',
            image: 'https://picsum.photos/400/300?random=3', // Placeholder image
            video: null,
            keyword: ['วังสามหมอ'],
            likes: 89,
            shares: 15,
            url: 'https://instagram.com/p/example',
            created_at: new Date(Date.now() - 259200000).toISOString()
          }
        ];
        
        // Filter by platform if one is selected
        const results = platform 
          ? filteredPosts.filter(post => post.platform === platform) 
          : filteredPosts;
          
        setPosts(results);
        setIsLoading(false);
        toast.success(`ค้นหาสำเร็จ พบ ${results.length} โพสต์`);
      }, 1000);
    } catch (error) {
      console.error('Error filtering posts:', error);
      setIsLoading(false);
      toast.error("เกิดข้อผิดพลาดในการค้นหา");
    }
  };

  // Show loading screen until authentication check completes
  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">กำลังตรวจสอบข้อมูลผู้ใช้...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">คอนเทนต์</h1>
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="text-orange-500 border-orange-500"
          >
            กลับไปยังแดชบอร์ด
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              ตัวกรองคอนเทนต์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">คีย์เวิร์ด</label>
                <Input
                  placeholder="ค้นหาด้วยคีย์เวิร์ด (เช่น วังสามหมอ, ไฟดับ)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">แพลตฟอร์ม</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกแพลตฟอร์ม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">ทั้งหมด</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  รัศมี: {radius[0]} กม.
                </label>
                <Slider
                  value={radius}
                  max={100}
                  step={1}
                  onValueChange={setRadius}
                  className="mb-4"
                />
              </div>
            </div>
            <Button 
              onClick={handleFilter} 
              className="mt-4 bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.length === 0 && !isLoading ? (
            <div className="text-center py-8 col-span-2">
              <p className="text-gray-500">ไม่พบคอนเทนต์ กรุณาปรับการค้นหา</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Media content */}
                  {post.image && (
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.content}
                        className="w-full h-48 object-cover"
                      />
                      {post.platform === 'instagram' && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs">
                          Instagram
                        </div>
                      )}
                      {post.platform === 'facebook' && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          Facebook
                        </div>
                      )}
                    </div>
                  )}
                  {post.video && (
                    <div className="relative pt-[56.25%]">
                      <iframe
                        src={post.video}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                        title={post.content}
                      ></iframe>
                      {post.platform === 'youtube' && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                          YouTube
                        </div>
                      )}
                    </div>
                  )}
                  {!post.image && !post.video && (
                    <div className="h-12 bg-gray-100 flex items-center px-4">
                      {post.platform === 'twitter' && (
                        <div className="bg-blue-400 text-white px-2 py-1 rounded text-xs">
                          Twitter
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Post content */}
                  <div className="p-4">
                    <p className="mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.keyword.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.created_at).toLocaleString('th-TH')}</span>
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                          <Share className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </Button>
                      </div>
                    </div>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-teal-500 hover:underline mt-2 inline-block"
                    >
                      ดูต้นฉบับ
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
