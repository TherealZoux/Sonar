import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  ListMusic,
  RotateCw,
  RotateCcw,
} from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

// --- Custom 30s Icons ---
function SkipForward30({ size = 18, className = "" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <RotateCw size={size} strokeWidth={1.8} />
      <span
        className="absolute font-bold leading-none tracking-tighter"
        style={{ fontSize: size * 0.4 }}
      >
        30
      </span>
    </div>
  );
}

function SkipBack30({ size = 18, className = "" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <RotateCcw size={size} strokeWidth={1.8} />
      <span
        className="absolute font-bold leading-none tracking-tighter"
        style={{ fontSize: size * 0.4 }}
      >
        30
      </span>
    </div>
  );
}

// --- Helpers ---
function fmt(sec: number) {
  if (isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerComponent() {
  const { currentEpisode, playing, setPlaying } = usePlayerStore();

  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0); // Now driven by actual audio metadata
  const [volume, setVolume] = useState(60);
  const [speed, setSpeed] = useState(1);
  
  // Ref to the actual HTML5 audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync Play/Pause state with the audio element
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.play().catch((err) => {
        console.error("Playback prevented:", err);
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing, currentEpisode]);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

useEffect(() => {
  if (!currentEpisode) return;

  // Set the metadata that shows up in the browser/OS media controller
  navigator.mediaSession.metadata = new MediaMetadata({
    title: currentEpisode.title,
    artist: currentEpisode.author, // Ensure your Episode interface has this
    album: "Sonar Podcasts",
    artwork: [
      { src: currentEpisode.episodeImage, sizes: '512x512', type: 'image/png' }
    ]
  });

  // Handle media key actions (play/pause/skip from keyboard or OS)
  navigator.mediaSession.setActionHandler('play', () => setPlaying(true));
  navigator.mediaSession.setActionHandler('pause', () => setPlaying(false));
  navigator.mediaSession.setActionHandler('seekbackward', () => skipBackward());
  navigator.mediaSession.setActionHandler('seekforward', () => skipForward());

}, [currentEpisode]);

  // Sync Speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrent(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrent(0);
  };

  // Interaction Handlers
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 30);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 30);
    }
  };

  const handleSeek = (value: number) => {
    const newTime = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrent(newTime);
  };

  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  // Do not render if no episode is active
  if (!currentEpisode) return null;

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="w-full bg-[#F5F3F0] border-t border-[#E2DDD8] px-6 py-3 flex items-center gap-6"
    >
      {/* HIDDEN AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Album art + title */}
      <div className="flex items-center gap-3 w-56 shrink-0">
        <div className="w-11 h-11 rounded-md overflow-hidden shadow-sm shrink-0 bg-[#E2DDD8]">
          <img
            src={currentEpisode.episodeImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <p className="text-[13px] font-semibold text-[#1A1714] truncate leading-tight">
            {currentEpisode.title}
          </p>
          <p className="text-[12px] text-[#8C8580] truncate leading-tight mt-0.5">
            {currentEpisode?.author}
          </p>
        </div>
      </div>

      {/* Center controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        {/* Transport buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={skipBackward}
            className="text-[#6B6560] hover:text-[#1A1714] transition-colors"
          >
            <SkipBack30 size={18} />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className="w-10 h-10 rounded-full bg-[#D95F3B] hover:bg-[#C4502E] text-white flex items-center justify-center shadow-md transition-colors"
          >
            {playing ? (
              <Pause size={17} fill="white" strokeWidth={0} />
            ) : (
              <Play size={17} fill="white" strokeWidth={0} className="ml-0.5" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="text-[#6B6560] hover:text-[#1A1714] transition-colors"
          >
            <SkipForward30 size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[11px] text-[#8C8580] tabular-nums w-10 text-right shrink-0">
            {fmt(current)}
          </span>

          <div className="flex-1 relative group">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.01}
              onValueChange={([v]) => handleSeek(v)}
              className="w-full [&>span[data-slot=slider-track]]:bg-[#D9D4CE] [&>span[data-slot=slider-range]]:bg-[#D95F3B] [&>span[data-slot=slider-thumb]]:border-[#D95F3B] [&>span[data-slot=slider-thumb]]:bg-white [&>span[data-slot=slider-thumb]]:opacity-0 group-hover:[&>span[data-slot=slider-thumb]]:opacity-100 [&>span[data-slot=slider-thumb]]:transition-opacity [&>span[data-slot=slider-thumb]]:w-3 [&>span[data-slot=slider-thumb]]:h-3"
            />
          </div>

          <span className="text-[11px] text-[#8C8580] tabular-nums w-10 shrink-0">
            {fmt(duration)}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 w-48 justify-end shrink-0">
        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="text-[12px] font-semibold text-[#6B6560] hover:text-[#1A1714] transition-colors w-8 text-center leading-none"
        >
          {speed === 1 ? "1×" : `${speed}×`}
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2 group">
          <Volume2 size={15} className="text-[#6B6560] shrink-0" strokeWidth={1.8} />
          <div className="w-20">
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={([v]) => setVolume(v)}
              className="w-full [&>span[data-slot=slider-track]]:bg-[#D9D4CE] [&>span[data-slot=slider-range]]:bg-[#D95F3B] [&>span[data-slot=slider-thumb]]:border-[#D95F3B] [&>span[data-slot=slider-thumb]]:bg-white [&>span[data-slot=slider-thumb]]:opacity-0 group-hover:[&>span[data-slot=slider-thumb]]:opacity-100 [&>span[data-slot=slider-thumb]]:transition-opacity [&>span[data-slot=slider-thumb]]:w-3 [&>span[data-slot=slider-thumb]]:h-3"
            />
          </div>
        </div>

        {/* Queue */}
        <button className="text-[#6B6560] hover:text-[#1A1714] transition-colors">
          <ListMusic size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>
    </div>
  );
}
