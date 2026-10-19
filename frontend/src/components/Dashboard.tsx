import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, StarIcon, Search, BookOpen, GraduationCap } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  title: string;
  ects: number;
  category: string;
}

interface CourseWithRating {
  course: Course;
  averageRating: number;
  reviewCount: number;
}

export default function Dashboard() {
  const [courses, setCourses] = useState<CourseWithRating[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Rating states
  const [kathigitisScore, setKathigitisScore] = useState<string>("5");
  const [fortwsMathimatosScore, setFortwsMathimatosScore] = useState<string>("5");
  const [telikoScore, setTelikoScore] = useState<string>("5");
  const [dialexeisScore, setDialexeisScore] = useState<string>("5");
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Failed to fetch courses", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRate = async () => {
    if (!selectedCourse) return;

    try {
      const res = await fetch(`/api/courses/${selectedCourse.id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kathigitisScore: parseInt(kathigitisScore),
          fortwsMathimatosScore: parseInt(fortwsMathimatosScore),
          telikoScore: parseInt(telikoScore),
          dialexeisScore: parseInt(dialexeisScore),
          comment
        })
      });
      
      if (res.ok) {
        setIsDialogOpen(false);
        setComment("");
        setKathigitisScore("5");
        setFortwsMathimatosScore("5");
        setTelikoScore("5");
        setDialexeisScore("5");
        // Refresh courses
        const updatedCourses = await fetch('/api/courses').then(r => r.json());
        setCourses(updatedCourses);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCourses = courses.filter(item => {
    const matchesSearch = item.course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.course.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if course code starts with yearFilter (if not "all")
    let matchesYear = true;
    if (yearFilter !== "all") {
       // Extract number part: "CSD-101" -> "101". "HY100" -> "100".
       // Simple heuristic: find the first digit in the string and check if it matches yearFilter
       const activeCode = item.course.code.replace(/\D/g, ''); // Remove non-digits
       matchesYear = activeCode.startsWith(yearFilter);
    }
    
    const matchesCategory = categoryFilter === "all" || item.course.category === categoryFilter;

    return matchesSearch && matchesYear && matchesCategory;
  });

  const totalReviews = courses.reduce((sum, item) => sum + item.reviewCount, 0);
  const totalCourses = courses.length;
  const averageRating = totalCourses
    ? courses.reduce((sum, item) => sum + item.averageRating, 0) / totalCourses
    : 0;

  const categoryLabels: Record<string, string> = {
    CORE: "Core",
    ELECTIVES_MATH_PHYSICS: "Math/Physics",
    ALGORITHMS: "Algorithms",
    DATA: "Data",
    AI: "AI",
    SYSTEMS: "Systems",
    SECURITY: "Security",
    NETWORKS: "Networks",
    SOFTWARE_ENG: "Software Eng",
    HARDWARE: "Hardware",
    SIGNAL: "Signal",
    VISION_ROBOTICS: "Vision/Robotics",
    GRAPHICS: "Graphics",
    BIO: "Bio",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">RateMyCSD</h1>
            </div>
          {/* Add user nav or other top-right elements here if needed */}
        </div>
      </div>

      <main className="container mx-auto py-8 px-4 space-y-8">
        
        {/* Controls Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="space-y-1">
                  <h2 className="text-3xl font-bold tracking-tight">Course Dashboard</h2>
                  <p className="text-muted-foreground font-bold">Vres kai vathmologise mathimata apo to Computer Science Department. (c)Powered by Lazaritis Team</p>
              </div>
              
               <Tabs defaultValue="all" value={yearFilter} onValueChange={setYearFilter} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Years</TabsTrigger>
                  <TabsTrigger value="1">1st Year</TabsTrigger>
                  <TabsTrigger value="2">2nd Year</TabsTrigger>
                  <TabsTrigger value="3">3rd Year</TabsTrigger>
                  <TabsTrigger value="4">4th Year</TabsTrigger>
                  <TabsTrigger value="5">5th Year</TabsTrigger>
                </TabsList>
              </Tabs>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-secondary/40">
              <CardHeader className="pb-2">
                <CardDescription>Total courses</CardDescription>
                <CardTitle className="text-2xl">{totalCourses}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-secondary/40">
              <CardHeader className="pb-2">
                <CardDescription>Total reviews</CardDescription>
                <CardTitle className="text-2xl">{totalReviews}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-secondary/40">
              <CardHeader className="pb-2">
                <CardDescription>Average rating</CardDescription>
                <CardTitle className="text-2xl">{averageRating.toFixed(1)}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses by code or title..."
                    className="pl-8 w-full md:max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
              <Button
                variant="outline"
                onClick={() => { setSearchQuery(""); setYearFilter("all"); setCategoryFilter("all"); }}
              >
                Clear filters
              </Button>
          </div>
          <Tabs defaultValue="all" value={categoryFilter} onValueChange={setCategoryFilter} className="w-full">
            <TabsList className="flex w-full flex-nowrap gap-2 overflow-x-auto no-scrollbar">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="CORE">Core</TabsTrigger>
              <TabsTrigger value="ELECTIVES_MATH_PHYSICS">Math/Physics</TabsTrigger>
              <TabsTrigger value="ALGORITHMS">Algorithms</TabsTrigger>
              <TabsTrigger value="DATA">Data</TabsTrigger>
              <TabsTrigger value="AI">AI</TabsTrigger>
              <TabsTrigger value="SYSTEMS">Systems</TabsTrigger>
              <TabsTrigger value="SECURITY">Security</TabsTrigger>
              <TabsTrigger value="NETWORKS">Networks</TabsTrigger>
              <TabsTrigger value="SOFTWARE_ENG">Software Eng</TabsTrigger>
              <TabsTrigger value="HARDWARE">Hardware</TabsTrigger>
              <TabsTrigger value="SIGNAL">Signal</TabsTrigger>
              <TabsTrigger value="VISION_ROBOTICS">Vision/Robotics</TabsTrigger>
              <TabsTrigger value="GRAPHICS">Graphics</TabsTrigger>
              <TabsTrigger value="BIO">Bio</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Separator />

        {/* Grid Section */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading courses...</div>
        ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(({ course, averageRating, reviewCount }) => (
                <Card key={course.id} className="group hover:shadow-md transition-all duration-300 flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="font-mono">{course.code}</Badge>
                        <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
                            <StarIcon className="fill-yellow-400 text-yellow-400 w-3.5 h-3.5" />
                            <span className="text-sm font-semibold">{averageRating.toFixed(1)}</span>
                            <span className="text-xs text-muted-foreground ml-0.5">({reviewCount})</span>
                        </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
                        {course.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <Badge variant="secondary" className="font-normal text-xs">{course.ects} ECTS</Badge>
                        <Badge variant="secondary" className="font-normal text-xs">{categoryLabels[course.category] ?? course.category}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button 
                    className="w-full"
                    onClick={() => {
                        setSelectedCourse(course);
                        setIsDialogOpen(true);
                    }}
                    >
                    Rate Course
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No courses found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                <Button variant="link" onClick={() => { setSearchQuery(""); setYearFilter("all"); setCategoryFilter("all"); }} className="mt-4">
                    Clear all filters
                </Button>
            </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Rate {selectedCourse?.code}</DialogTitle>
            <DialogDescription>
              Share your experience with <span className="font-medium text-foreground">{selectedCourse?.title}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider">Ratings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="kathigitis" className="text-sm font-medium">Professor</label>
                        <Select onValueChange={setKathigitisScore} defaultValue={kathigitisScore}>
                            <SelectTrigger id="kathigitis">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                            {[1, 2, 3, 4, 5].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="fortws" className="text-sm font-medium">Workload</label>
                        <Select onValueChange={setFortwsMathimatosScore} defaultValue={fortwsMathimatosScore}>
                            <SelectTrigger id="fortws">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                            {[1, 2, 3, 4, 5].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="teliko" className="text-sm font-medium">Final Exam</label>
                        <Select onValueChange={setTelikoScore} defaultValue={telikoScore}>
                            <SelectTrigger id="teliko">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                            {[1, 2, 3, 4, 5].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dialexeis" className="text-sm font-medium">Lectures</label>
                        <Select onValueChange={setDialexeisScore} defaultValue={dialexeisScore}>
                            <SelectTrigger id="dialexeis">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                            {[1, 2, 3, 4, 5].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h4 className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider">Review</h4>
                <div className="space-y-2">
                    <label htmlFor="comment" className="text-sm font-medium">
                        Your Comment
                    </label>
                    <Textarea
                        id="comment"
                        placeholder="Write your thoughts about the course here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>
            </div>
            
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRate}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
