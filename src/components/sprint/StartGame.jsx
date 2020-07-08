import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, AppBar, Toolbar, IconButton, Button, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ComplexityPoints from '../speakIt/ComplexityPoints';
import './StartGame.scss';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function StartGame({ onClose, onComplexityChange, complexity }) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        onClose();
        setOpen(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleComplexityChange = (newComplexity) => {
        onComplexityChange(newComplexity);
    };

    return (
        <div className="start-page_wrapper">
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        />
                        <Typography align="center" variant="h6" className={classes.title}>
                            Rules
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box className="start-page_content">
                    <h1 className="start-page_content__name">Sprint</h1>
                    <p className="start-page_content__rules">
                        Determine if the word and translation match in 1 minute
                        <br />
                        You can use already learned or random words.
                    </p>
                    <Box className="start-page_game__variant">
                        <Button
                            className="start-page_game__button"
                            color="primary"
                            variant="contained"
                        >
                            My words
                        </Button>
                        <Button
                            className="start-page_game__button"
                            color="primary"
                            variant="contained"
                            onClick={handleShow}
                        >
                            Random words
                        </Button>
                    </Box>
                </Box>
                {show && (
                    <Box>
                        <Typography align="center" variant="h6">
                            Word complexity
                        </Typography>
                        <ComplexityPoints
                            currentComplexity={complexity}
                            onComplexityChange={handleComplexityChange}
                            complexityArray={[0, 1, 2, 3, 4, 5]}
                        />
                    </Box>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    className="start-page__button"
                    onClick={handleClose}
                >
                    Start
                </Button>
            </Dialog>
        </div>
    );
}

StartGame.propTypes = {
    onClose: PropTypes.func.isRequired,
    onComplexityChange: PropTypes.func.isRequired,
    complexity: PropTypes.number.isRequired,
};
