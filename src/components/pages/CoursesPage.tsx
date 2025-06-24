import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Play, Clock, Star, X, Heart, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  progress: number;
  category: string;
}

interface CoursesPageProps {
  onAddToMyCourses: (course: Course) => void;
  isInMyCourses: (courseId: string) => boolean;
}

interface CourseSession {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  pdfUrl?: string;
  thumbnail?: string;
}

interface ExpandedCourse extends Course {
  sessions: CourseSession[];
  instructor: string;
  description: string;
  rating: number;
  tags: string[];
  difficulty: string;
  subject: string;
}

// Course Preview Modal Component - Fixed backdrop blur
const CoursePreviewModal = ({ 
  course, 
  isOpen, 
  onClose,
  onModalExited,
  onAddToMyCourses,
  isInMyCourses
}: { 
  course: ExpandedCourse | null; 
  isOpen: boolean; 
  onClose: () => void;
  onModalExited: () => void;
  onAddToMyCourses: (course: Course) => void;
  isInMyCourses: boolean;
}) => {
  if (!course) return null;

  const completedSessions = course.sessions.filter(s => s.completed).length;
  const totalSessions = course.sessions.length;

  // Handle ESC key
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToMyCourses = () => {
    onAddToMyCourses({
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      duration: course.duration,
      progress: course.progress,
      category: course.category
    });
  };

  return (
    <AnimatePresence onExitComplete={onModalExited}>
      {isOpen && (
        <>
          {/* Triple-layer backdrop for complete coverage */}
          <div className="fixed inset-0 z-[9997] bg-black/60" style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            width: '100vw', 
            height: '100vh',
            margin: 0,
            padding: 0
          }} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              width: '100vw', 
              height: '100vh',
              margin: 0,
              padding: 0
            }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] backdrop-blur-xl"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              width: '100vw', 
              height: '100vh',
              margin: 0,
              padding: 0
            }}
          />
          
          {/* Main Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              width: '100vw', 
              height: '100vh',
              margin: 0,
              padding: 0
            }}
            onClick={handleBackgroundClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden my-8 mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Course Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Course Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {course.title}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <span>By {course.instructor}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Topics Covered</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-muted/50 hover:bg-muted border-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Course Sessions */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Course Content</h3>
                      <div className="space-y-3">
                        {course.sessions.map((session, index) => (
                          <div
                            key={session.id}
                            className="flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer"
                          >
                            <div className="w-10 h-6 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              {session.thumbnail ? (
                                <img
                                  src={session.thumbnail}
                                  alt={session.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">{index + 1}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground text-sm truncate">{session.title}</h4>
                              <p className="text-muted-foreground text-xs">{session.duration}</p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {session.completed ? (
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              ) : (
                                <Play className="h-4 w-4 text-muted-foreground" />
                              )}
                              
                              {session.pdfUrl && (
                                <Button variant="ghost" size="sm" className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10 h-6 w-6 p-0">
                                  📄
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Progress Card */}
                    <Card className="p-6">
                      <div className="text-center space-y-4">
                        <div>
                          <div className="text-3xl font-bold text-purple-600 mb-1">{course.progress}%</div>
                          <p className="text-sm text-muted-foreground">Complete</p>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {completedSessions} of {totalSessions} sessions completed
                        </p>
                      </div>
                    </Card>

                    {/* Course Details */}
                    <Card className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">Course Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Subject</span>
                          <span className="text-foreground font-medium text-sm">{course.subject}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Duration</span>
                          <span className="text-foreground font-medium text-sm">{course.duration}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Difficulty</span>
                          <Badge variant="outline" className="text-xs">
                            {course.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-foreground font-medium text-sm">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        onClick={handleAddToMyCourses}
                        disabled={isInMyCourses}
                        className={`w-full ${
                          isInMyCourses 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        } text-white`}
                      >
                        {isInMyCourses ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Added to My Courses
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to My Courses
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Download Materials
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Course Row Component
const CourseRow = ({ 
  title, 
  courses, 
  showProgress = false, 
  handleCourseClick,
  onAddToMyCourses,
  isInMyCourses
}: { 
  title: string; 
  courses: Course[]; 
  showProgress?: boolean;
  handleCourseClick: (course: Course) => void;
  onAddToMyCourses: (course: Course) => void;
  isInMyCourses: (courseId: string) => boolean;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground px-1">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-72 group cursor-pointer"
          >
            <Card className="overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card relative">
              <div 
                className="relative aspect-video overflow-hidden"
                onClick={() => handleCourseClick(course)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border-0">
                  {course.category}
                </Badge>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToMyCourses(course);
                  }}
                  disabled={isInMyCourses(course.id)}
                  className={`absolute top-3 left-3 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isInMyCourses(course.id)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-purple-500/80 hover:bg-purple-500 text-white'
                  }`}
                >
                  {isInMyCourses(course.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
                {showProgress && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Progress value={course.progress} className="h-1 bg-white/20" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-foreground">{course.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  {showProgress && <span>{course.progress}% complete</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const CoursesPage: React.FC<CoursesPageProps> = ({ onAddToMyCourses, isInMyCourses }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<ExpandedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course: Course) => {
    const expandedCourse = expandedCourses.find(c => c.id === course.id);
    if (expandedCourse) {
      setSelectedCourse(expandedCourse);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalExited = () => {
    setSelectedCourse(null);
  };

  const courses: Course[] = [
    {
      id: "1",
      title: "Complete React Developer Course",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      duration: "12h 30m",
      progress: 65,
      category: "Frontend"
    },
    {
      id: "2",
      title: "Node.js Backend Development",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
      duration: "8h 45m",
      progress: 30,
      category: "Backend"
    },
    {
      id: "3",
      title: "Database Design Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop",
      duration: "6h 15m",
      progress: 90,
      category: "Database"
    },
    {
      id: "4",
      title: "UI/UX Design Principles",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      duration: "10h 20m",
      progress: 45,
      category: "Design"
    },
    {
      id: "5",
      title: "Advanced JavaScript Concepts",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
      duration: "9h 15m",
      progress: 75,
      category: "Frontend"
    },
    {
      id: "6",
      title: "Python for Data Science",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      duration: "15h 45m",
      progress: 20,
      category: "Data Science"
    },
    {
      id: "7",
      title: "Machine Learning Basics",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
      duration: "18h 30m",
      progress: 0,
      category: "Data Science"
    },
    {
      id: "8",
      title: "Mobile App Development with Flutter",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
      duration: "14h 15m",
      progress: 10,
      category: "Mobile"
    }
  ];

  const expandedCourses: ExpandedCourse[] = courses.map(course => ({
    ...course,
    instructor: "Dr. Sarah Johnson",
    description: "Master the fundamentals and advanced concepts with hands-on projects and real-world applications. This comprehensive course covers everything from basic principles to advanced techniques used in the industry.",
    rating: 4.8,
    difficulty: "Intermediate",
    subject: course.category,
    tags: ["Programming", "Web Development", "JavaScript", "React"],
    sessions: [
      { 
        id: "1", 
        title: "Introduction & Setup", 
        duration: "15 min", 
        completed: true, 
        pdfUrl: "/notes1.pdf",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=60&fit=crop"
      },
      { 
        id: "2", 
        title: "Core Concepts", 
        duration: "45 min", 
        completed: true, 
        pdfUrl: "/notes2.pdf",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=60&fit=crop"
      },
      { 
        id: "3", 
        title: "Practical Examples", 
        duration: "30 min", 
        completed: false, 
        pdfUrl: "/notes3.pdf",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&h=60&fit=crop"
      },
      { 
        id: "4", 
        title: "Advanced Techniques", 
        duration: "60 min", 
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=60&fit=crop"
      },
    ]
  }));

  // Optimized search and filter functionality
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.duration.toLowerCase().includes(query) ||
        // Search in expanded course data
        expandedCourses.find(ec => ec.id === course.id)?.tags.some(tag => 
          tag.toLowerCase().includes(query)
        ) ||
        expandedCourses.find(ec => ec.id === course.id)?.instructor.toLowerCase().includes(query) ||
        expandedCourses.find(ec => ec.id === course.id)?.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeFilter !== "all") {
      switch (activeFilter) {
        case "video":
          // All courses are video-based in this example
          break;
        case "pdf":
          // Filter courses that have PDF materials
          filtered = filtered.filter(course => 
            expandedCourses.find(ec => ec.id === course.id)?.sessions.some(s => s.pdfUrl)
          );
          break;
        case "completed":
          filtered = filtered.filter(course => course.progress === 100);
          break;
        case "in-progress":
          filtered = filtered.filter(course => course.progress > 0 && course.progress < 100);
          break;
      }
    }

    return filtered;
  }, [courses, searchQuery, activeFilter, expandedCourses]);

  const inProgressCourses = filteredCourses.filter(course => course.progress > 0 && course.progress < 100);
  const newCourses = filteredCourses.slice(0, 3);
  const recommendedCourses = filteredCourses.slice(2, 5);
  const frontendCourses = filteredCourses.filter(course => course.category === "Frontend");

  const filters = [
    { id: "all", label: "All", icon: "📚" },
    { id: "video", label: "Videos", icon: "🎥" },
    { id: "pdf", label: "PDFs", icon: "📄" },
    { id: "completed", label: "Completed", icon: "✅" },
    { id: "in-progress", label: "In Progress", icon: "⏳" }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6 mb-12">
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-normal pb-2"
          >
            Let's get smarter, faster 🧠💨
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Choose your next session and keep the momentum rolling.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by topic, course name, instructor, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 rounded-2xl border-0 bg-muted/50 backdrop-blur-sm shadow-sm focus:shadow-md transition-all duration-300 text-base w-full text-foreground placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center mb-8"
      >
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full whitespace-nowrap transition-all duration-300 border ${
              activeFilter === filter.id
                ? "bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-500/15 dark:to-pink-500/15 border-purple-400/40 text-purple-800 dark:text-purple-300 shadow-sm"
                : "bg-muted/60 border-border text-muted-foreground hover:from-purple-50/80 hover:to-pink-50/80 hover:border-purple-300/50 hover:text-foreground"
            }`}
          >
            <span className="mr-1">{filter.icon}</span>
            {filter.label}
          </Button>
        ))}
      </motion.div>

      {/* Show search results count */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses matching "{searchQuery}"
          </p>
        </motion.div>
      )}

      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
            >
              Clear Search
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          {inProgressCourses.length > 0 && (
            <CourseRow 
              title="🔄 Continue Learning" 
              courses={inProgressCourses} 
              showProgress 
              handleCourseClick={handleCourseClick}
              onAddToMyCourses={onAddToMyCourses}
              isInMyCourses={isInMyCourses}
            />
          )}

          {!searchQuery && (
            <>
              <CourseRow 
                title="🆕 New Courses" 
                courses={newCourses} 
                handleCourseClick={handleCourseClick}
                onAddToMyCourses={onAddToMyCourses}
                isInMyCourses={isInMyCourses}
              />
              <CourseRow 
                title="🎯 Recommended For You" 
                courses={recommendedCourses} 
                handleCourseClick={handleCourseClick}
                onAddToMyCourses={onAddToMyCourses}
                isInMyCourses={isInMyCourses}
              />
              {frontendCourses.length > 0 && (
                <CourseRow 
                  title="💻 Frontend Development" 
                  courses={frontendCourses} 
                  showProgress 
                  handleCourseClick={handleCourseClick}
                  onAddToMyCourses={onAddToMyCourses}
                  isInMyCourses={isInMyCourses}
                />
              )}
            </>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-foreground">
                {searchQuery ? 'Search Results' : 'Course Library'}
              </h2>
              {searchQuery && (
                <Badge variant="outline" className="bg-purple-50/80 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {filteredCourses.length} results
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card relative group">
                    <div 
                      className="relative aspect-video overflow-hidden"
                      onClick={() => handleCourseClick(course)}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white drop-shadow-lg" />
                      </div>
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border-0">
                        {course.category}
                      </Badge>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToMyCourses(course);
                        }}
                        disabled={isInMyCourses(course.id)}
                        className={`absolute top-3 left-3 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isInMyCourses(course.id)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-purple-500/80 hover:bg-purple-500 text-white'
                        }`}
                      >
                        {isInMyCourses(course.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 text-foreground line-clamp-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <Progress value={course.progress} className="h-1.5 mb-3" />
                      <Button 
                        size="sm" 
                        disabled={isInMyCourses(course.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToMyCourses(course);
                        }}
                        className={`w-full ${
                          isInMyCourses(course.id)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        }`}
                      >
                        {isInMyCourses(course.id) ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            Add to My Courses
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Course Preview Modal */}
      <CoursePreviewModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onModalExited={handleModalExited}
        onAddToMyCourses={onAddToMyCourses}
        isInMyCourses={selectedCourse ? isInMyCourses(selectedCourse.id) : false}
      />
    </div>
  );
};