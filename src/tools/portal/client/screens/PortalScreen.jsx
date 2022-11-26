import { Typography, Box, Paper, Chip, Button } from "@material-ui/core"
import { useState, useRef } from "react"
import { Fetcher } from "../../../common/components/Fetcher"
import { REQUEST_TAG, USER_TAG } from "../constants"
import { ResourceView } from "../components/ResourceView"
import { PortalService } from "../services/PortalService"
import { useNavigate } from "react-router"

export const PortalScreen = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [resourceList, setResourceList] = useState([])
    const fetcherRef = useRef(resourceList)

    const tabs = [
        "Resources",
        "Requests",
        "Users"
    ]

    const handleTabChange = (newTabIndex) => {
        setTabIndex(newTabIndex)
    }

    const handleResourceListChange = (newList) => {
        setResourceList(newList)
    }

    const navigate = useNavigate()
    const handleResourceAddition = () => {
        navigate('/res-management-portal/create-resource')
    }

    return (
        <div>
            <Paper>
                <Box style={{ padding: 10, height: 72, display: 'flex', alignItems: 'center' }}>
                    <Typography variant={'h4'} style={{marginLeft: "auto", marginRight: -112}}> Resource Management Portal </Typography>
                    <Button 
                        variant={"contained"} 
                        style={{background: "#2DCA73", color: "white", marginLeft: "auto", marginRight: 32}}
                        onClick={handleResourceAddition}
                    > Add Item </Button>
                </Box>
            </Paper>

            <Box ml={2} py={2} align='center' style={{ marginTop: 46 }}>
                {tabs.map((tabName, index) => (
                    <Chip
                        key={tabName}
                        label={tabName}
                        onClick={() => handleTabChange(index)}
                        color={tabIndex === index ? 'primary' : 'default'}
                        style={{ border: "1px solid #D7DFE9", borderRadius: 2, width: 200, height: 40 }}
                    />
                ))}
            </Box>

            <Fetcher
                fetchData={() => PortalService.getResources()}
                onFetch={(items) => handleResourceListChange(items)}
                ref={fetcherRef}
            >
                <ResourceView resources={tabIndex === 1 ? resourceList.filter(resource => resource.tag === REQUEST_TAG)
                    : tabIndex === 2 ? resourceList.filter(resource => resource.tag === USER_TAG)
                        : resourceList} />
            </Fetcher>

        </div>
    )
}