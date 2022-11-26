import * as React from "react";
import {Box, BoxProps} from "@material-ui/core";

export const FBox = props => {
    // noinspection JSUnusedLocalSymbols
    const {display, children, ...rest} = props;
    const newProps = {
        ...rest,
    };
    return (
        <Box display={"flex"} {...newProps}>
            {children}
        </Box>
    );
};