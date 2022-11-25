import { Container, Typography, Box, Divider } from "@material-ui/core"


export const PortalScreen = () => {
    return (
        <Container maxWidth={"xl"}>
            <Box style={{padding: 10}}>
                <Typography variant={'h3'} align={'center'}> Resource Management Portal </Typography>
                <Divider/>
            </Box>
        </Container>
    )
}