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

export async function generateMockQuiz(playlistUrl: string): Promise<Question[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!isValidSpotifyUrl(playlistUrl)) {
    throw new Error('Invalid Spotify playlist URL');
  }

  // Mock playlist data - in real implementation this would come from Spotify API
  const mockPlaylistData: PlaylistData = {
    id: 'mock-playlist',
    name: 'Mi Playlist Favorita',
    description: 'Las mejores canciones para cualquier momento',
    totalTracks: 50,
    totalDuration: 180, // minutes
    tracks: [
      {
        name: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 355, // seconds
        releaseYear: 1975,
        addedDate: '2023-01-15',
        popularity: 85
      },
      {
        name: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California',
        duration: 391,
        releaseYear: 1976,
        addedDate: '2023-02-20',
        popularity: 82
      },
      {
        name: 'Sweet Child O\' Mine',
        artist: 'Guns N\' Roses',
        album: 'Appetite for Destruction',
        duration: 356,
        releaseYear: 1987,
        addedDate: '2023-03-10',
        popularity: 88
      },
      {
        name: 'Stairway to Heaven',
        artist: 'Led Zeppelin',
        album: 'Led Zeppelin IV',
        duration: 482,
        releaseYear: 1971,
        addedDate: '2023-01-25',
        popularity: 90
      },
      {
        name: 'Imagine',
        artist: 'John Lennon',
        album: 'Imagine',
        duration: 183,
        releaseYear: 1971,
        addedDate: '2023-02-05',
        popularity: 85
      }
    ]
  };

  const questions: Question[] = [
    {
      id: '1',
      type: 'artist',
      question: '¿Quién canta "Bohemian Rhapsody"?',
      options: ['Queen', 'The Beatles', 'Led Zeppelin', 'The Rolling Stones'],
      correctAnswer: 0,
      context: `De tu playlist: ${mockPlaylistData.name}`,
      explanation: 'Queen lanzó esta épica canción en 1975, escrita por Freddie Mercury.'
    },
    {
      id: '2',
      type: 'year',
      question: '¿En qué año se lanzó "Hotel California"?',
      options: ['1974', '1976', '1978', '1980'],
      correctAnswer: 1,
      context: 'Una de las canciones más icónicas de los Eagles',
      explanation: 'Hotel California fue lanzada en 1976 y se convirtió en un clásico instantáneo.'
    },
    {
      id: '3',
      type: 'duration',
      question: '¿Cuánto dura aproximadamente "Stairway to Heaven"?',
      options: ['6 minutos', '8 minutos', '10 minutos', '5 minutos'],
      correctAnswer: 1,
      context: 'Una de las canciones más largas en tu playlist',
      explanation: 'Con más de 8 minutos, es una de las baladas de rock más largas y famosas.'
    },
    {
      id: '4',
      type: 'album',
      question: '¿De qué álbum es "Sweet Child O\' Mine"?',
      options: ['Use Your Illusion I', 'Appetite for Destruction', 'GN\'R Lies', 'Use Your Illusion II'],
      correctAnswer: 1,
      context: 'El álbum debut de Guns N\' Roses',
      explanation: 'Appetite for Destruction (1987) fue el explosivo debut de la banda.'
    },
    {
      id: '5',
      type: 'artist',
      question: '¿Quién escribió e interpretó "Imagine"?',
      options: ['Paul McCartney', 'John Lennon', 'George Harrison', 'Ringo Starr'],
      correctAnswer: 1,
      context: 'Un himno de paz y esperanza',
      explanation: 'John Lennon escribió esta canción en 1971 como un mensaje de paz mundial.'
    },
    {
      id: '6',
      type: 'year',
      question: '¿Cuál de estas canciones es más antigua?',
      options: ['Bohemian Rhapsody (1975)', 'Imagine (1971)', 'Hotel California (1976)', 'Sweet Child O\' Mine (1987)'],
      correctAnswer: 1,
      context: 'Comparando las fechas de lanzamiento',
      explanation: 'Imagine fue lanzada en 1971, siendo la más antigua de estas opciones.'
    },
    {
      id: '7',
      type: 'song',
      question: '¿Cuál es la canción más larga en tu playlist?',
      options: ['Bohemian Rhapsody', 'Stairway to Heaven', 'Hotel California', 'Sweet Child O\' Mine'],
      correctAnswer: 1,
      context: 'Basado en la duración de las canciones',
      explanation: 'Stairway to Heaven dura más de 8 minutos, siendo la más larga.'
    },
    {
      id: '8',
      type: 'artist',
      question: '¿Qué banda británica está en tu playlist?',
      options: ['Eagles', 'Guns N\' Roses', 'Queen', 'Ninguna'],
      correctAnswer: 2,
      context: 'Identificando el origen de las bandas',
      explanation: 'Queen es la banda británica en tu playlist, formada en Londres en 1970.'
    },
    {
      id: '9',
      type: 'album',
      question: '¿Qué álbum comparten Led Zeppelin IV y "Stairway to Heaven"?',
      options: ['Led Zeppelin I', 'Led Zeppelin II', 'Led Zeppelin III', 'Led Zeppelin IV'],
      correctAnswer: 3,
      context: 'El cuarto álbum de estudio de la banda',
      explanation: 'Led Zeppelin IV (1971) es considerado uno de los mejores álbums de rock de todos los tiempos.'
    },
    {
      id: '10',
      type: 'year',
      question: '¿Qué década dominó más en tu playlist?',
      options: ['1960s', '1970s', '1980s', '1990s'],
      correctAnswer: 1,
      context: 'Analizando las fechas de lanzamiento',
      explanation: 'Los años 70 fueron una década dorada para el rock clásico, como muestra tu playlist.'
    }
  ];

  return questions.slice(0, 10); // Return 10 questions for the quiz
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