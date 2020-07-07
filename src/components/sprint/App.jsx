/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Timer from './Timer';
import WordContent from './WordContent';
import './styles.scss';
import useAggregatedWords from '../router/storage/hooks/useAggregatedWords';
import ResultGame from './ResultGame';

const POINT_FOR_RIGHT_ANSWER = 10;
const BONUS_POINTS = 50;
const MAX_STRICK = 4;

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export default () => {
    const [page, setPage] = useState(0);
    const config = {
        group: 0,
        page,
        // eslint-disable-next-line prettier/prettier
        filter: { "$or": [{ "page": page }, { "page": page + 1 }] },
        wordsPerPage: 40,
    };
    const { data, error, loading } = useAggregatedWords(config);
    const words = (data && data[0].paginatedResults) || [];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [endGame, setEndGame] = useState(false);
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    const [guessedWords, setGuessedWords] = useState([]);
    const [unGuessedWords, setUnGuessedWords] = useState([]);

    const gameWords = shuffle(words).map((w) => {
        const answer = Math.random() >= 0.5;
        if (answer) {
            Object.assign(w, { gameTranslate: w.wordTranslate });
        } else {
            const fileredWords = words.filter((word) => word.word !== w.word);
            const randomWord = fileredWords[Math.floor(Math.random() * fileredWords.length)];
            Object.assign(w, { gameTranslate: randomWord.wordTranslate });
        }
        return w;
    });

    const word = gameWords[currentWordIndex];

    const handleAnswer = (answer) => {
        if (
            (answer && word && word.wordTranslate === word.gameTranslate) ||
            (!answer && word && word.wordTranslate !== word.gameTranslate)
        ) {
            setScore(score + POINT_FOR_RIGHT_ANSWER);
            setStreak(streak + 1);
            if (streak >= MAX_STRICK) {
                setScore(score + BONUS_POINTS);
            }
            setGuessedWords((xs) => [...xs, word]);
        } else {
            setStreak(0);
            setUnGuessedWords((xs) => [...xs, word]);
        }
        if (currentWordIndex + 1 !== gameWords.length) {
            setCurrentWordIndex((c) => c + 1);
        } else {
            setEndGame(true);
            setIsPopUpOpened(true);
        }
    };

    const onTimeOut = useCallback(() => {
        setEndGame(true);
        setIsPopUpOpened(true);
    });
    const handlePopUpClose = useCallback(() => setIsPopUpOpened(false));
    const handleNewGame = useCallback(() => {
        setScore(0);
        setStreak(0);
        setEndGame(false);
        setGuessedWords([]);
        setCurrentWordIndex(0);
        setPage((p) => p + 2);
        setIsPopUpOpened(false);
        setUnGuessedWords([]);
    });

    const totalWinStars = Math.min(streak, MAX_STRICK);
    const totalEmptyStars = MAX_STRICK - totalWinStars;

    return (
        <Box className="wrapper">
            <Box className="sprint-game">
                <Box className="score_container">
                    {word && !endGame && <Timer onTimeOut={onTimeOut} />}
                    <Box>
                        {Array(totalWinStars).fill(<StarIcon className="star_full" />)}
                        {Array(totalEmptyStars).fill(
                            <StarBorderOutlinedIcon className="star_empty" />
                        )}
                    </Box>
                    <Box className="score">{score}</Box>
                </Box>
                <Paper className="card" elevation={3}>
                    {word && (
                        <WordContent
                            word={word.word}
                            translate={word.gameTranslate}
                            audio={word.audio}
                        />
                    )}
                    <Box className="button_container">
                        <Button
                            onClick={() => handleAnswer(false)}
                            className="button_wrong"
                            variant="contained"
                        >
                            Неверно
                        </Button>
                        <Button
                            onClick={() => handleAnswer(true)}
                            className="button_right"
                            variant="contained"
                        >
                            Верно
                        </Button>
                        <ResultGame
                            open={isPopUpOpened}
                            unGuessedWords={unGuessedWords}
                            guessedWords={guessedWords}
                            onClose={handlePopUpClose}
                            onNewGame={handleNewGame}
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};
