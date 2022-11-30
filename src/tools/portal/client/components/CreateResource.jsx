import { Typography, Paper, Box, TextField, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useState } from "react"
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../../images/background_create_res.jpeg"
import { PortalService } from "../services/PortalService";

export const CreateResource = () => {

    const [resource, setResource] = useState({
        itemName: "",
        link: "",
        name: "",
        description: ""
    })

    const handleItemName = (event, value) => {
        setResource({
            itemName: value,
            link: resource.link,
            name: resource.name,
            description: resource.description
        })
    }

    const handleLink = (event, value) => {
        setResource({
            itemName: resource.itemName,
            link: value,
            name: resource.name,
            description: resource.description
        })
    }

    const handleResourceName = (event, value) => {
        setResource({
            itemName: resource.itemName,
            link: resource.link,
            name: value,
            description: resource.description
        })
    }

    const handleDescription = (event, value) => {
        setResource({
            itemName: resource.itemName,
            link: resource.link,
            name: resource.name,
            description: value
        })
    }

    const handleResourceCreation = () => {
        PortalService.createResource(resource)    
    }

    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/resource-management-portal')
    }

    return (
        <div>
            <Paper>
                <Box style={{ padding: 10, height: 72, display: 'flex', alignItems: 'center' }}>
                    <Typography variant={'h4'} style={{ marginLeft: 40 }}> NxtWave </Typography>
                    <Button
                        variant={"contained"}
                        style={{ background: "default", marginLeft: "auto" }}
                        onClick={handleLogout}
                    > Logout </Button>
                </Box>
            </Paper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Box style={{ marginLeft: 'auto' }}>
                    <div style={{ marginBottom: 32 }}>
                        <label> ITEM NAME </label>
                        <Autocomplete
                            freeSolo
                            id="res-item"
                            options={[]}
                            onInputChange={handleItemName}
                            style={{ marginTop: 8 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ width: 320 }}
                                    variant={'outlined'}
                                    size={'small'}
                                />
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: 32 }}>
                        <label> LINK </label>
                        <Autocomplete
                            freeSolo
                            id="res-link"
                            options={[]}
                            onInputChange={handleLink}
                            style={{ marginTop: 8 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ width: 320 }}
                                    variant={'outlined'}
                                    size={'small'}
                                />
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: 32 }}>
                        <label> RESOURCE NAME </label>
                        <Autocomplete
                            freeSolo
                            id="res-name"
                            options={[]}
                            onInputChange={handleResourceName}
                            style={{ marginTop: 8 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ width: 320 }}
                                    variant={'outlined'}
                                    size={'small'}
                                />
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: 48 }}>
                        <label> DESCRIPTION </label>
                        <Autocomplete
                            freeSolo
                            id="res-description"
                            options={[]}
                            onInputChange={handleDescription}
                            style={{ marginTop: 8 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ width: 320 }}
                                    variant={'outlined'}
                                    size={'small'}
                                    multiline
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Button
                            variant={"contained"}
                            style={{ background: "#0B69FF", color: "white", marginLeft: 110 }}
                            onClick={handleResourceCreation}
                        > CREATE </Button>
                    </div>
                    <ToastContainer/>
                </Box>
                <img src={logo} style={{ width: "50%", height: "805px", marginLeft: "auto" }} />
            </div>
        </div>
    )
}