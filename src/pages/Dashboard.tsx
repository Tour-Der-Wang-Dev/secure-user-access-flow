import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChartContainer } from "@/components/ui/chart";
import { Twitter, Facebook, Instagram, Youtube, Search, Filter, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [radius, setRadius] = useState([50]); // Default 50km
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const chartData = [
    { date: '2025-04-10', posts: 12 },
    { date: '2025-04-11', posts: 19 },
    { date: '2025-04-12', posts: 8 },
    { date: '2025-04-13', posts: 15 },
    { date: '2025-04-14', posts: 22 },
    { date: '2025-04-15', posts: 14 },
    { date: '2025-04-16', posts: 17 },
    { date: '2025-04-17', posts: 25 },
    { date: '2025-04-18', posts: 20 },
    { date: '2025-04-19', posts: 16 },
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    try {
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
          },
          {
            id: '3',
            platform: 'youtube',
            content: 'จระเข้ปรากฏตัวที่วังสามหมอ! ชาวบ้านแตกตื่น',
            keyword: ['วังสามหมอ', 'จระเข้'],
            url: 'https://youtube.com/watch?v=example',
            created_at: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: '4',
            platform: 'instagram',
            content: 'พระอาทิตย์ตกที่วังสามหมอ สวยงามมาก #วังสามหมอ #sunset',
            keyword: ['วังสามหมอ'],
            url: 'https://instagram.com/p/example',
            created_at: new Date(Date.now() - 259200000).toISOString()
          }
        ]);
        setIsLoading(false);
        toast.success("ค้นหาสำเร็จ พบ 4 โพสต์");
      }, 1000);

    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
      toast.error("เกิดข้อผิดพลาดในการค้นหา");
    }
  };

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

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">กำลังตรวจสอบข้อมูลผู้ใช้...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">แดชบอร์ด</h1>
          <Button 
            onClick={() => navigate('/content')}
            className="bg-teal-500 hover:bg-teal-600"
          >
            ดูคอนเทนต์
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>ค้นหา</CardTitle>
              <CardDescription>ค้นหาโพสต์ด้วยคีย์เวิร์ด</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="ค้นหาคีย์เวิร์ด (เช่น วังสามหมอ, ไฟดับ)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                <Button 
                  onClick={handleSearch} 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'กำลังค้นหา...' : 'ค้นหา'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>วิเคราะห์ข้อมูล</CardTitle>
                <CardDescription>จำนวนโพสต์ต่อวัน</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="posts"
                      stroke="#F97316"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>โพสต์ล่าสุด</CardTitle>
              <CardDescription>
                แสดงโพสต์ในรัศมี {radius[0]}กม. ของวังสามหมอ
              </CardDescription>
            </div>
            <Filter className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            {posts.length === 0 && !isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบโพสต์ กรุณาปรับการค้นหา</p>
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
                        {new Date(post.created_at).toLocaleString('th-TH')}
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
                      ดูต้นฉบับ
                    </a>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
