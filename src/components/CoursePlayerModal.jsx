import React, { useState, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  CheckCircle2, 
  Circle, 
  FileText, 
  MessageSquare, 
  Download, 
  Award,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CoursePlayerModal(props) {
  if (!props.course) return null;
  return <PlayerInner key={props.course.id} {...props} />;
}

function PlayerInner({
  course,
  onClose,
  onShowCertificate
}) {
  // Flatten lessons for easy indexing
  const allLessons = course.curriculum?.flatMap((m) => m.lessons) || [];
  
  const [currentLesson, setCurrentLesson] = useState(allLessons[0] || {
    id: '1-1',
    title: 'Introduction & Foundations',
    duration: '15:00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  });

  const [completedLessonIds, setCompletedLessonIds] = useState(
    allLessons.filter(l => l.completed).map(l => l.id)
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // notes, overview, resources
  const [notes, setNotes] = useState({});
  const [userNote, setUserNote] = useState('');

  const videoRef = useRef(null);

  // Toggle lesson complete
  const toggleLessonComplete = (lessonId) => {
    let newCompleted;
    if (completedLessonIds.includes(lessonId)) {
      newCompleted = completedLessonIds.filter(id => id !== lessonId);
    } else {
      newCompleted = [...completedLessonIds, lessonId];
      // If all completed now, celebrate!
      if (newCompleted.length === allLessons.length && allLessons.length > 0) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    setCompletedLessonIds(newCompleted);
  };

  const isAllComplete = allLessons.length > 0 && completedLessonIds.length === allLessons.length;
  const progressPercent = allLessons.length > 0 
    ? Math.round((completedLessonIds.length / allLessons.length) * 100) 
    : 0;

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const handleSaveNote = () => {
    if (!userNote.trim()) return;
    setNotes(prev => ({
      ...prev,
      [currentLesson.id]: userNote
    }));
    setUserNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/90 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Navbar in Player */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#f15524] flex items-center justify-center text-white font-black text-xs">
            ED
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base leading-tight text-white flex items-center gap-2">
              <span>{course.title}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-stone-300">
                {course.category}
              </span>
            </h3>
            <p className="text-xs text-stone-400">
              Instructor: {course.instructor.name}
            </p>
          </div>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-4">
          
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700">
            <div className="w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#f15524] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-stone-200">
              {progressPercent}%
            </span>
          </div>

          {/* Certificate Button if 100% or allow preview */}
          {isAllComplete && (
            <button
              onClick={() => onShowCertificate(course)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-lg transition-transform hover:scale-105 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Award className="w-4 h-4" />
              <span>Get Certificate</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Player Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Video & Tabs (8 cols) */}
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          
          {/* Video Player Canvas */}
          <div className="relative aspect-video max-h-[65vh] w-full bg-slate-950 flex items-center justify-center group">
            <video
              ref={videoRef}
              src={currentLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              className="w-full h-full object-contain"
              onEnded={() => {
                setIsPlaying(false);
                if (!completedLessonIds.includes(currentLesson.id)) {
                  toggleLessonComplete(currentLesson.id);
                }
              }}
              playsInline
            />

            {/* Custom Control Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex justify-between items-center text-white text-xs font-medium">
                <span className="bg-black/60 px-2.5 py-1 rounded-md">{currentLesson.title}</span>
                <span className="bg-black/60 px-2.5 py-1 rounded-md">{currentLesson.duration}</span>
              </div>

              {/* Bottom control bar */}
              <div className="flex items-center justify-between text-white pointer-events-auto">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="p-2.5 bg-[#f15524] text-white rounded-full hover:scale-110 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    className="p-2 text-stone-300 hover:text-white"
                    title="Restart Lesson"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="p-2 text-stone-300 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {/* Speed buttons */}
                  {[1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        playbackSpeed === spd ? 'bg-[#f15524] text-white' : 'bg-white/10 hover:bg-white/20 text-stone-300'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="p-1.5 text-stone-300 hover:text-white ml-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Play button overlay if paused */}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute w-16 h-16 rounded-full bg-[#f15524]/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
              >
                <Play className="w-7 h-7 ml-1 fill-current" />
              </button>
            )}
          </div>

          {/* Under Video Info Bar */}
          <div className="bg-slate-900 border-t border-slate-800 p-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-lg text-white">
                  {currentLesson.title}
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Lesson Duration: {currentLesson.duration} • Chapter Interactive Exercise
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLessonComplete(currentLesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    completedLessonIds.includes(currentLesson.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-stone-300 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedLessonIds.includes(currentLesson.id) ? 'Completed' : 'Mark as Complete'}
                  </span>
                </button>
              </div>
            </div>

            {/* Tab navigation: Notes, Resources, Q&A */}
            <div className="flex gap-4 border-b border-slate-800 mt-6 pt-2">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'notes' ? 'text-[#f15524] border-b-2 border-[#f15524]' : 'text-stone-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-2.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'resources' ? 'text-[#f15524] border-b-2 border-[#f15524]' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Assets</span>
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`pb-2.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'discussion' ? 'text-[#f15524] border-b-2 border-[#f15524]' : 'text-stone-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instructor Q&A</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4 text-xs text-stone-300">
              {activeTab === 'notes' && (
                <div className="space-y-3">
                  {notes[currentLesson.id] && (
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-stone-300">
                      <p className="font-semibold text-white mb-1">Saved Note for this lesson:</p>
                      <p>{notes[currentLesson.id]}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      placeholder="Add a timestamp note or code snippet..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#f15524]"
                    />
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-2 bg-[#f15524] text-white font-bold rounded-xl hover:bg-[#e04818]"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Lesson-Exercise-Starter-Kit.zip</p>
                      <p className="text-[11px] text-stone-400">Includes Figma tokens, Adobe XD wireframes (14.2 MB)</p>
                    </div>
                    <button
                      disabled
                      title="Demo only: no file available"
                      className="px-3 py-1.5 bg-slate-700 text-white rounded-lg font-bold flex items-center gap-1 text-xs opacity-50 cursor-not-allowed"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <p className="font-bold text-white text-xs">Michael R. asked:</p>
                    <p className="text-stone-300 text-xs mt-1">"How do we handle responsive auto-animates across desktop and tablet views?"</p>
                    <p className="text-[#f15524] text-[11px] font-semibold mt-2">Instructor ({course.instructor.name}): "Great question! We cover break-point overrides in Lesson 2.2 using nested component states."</p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Sidebar: Curriculum Checklist (4 cols) */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden">
          
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <h4 className="font-black text-sm text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#f15524]" />
              <span>Course Content</span>
            </h4>
            <span className="text-xs font-bold text-stone-400">
              {completedLessonIds.length}/{allLessons.length} done
            </span>
          </div>

          {/* Scrollable module list */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
            {course.curriculum?.map((module, mIdx) => (
              <div key={mIdx} className="p-3">
                <p className="text-xs font-extrabold text-stone-400 uppercase tracking-wider mb-2 px-2">
                  {module.module}
                </p>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isSelected = currentLesson.id === lesson.id;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson)}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer group ${
                          isSelected
                            ? 'bg-[#f15524]/20 border border-[#f15524]/40 text-white'
                            : 'hover:bg-slate-800/80 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 pr-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonComplete(lesson.id);
                            }}
                            className="text-stone-400 hover:text-emerald-400 shrink-0"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                            ) : (
                              <Circle className="w-4 h-4 text-stone-500" />
                            )}
                          </button>
                          <span className={`text-xs font-medium leading-snug ${isSelected ? 'font-bold text-white' : ''}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-stone-500 shrink-0">
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick certificate trigger at bottom of curriculum */}
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <button
              onClick={() => onShowCertificate(course)}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Award className="w-4 h-4" />
              <span>Preview Completion Certificate</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
