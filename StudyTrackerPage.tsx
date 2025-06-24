import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, BarChart3, Trophy, Bot, ChevronRight, Clock, Plus, Trash2, Edit3, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'session' | 'deadline';
  time: string;
  duration: number;
  subject: string;
  completed?: boolean;
  progress?: number;
  color: string;
  icon: string;
  dayIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'Low' | 'Medium' | 'High';
  description?: string;
}

// Task Edit Modal Component
const TaskEditModal = ({ 
  task, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  task: CalendarEvent | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (updatedTask: CalendarEvent) => void;
}) => {
  const [editedTask, setEditedTask] = useState<CalendarEvent | null>(task);

  React.useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const colorOptions = [
    { name: 'Sky Blue', value: 'from-sky-300/80 to-sky-400/80', preview: 'bg-sky-400' },
    { name: 'Rose Pink', value: 'from-rose-300/80 to-pink-300/80', preview: 'bg-rose-400' },
    { name: 'Emerald', value: 'from-emerald-300/80 to-emerald-400/80', preview: 'bg-emerald-400' },
    { name: 'Purple', value: 'from-purple-300/80 to-violet-300/80', preview: 'bg-purple-400' },
    { name: 'Teal', value: 'from-teal-300/80 to-teal-400/80', preview: 'bg-teal-400' },
    { name: 'Orange', value: 'from-orange-300/80 to-orange-400/80', preview: 'bg-orange-400' },
  ];

  const iconOptions = [
    { name: 'Book', value: '📘' },
    { name: 'Notes', value: '📝' },
    { name: 'Computer', value: '💻' },
    { name: 'Science', value: '🔬' },
    { name: 'Biology', value: '🧬' },
    { name: 'Math', value: '🔢' },
    { name: 'Art', value: '🎨' },
    { name: 'Music', value: '🎵' },
    { name: 'Task', value: '📋' },
    { name: 'Study', value: '📚' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-card rounded-2xl border border-border shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Edit Task</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Task Title</label>
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input
                  value={editedTask.subject}
                  onChange={(e) => setEditedTask({ ...editedTask, subject: e.target.value })}
                  placeholder="Enter subject"
                  className="w-full"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Duration (minutes)</label>
                <Input
                  type="number"
                  value={editedTask.duration}
                  onChange={(e) => setEditedTask({ ...editedTask, duration: parseInt(e.target.value) || 60 })}
                  min="15"
                  max="480"
                  className="w-full"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
                <div className="flex gap-2">
                  {(['task', 'session', 'deadline'] as const).map((type) => (
                    <Button
                      key={type}
                      variant={editedTask.type === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, type })}
                      className="flex-1 capitalize"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                <div className="flex gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={editedTask.difficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, difficulty })}
                      className="flex-1"
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <div className="flex gap-2">
                  {(['Low', 'Medium', 'High'] as const).map((priority) => (
                    <Button
                      key={priority}
                      variant={editedTask.priority === priority ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, priority })}
                      className="flex-1"
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Color Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <Button
                      key={color.value}
                      variant="outline"
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, color: color.value })}
                      className={`flex items-center gap-2 ${
                        editedTask.color === color.value ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${color.preview}`} />
                      <span className="text-xs">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((icon) => (
                    <Button
                      key={icon.value}
                      variant="outline"
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, icon: icon.value })}
                      className={`h-10 ${
                        editedTask.icon === icon.value ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      <span className="text-lg">{icon.value}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Progress (%)</label>
                <Input
                  type="number"
                  value={editedTask.progress || 0}
                  onChange={(e) => setEditedTask({ ...editedTask, progress: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description (Optional)</label>
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const StudyTrackerPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<{ [key: string]: { time: string, dayIndex: number, yPos: number } }>({});
  const [resizeStartData, setResizeStartData] = useState<{ [key: string]: { time: string, duration: number } }>({});

  // Add Task Dialog Form State
  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    difficulty: '',
    type: '',
    subject: ''
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Calendar dimensions for drag calculations
  const CALENDAR_START_X = 160; // Time column width + padding
  const DAY_COLUMN_WIDTH = 120; // Approximate width of each day column
  const CALENDAR_TOP_Y = 200; // Approximate Y position of calendar start
  const HOUR_HEIGHT = 60; // Height of each hour slot

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'React Hooks Chapter',
      type: 'session',
      time: '09:00',
      duration: 90,
      subject: 'Frontend',
      completed: true,
      progress: 100,
      color: 'from-sky-300/80 to-sky-400/80',
      icon: '📘',
      dayIndex: 0,
      difficulty: 'Medium',
      priority: 'High',
      description: 'Deep dive into React Hooks and state management'
    },
    {
      id: '2',
      title: 'Math Assignment Due',
      type: 'deadline',
      time: '14:00',
      duration: 60,
      subject: 'Mathematics',
      completed: false,
      progress: 75,
      color: 'from-rose-300/80 to-pink-300/80',
      icon: '📝',
      dayIndex: 1,
      difficulty: 'Hard',
      priority: 'High',
      description: 'Calculus problems chapter 7-9'
    },
    {
      id: '3',
      title: 'JavaScript Practice',
      type: 'task',
      time: '16:30',
      duration: 45,
      subject: 'Programming',
      completed: false,
      progress: 30,
      color: 'from-emerald-300/80 to-emerald-400/80',
      icon: '💻',
      dayIndex: 1,
      difficulty: 'Easy',
      priority: 'Medium',
      description: 'Practice array methods and async/await'
    },
    {
      id: '4',
      title: 'Physics Lab Report',
      type: 'task',
      time: '19:00',
      duration: 120,
      subject: 'Physics',
      completed: false,
      progress: 0,
      color: 'from-purple-300/80 to-violet-300/80',
      icon: '🔬',
      dayIndex: 3,
      difficulty: 'Hard',
      priority: 'Medium',
      description: 'Complete lab report for electromagnetic induction experiment'
    },
    {
      id: '5',
      title: 'Biology Quiz Prep',
      type: 'session',
      time: '10:30',
      duration: 60,
      subject: 'Biology',
      completed: false,
      progress: 0,
      color: 'from-teal-300/80 to-teal-400/80',
      icon: '🧬',
      dayIndex: 4,
      difficulty: 'Medium',
      priority: 'High',
      description: 'Review cell division and genetics concepts'
    }
  ]);

  const weeklyData = [
    { day: "Mon", hours: 3.5, target: 4, subjects: ["Math", "Physics"] },
    { day: "Tue", hours: 2.8, target: 4, subjects: ["React", "JS"] },
    { day: "Wed", hours: 4.2, target: 4, subjects: ["Biology", "Math"] },
    { day: "Thu", hours: 3.1, target: 4, subjects: ["Physics"] },
    { day: "Fri", hours: 2.5, target: 4, subjects: ["React"] },
    { day: "Sat", hours: 5.0, target: 4, subjects: ["Review"] },
    { day: "Sun", hours: 1.8, target: 4, subjects: ["Planning"] },
  ];

  const totalWeekHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const lastWeekHours = 20.5;
  const weeklyDifference = totalWeekHours - lastWeekHours;

  const subjectData = [
    { subject: "Mathematics", hours: 8.2, color: "bg-sky-300/20 text-sky-700 dark:text-sky-300", progress: 85 },
    { subject: "Physics", hours: 6.5, color: "bg-purple-300/20 text-purple-700 dark:text-purple-300", progress: 70 },
    { subject: "Programming", hours: 7.8, color: "bg-emerald-300/20 text-emerald-700 dark:text-emerald-300", progress: 92 },
    { subject: "Biology", hours: 4.4, color: "bg-teal-300/20 text-teal-700 dark:text-teal-300", progress: 60 },
  ];

  const achievements = [
    { name: "Early Bird", icon: "🌅", earned: true, description: "Study before 9 AM" },
    { name: "Night Owl", icon: "🦉", earned: true, description: "Study after 8 PM" },
    { name: "Streak Master", icon: "🔥", earned: false, description: "7-day study streak" },
    { name: "Course Crusher", icon: "💪", earned: true, description: "Complete 5 courses" },
    { name: "Focus Champion", icon: "🎯", earned: true, description: "3+ hour sessions" },
    { name: "Consistency King", icon: "👑", earned: false, description: "Study every day for 2 weeks" },
  ];

  const getEventPosition = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes; // Start from 8:00 AM
    const top = (totalMinutes / 60) * 60; // 60px per hour
    const height = Math.max((duration / 60) * 60, 30); // Minimum 30px height
    return { top: `${top}px`, height: `${height}px` };
  };

  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes;
    return (totalMinutes / 60) * 60; // 60px per hour
  };

  const positionToTime = (yPosition: number) => {
    const hourHeight = 60;
    const totalHours = yPosition / hourHeight;
    const hours = Math.floor(totalHours) + 8; // Starting from 8:00 AM
    const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);
    const snappedMinutes = Math.round(minutes / 15) * 15; // Snap to 15-minute intervals
    
    // Ensure hours and minutes are within valid ranges
    const validHours = Math.max(8, Math.min(20, hours));
    const validMinutes = Math.max(0, Math.min(59, snappedMinutes));
    
    return `${validHours.toString().padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
  };

  const addMinutesToTime = (time: string, minutes: number) => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };

  const getTimeDifferenceInMinutes = (startTime: string, endTime: string) => {
    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);
    
    const startTotalMins = startHours * 60 + startMins;
    const endTotalMins = endHours * 60 + endMins;
    
    return endTotalMins - startTotalMins;
  };

  const snapToTimeSlot = (yPosition: number) => {
    const quarterHourHeight = 15; // 15px per 15 minutes for better snapping
    const snappedPosition = Math.round(yPosition / quarterHourHeight) * quarterHourHeight;
    return Math.max(0, Math.min(snappedPosition, 720)); // Limit to calendar bounds (8AM-8PM = 12 hours * 60px)
  };

  const getDayIndexFromPosition = (xPosition: number) => {
    // Calculate which day column based on X position
    const relativeX = xPosition - CALENDAR_START_X;
    const dayIndex = Math.floor(relativeX / DAY_COLUMN_WIDTH);
    return Math.max(0, Math.min(6, dayIndex)); // Ensure within 0-6 range
  };

  const isValidDropZone = (xPosition: number, yPosition: number) => {
    // Check if position is within the calendar bounds
    const relativeX = xPosition - CALENDAR_START_X;
    const relativeY = yPosition - CALENDAR_TOP_Y;
    
    // Must be within day columns (0-6) and time slots (8AM-8PM)
    const isWithinDays = relativeX >= 0 && relativeX <= (DAY_COLUMN_WIDTH * 7);
    const isWithinHours = relativeY >= 0 && relativeY <= (HOUR_HEIGHT * 12);
    
    return isWithinDays && isWithinHours;
  };

  const handleEventDragStart = (eventId: string) => {
    const event = calendarEvents.find(e => e.id === eventId);
    if (event) {
      setDragStartPosition({ 
        ...dragStartPosition, 
        [eventId]: { 
          time: event.time, 
          dayIndex: event.dayIndex,
          yPos: timeToPosition(event.time)
        }
      });
    }
  };

  const handleEventDrag = (eventId: string, info: any) => {
    const startPos = dragStartPosition[eventId];
    if (!startPos) return;

    // Calculate new position based on drag offset
    const newYPosition = startPos.yPos + info.offset.y;
    const newXPosition = info.point.x; // Absolute X position
    
    // Check if the drop zone is valid
    if (isValidDropZone(newXPosition, info.point.y)) {
      const snappedPosition = snapToTimeSlot(newYPosition);
      const newTime = positionToTime(snappedPosition);
      const newDayIndex = getDayIndexFromPosition(newXPosition);
      
      setCalendarEvents(events => 
        events.map(event => 
          event.id === eventId 
            ? { ...event, time: newTime, dayIndex: newDayIndex }
            : event
        )
      );
    }
  };

  const handleEventDragEnd = (eventId: string, info: any) => {
    const startPos = dragStartPosition[eventId];
    if (!startPos) return;

    const finalXPosition = info.point.x;
    const finalYPosition = info.point.y;
    
    // If dropped in invalid zone, revert to original position
    if (!isValidDropZone(finalXPosition, finalYPosition)) {
      setCalendarEvents(events => 
        events.map(event => 
          event.id === eventId 
            ? { ...event, time: startPos.time, dayIndex: startPos.dayIndex }
            : event
        )
      );
    }
    
    // Clear drag start position
    const newDragStartPosition = { ...dragStartPosition };
    delete newDragStartPosition[eventId];
    setDragStartPosition(newDragStartPosition);
  };

  // Handle start time resize (top handle)
  const handleStartTimeResize = (eventId: string, deltaY: number) => {
    const event = calendarEvents.find(e => e.id === eventId);
    if (!event) return;

    const currentStartPos = timeToPosition(event.time);
    const newStartPos = Math.max(0, Math.min(currentStartPos + deltaY, timeToPosition(addMinutesToTime(event.time, event.duration - 15))));
    const newStartTime = positionToTime(newStartPos);
    
    // Calculate the end time based on original end time
    const originalEndTime = addMinutesToTime(event.time, event.duration);
    const newDuration = getTimeDifferenceInMinutes(newStartTime, originalEndTime);
    
    if (newDuration >= 15) { // Minimum 15 minutes
      setCalendarEvents(events => 
        events.map(e => 
          e.id === eventId 
            ? { ...e, time: newStartTime, duration: newDuration }
            : e
        )
      );
    }
  };

  // Handle end time resize (bottom handle)
  const handleEndTimeResize = (eventId: string, deltaY: number) => {
    const event = calendarEvents.find(e => e.id === eventId);
    if (!event) return;

    const newDuration = Math.max(15, event.duration + (deltaY * 60 / 60)); // Convert pixels to minutes
    
    setCalendarEvents(events => 
      events.map(e => 
        e.id === eventId 
          ? { ...e, duration: Math.round(newDuration) }
          : e
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setCalendarEvents(events => events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  const addNewEvent = (dayIndex: number, timeSlot: string) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: 'New Task',
      type: 'task',
      time: timeSlot,
      duration: 60,
      subject: 'General',
      completed: false,
      progress: 0,
      color: 'from-gray-300/80 to-gray-400/80',
      icon: '📋',
      dayIndex: dayIndex,
      difficulty: 'Medium',
      priority: 'Medium',
      description: ''
    };
    setCalendarEvents(events => [...events, newEvent]);
    setEditingEvent(newEvent.id);
    setIsEditModalOpen(true);
  };

  const handleEditEvent = (eventId: string) => {
    setEditingEvent(eventId);
    setIsEditModalOpen(true);
  };

  const handleSaveEvent = (updatedEvent: CalendarEvent) => {
    setCalendarEvents(events => 
      events.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  // Handle Add Task Dialog
  const handleAddEvent = () => {
    if (!form.title || !form.date || !form.startTime || !form.endTime || !form.difficulty || !form.type) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate duration
    const startTime = new Date(`${form.date}T${form.startTime}`);
    const endTime = new Date(`${form.date}T${form.endTime}`);
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // minutes

    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    // Calculate day index (0 = Monday)
    const eventDate = new Date(form.date);
    const dayIndex = (eventDate.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    // Generate color based on type
    const colorMap = {
      task: 'from-blue-300/80 to-blue-400/80',
      session: 'from-green-300/80 to-green-400/80',
      deadline: 'from-red-300/80 to-red-400/80'
    };

    // Generate icon based on type
    const iconMap = {
      task: '📋',
      session: '📚',
      deadline: '⏰'
    };

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: form.title,
      type: form.type as 'task' | 'session' | 'deadline',
      time: form.startTime,
      duration: Math.round(duration),
      subject: form.subject || 'General',
      completed: false,
      progress: 0,
      color: colorMap[form.type as keyof typeof colorMap],
      icon: iconMap[form.type as keyof typeof iconMap],
      dayIndex: dayIndex,
      difficulty: form.difficulty as 'Easy' | 'Medium' | 'Hard',
      priority: 'Medium',
      description: ''
    };

    setCalendarEvents(events => [...events, newEvent]);
    
    // Reset form
    setForm({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      difficulty: '',
      type: '',
      subject: ''
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent leading-normal pb-2">
          Study Tracker & Smart Calendar
        </h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
          Your calm, organized space to manage study life visually
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">This Week</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                <span>Nov 13 - Nov 19, 2024</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm w-full space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Enter subject" />
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <Select value={form.difficulty} onValueChange={(val) => setForm({ ...form, difficulty: val })}>
                      <SelectTrigger><SelectValue placeholder="Select Difficulty" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                      <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="session">Session</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" onClick={handleAddEvent}>Save</Button>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full px-4 text-xs font-medium">
                  Today
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card backdrop-blur-xl rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="grid grid-cols-8 gap-3 mb-6">
                <div className="text-xs font-medium text-muted-foreground"></div>
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs font-medium text-muted-foreground mb-2">{day}</div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold mx-auto transition-all duration-200 ${
                      index === 2 
                        ? 'bg-gradient-to-br from-purple-400 to-sky-400 text-white shadow-lg' 
                        : 'text-foreground hover:bg-muted cursor-pointer'
                    }`}>
                      {13 + index}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-8 gap-0">
                  <div className="bg-muted/30 border-r border-border">
                    {timeSlots.map((time) => (
                      <div key={time} className="h-[60px] flex items-center justify-center border-b border-border">
                        <span className="text-xs font-medium text-muted-foreground">{time}</span>
                      </div>
                    ))}
                  </div>

                  {weekDays.map((day, dayIndex) => (
                    <div key={day} className="relative border-r border-border">
                      {timeSlots.map((time, timeIndex) => (
                        <div
                          key={`${day}-${time}`}
                          className="h-[60px] border-b border-border hover:bg-muted/30 transition-colors cursor-pointer group relative"
                          onClick={() => addNewEvent(dayIndex, time)}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                      
                      {calendarEvents
                        .filter(event => event.dayIndex === dayIndex)
                        .map((event) => {
                        const position = getEventPosition(event.time, event.duration);
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            drag
                            dragConstraints={{ top: -1000, bottom: 1000, left: -1000, right: 1000 }}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragStart={() => handleEventDragStart(event.id)}
                            onDrag={(_, info) => {
                              handleEventDrag(event.id, info);
                            }}
                            onDragEnd={(_, info) => {
                              handleEventDragEnd(event.id, info);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(selectedEvent === event.id ? null : event.id);
                            }}
                            className="absolute left-1 right-1 z-10 cursor-grab active:cursor-grabbing group"
                            style={position}
                          >
                            <div className={`h-full rounded-lg bg-gradient-to-br ${event.color} p-2 shadow-sm border border-white/20 backdrop-blur-sm transition-all duration-200 relative overflow-hidden ${
                              selectedEvent === event.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
                            }`}>
                              {/* Start Time Resize Handle (Top) */}
                              {selectedEvent === event.id && (
                                <div
                                  className="absolute top-0 left-0 right-0 h-3 bg-blue-500/50 cursor-ns-resize flex items-center justify-center hover:bg-blue-500/70 transition-colors rounded-t-lg"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    const startY = e.clientY;
                                    
                                    const handleMouseMove = (e: MouseEvent) => {
                                      const deltaY = e.clientY - startY;
                                      handleStartTimeResize(event.id, deltaY);
                                    };
                                    
                                    const handleMouseUp = () => {
                                      document.removeEventListener('mousemove', handleMouseMove);
                                      document.removeEventListener('mouseup', handleMouseUp);
                                    };
                                    
                                    document.addEventListener('mousemove', handleMouseMove);
                                    document.addEventListener('mouseup', handleMouseUp);
                                  }}
                                >
                                  <div className="w-8 h-0.5 bg-white rounded-full opacity-80"></div>
                                </div>
                              )}

                              <div className="flex items-center gap-1 mb-1 mt-2">
                                <span className="text-xs">{event.icon}</span>
                                <span className="text-xs font-semibold text-foreground truncate flex-1">{event.title}</span>
                                {selectedEvent === event.id && (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditEvent(event.id);
                                      }}
                                      className="h-4 w-4 p-0 hover:bg-blue-500/20 text-blue-600"
                                    >
                                      <Edit3 className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteEvent(event.id);
                                      }}
                                      className="h-4 w-4 p-0 hover:bg-red-500/20 text-red-600"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                                <span>{event.time} - {addMinutesToTime(event.time, event.duration)}</span>
                                <span className={`px-1 py-0.5 rounded text-xs ${getDifficultyColor(event.difficulty)}`}>
                                  {event.difficulty}
                                </span>
                              </div>
                              
                              {event.progress !== undefined && (
                                <div className="w-full bg-white/30 rounded-full h-1 mb-2">
                                  <div 
                                    className="bg-foreground h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${event.progress}%` }}
                                  />
                                </div>
                              )}
                              
                              {event.completed && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                              
                              {/* End Time Resize Handle (Bottom) */}
                              {selectedEvent === event.id && (
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-3 bg-orange-500/50 cursor-ns-resize flex items-center justify-center hover:bg-orange-500/70 transition-colors rounded-b-lg"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    const startY = e.clientY;
                                    
                                    const handleMouseMove = (e: MouseEvent) => {
                                      const deltaY = e.clientY - startY;
                                      handleEndTimeResize(event.id, deltaY);
                                    };
                                    
                                    const handleMouseUp = () => {
                                      document.removeEventListener('mousemove', handleMouseMove);
                                      document.removeEventListener('mouseup', handleMouseUp);
                                    };
                                    
                                    document.addEventListener('mousemove', handleMouseMove);
                                    document.addEventListener('mouseup', handleMouseUp);
                                  }}
                                >
                                  <div className="w-8 h-0.5 bg-white rounded-full opacity-80"></div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="xl:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card backdrop-blur-xl rounded-2xl border border-border shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-sky-500" />
              <h3 className="text-lg font-semibold text-foreground">This Week</h3>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-sky-50/80 to-purple-50/80 dark:from-sky-900/20 dark:to-purple-900/20 rounded-xl mb-6 border border-sky-100/60 dark:border-sky-800/60">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-1">{totalWeekHours.toFixed(1)}h</div>
              <div className="text-sm text-muted-foreground mb-2">Total Study Time</div>
              <div className={`text-sm font-medium ${weeklyDifference >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {weeklyDifference >= 0 ? '+' : ''}{weeklyDifference.toFixed(1)}h from last week 
                {weeklyDifference >= 0 ? ' 🎉' : ' 📉'}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="w-8 text-xs font-semibold text-muted-foreground">{day.day}</span>
                  <div className="flex-1 relative">
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((day.hours / day.target) * 100, 100)}%` }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.6 }}
                        className={`h-2 rounded-full ${
                          day.hours >= day.target 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                            : 'bg-gradient-to-r from-sky-400 to-purple-400'
                        }`}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-xs font-semibold text-foreground text-right">
                    {day.hours.toFixed(1)}h
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card backdrop-blur-xl rounded-2xl border border-border shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Subject Focus</h3>
            <div className="space-y-3">
              {subjectData.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{subject.subject}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{subject.hours.toFixed(1)}h</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className="h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50/80 to-sky-50/80 dark:from-purple-900/20 dark:to-sky-900/20 backdrop-blur-xl rounded-2xl border border-purple-200/60 dark:border-purple-700/60 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Rafiq's Suggestions</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Here's a good plan for this week 👇</p>
            
            <div className="space-y-2 mb-4">
              {[
                { text: "Focus on Math early mornings", icon: "🌅" },
                { text: "Schedule breaks every 90 mins", icon: "⏰" },
                { text: "Review notes before weekend", icon: "📝" },
              ].map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/60 dark:bg-card/40 rounded-xl hover:bg-white/80 dark:hover:bg-card/60 transition-colors cursor-pointer"
                >
                  <span className="text-sm">{suggestion.icon}</span>
                  <span className="text-sm font-medium text-foreground">{suggestion.text}</span>
                </motion.div>
              ))}
            </div>

            <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white rounded-xl font-medium shadow-lg transition-all duration-200">
              Get More Tips
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card backdrop-blur-xl rounded-2xl border border-border shadow-xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-foreground">Achievement Badges</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className={`group relative p-4 rounded-xl text-center cursor-pointer transition-all duration-300 border ${
                badge.earned 
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200/60 dark:border-green-600/60 shadow-sm hover:shadow-md" 
                  : "bg-muted/60 border-border opacity-60"
              }`}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {badge.icon}
              </div>
              <p className={`text-xs font-semibold mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                {badge.name}
              </p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              
              {badge.earned && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Task Edit Modal */}
      <TaskEditModal
        task={editingEvent ? calendarEvents.find(e => e.id === editingEvent) || null : null}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
      />
    </div>
  );
};