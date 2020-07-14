import PropTypes from 'prop-types';
import MainPage from '../mainPage';
import AboutProject from '../aboutProject';
import AboutTeam from '../aboutTeam';
import Sprint from '../sprint/Sprint';
import SpeakItGame from '../speakIt';
import Vocabulary from '../vocabulary';
import SavannahGame from '../savannah';
import MainGame from '../mainGame';
import EnglishPuzzle from '../english-puzzle';
import SettingsPage from '../settingsPage';
import AnagrammGame from '../anagrammGame';
import Statistics from '../statistics';

const pages = [
    {
        component: MainPage,
        title: 'Main Page',
        url: '/',
        exact: true,
        img: '',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: MainGame,
        title: 'Words learning',
        url: '/learn',
        exact: false,
        img: '/assets/images/learn.jpg',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: Vocabulary,
        title: 'Vocabulary',
        url: '/vocabulary',
        exact: false,
        img: '/assets/images/scared.jpg',
        userMenuPage: true,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: Sprint,
        title: 'Sprint',
        url: '/sprint',
        img: '/assets/images/sprint.png',
        exact: false,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: SpeakItGame,
        title: 'SpeakIt',
        url: '/speakit',
        img: '/assets/images/start-image.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: EnglishPuzzle,
        title: 'English-Puzzle',
        url: '/englishpuzzle',
        img: '/assets/images/start-image.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: SavannahGame,
        title: 'Savannah',
        url: '/Savannah',
        img: '/assets/images/draw.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: SettingsPage,
        title: 'Settings',
        url: '/settings',
        img: '/assets/images/angry.jpg',
        exact: true,
        userMenuPage: true,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: AnagrammGame,
        title: 'Anagramm Game',
        url: '/anagramm',
        exact: true,
        img: '/assets/images/angry.jpg',
        userMenuPage: false,
        auth: false,
        minigame: true,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
        component: AboutProject,
        title: 'About Project',
        url: '/aboutproject',
        exact: true,
        img: '/assets/images/angry.jpg',
        userMenuPage: false,
        auth: true,
        minigame: false,
        description: '',
    },
    {
        component: AboutTeam,
        title: 'About Team',
        url: '/aboutteam',
        img: '/assets/images/happy.jpg',
        exact: true,
        userMenuPage: false,
        auth: false,
        minigame: false,
        description: '',
    },
    {
        component: Statistics,
        title: 'Statistics',
        url: '/statistics',
        exact: false,
        img: '/assets/images/angry.jpg',
    },
];

export const pagePropType = PropTypes.exact({
    component: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    userMenuPage: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
    minigame: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
});

export default pages;
