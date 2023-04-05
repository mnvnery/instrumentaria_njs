import { createContext, useContext, useState, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    const setAudioSource = (source) => {
        if (audio) {
            audio.pause();
        }
        setAudio(new Audio(source));
    };

    const value = {
        audio,
        setAudioSource,
        isPlaying,
        setIsPlaying,
    };

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    );
};
