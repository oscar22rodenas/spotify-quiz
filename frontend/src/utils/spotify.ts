export interface Question {
  id: string;
  type: 'artist' | 'song' | 'album' | 'year' | 'duration';
  question: string;
  options: string[];
  correctAnswer: number;
  context?: string;
  explanation?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  questions: Question[];
  answers: Array<{
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  isComplete: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface PlaylistData {
  id: string;
  name: string;
  description: string;
  totalTracks: number;
  totalDuration: number;
  tracks: Array<{
    name: string;
    artist: string;
    album: string;
    duration: number;
    releaseYear: number;
    addedDate: string;
    popularity: number;
  }>;
}

export function isValidSpotifyUrl(url: string): boolean {
  const spotifyPlaylistRegex = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?.*)?$/;
  return spotifyPlaylistRegex.test(url);
}

export async function fetchQuizFromApi(playlistUrl: string, questionCount = 10): Promise<Question[]> {
  if (!isValidSpotifyUrl(playlistUrl)) {
    throw new Error('Invalid Spotify playlist URL');
  }

  const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';

  const res = await fetch(`${apiUrl}/api/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlistUrl, questionCount })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Error fetching quiz');
  }

  const { questions } = await res.json();
  return questions;
}

export function calculateScorePercentage(score: number, total: number): number {
  return Math.round((score / total) * 100);
}

export function getScoreMessage(percentage: number): string {
  if (percentage >= 90) return 'perfect';
  if (percentage >= 70) return 'excellent';
  if (percentage >= 50) return 'good';
  if (percentage >= 30) return 'fair';
  return 'poor';
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}