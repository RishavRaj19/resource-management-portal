import { Typography, Paper, Box, TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PortalService } from "../services/PortalService";
import { useNavigate } from "react-router"

export const LoginPage = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleUserName = (event, value) => {
        setUserName(value)
    }

    const handlePassword = (event, value) => {
        setPassword(value)
    }

    const validateUserName = (username) => {
        // char validation
        if (username.length < 8 || username.length > 15) {
            PortalService.errorToast('UserName should must have [' + 8 + ', ' + 15 + '] characters')
            return false
        }

        //reg exp validation
        const expression = /^(?=[a-zA-Z])[a-zA-Z0-9]*$/
        const regExp = new RegExp(expression)
        if (!username.match(regExp)) {
            PortalService.errorToast('Invalid UserName! Refer, the RegExp = ' + expression + ' to construct a valid username.')
            return false
        }
        return true
    }

    const validatePassword = (password) => {
        //reg exp validation along with length validation
        const expression = "^(?=.*[0-9])"
            + "(?=.*[a-z])(?=.*[A-Z])"
            + "(?=.*[@#$%^&+=])"
            + "(?=\\S+$).{8,20}$"
        const regExp = new RegExp(expression)
        if (!password.match(regExp)) {
            PortalService.errorToast('Invalid Password! Refer, the RegExp = ' + expression + ' to construct a valid password.')
            return false
        }
        return true
    }

    const navigate = useNavigate()
    const handleLogin = () => {
        if (validateUserName(userName) && validatePassword(password)) {
            navigate('/resource-management-portal/home')
        }
    }

    return (
        <div style={{backgroundColor: '#E5E4E2', minHeight: '100vh'}}>

            <Paper>
                <Box style={{ padding: 10, height: 72, display: 'flex', alignItems: 'center' }}>
                    <Typography variant={'h4'} style={{ marginLeft: "auto", marginRight: "auto" }}> Resource Management Portal </Typography>
                </Box>
            </Paper>

            <Paper style={{ width: 320, height: 280, marginLeft: 'auto', marginRight: 'auto', marginTop: '220px' }} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '32px' }}>
                        <Autocomplete
                            freeSolo
                            id="username"
                            options={[]}
                            onInputChange={handleUserName}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={'USERNAME'}
                                    style={{ width: 240 }}
                                    type={"text"}
                                    variant={'outlined'}
                                    size={'small'}
                                />
                            )}
                        />
                        <Autocomplete
                            freeSolo
                            id="password"
                            options={[]}
                            onInputChange={handlePassword}
                            style={{ marginTop: 24 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={'PASSWORD'}
                                    style={{ width: 240 }}
                                    type={showPassword ? "text" : "password"}
                                    variant={'outlined'}
                                    size={'small'}
                                />
                            )}
                        />
                        <FormControlLabel
                            label="Show Password"
                            style={{marginTop: 10}}
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                            }
                        />
                    </Box>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 24 }}>
                    <Box style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Button
                            variant={"contained"}
                            style={{ background: "#0B69FF", color: "white" }}
                            onClick={handleLogin}
                            size={"large"}
                        > Login </Button>
                    </Box>
                </div>
            </Paper>

            <div>
                <ToastContainer />
            </div>

        </div>
    )
}