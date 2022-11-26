import * as React from 'react';
import {Box, CircularProgress, Typography} from "@material-ui/core";

export default class ProgressView extends React.Component {
    render() {
        return (
            <Box  ml={2} py={2} align='center'>
                <CircularProgress style={{marginTop: 40, marginBottom: 10}} />
                <Typography variant={'subtitle1'}>
                    Loading
                </Typography>
            </Box>
        );
    }
}