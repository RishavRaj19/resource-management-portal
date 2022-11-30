import { Typography, Box, Paper, Chip, Button, TextField } from "@material-ui/core"
import { Autocomplete, Pagination } from "@material-ui/lab"
import { useState, useRef } from "react"
import { Fetcher } from "../../../common/components/Fetcher"
import { REQUEST_TAG, USER_TAG } from "../constants"
import { ResourceView } from "../components/ResourceView"
import { PortalService } from "../services/PortalService"
import { useNavigate } from "react-router"
import { RESOURCE_PER_PAGE } from '../constants'

export const PortalScreen = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [resourceList, setResourceList] = useState([])
    const fetcherRef = useRef(resourceList)
    const [searchBarValue, setSearchBarValue] = useState('')
    const [pageNumber, setPageNumber] = useState(0)

    const tabs = [
        "Resources",
        "Requests",
        "Users"
    ]

    const handleTabChange = (newTabIndex) => {
        setPageNumber(0)
        setTabIndex(newTabIndex)
    }

    const handleResourceListChange = (newList) => {
        setResourceList(newList)
    }

    const navigate = useNavigate()
    const handleResourceAddition = () => {
        navigate('/resource-management-portal/create-resource')
    }

    const handleLogout = () => {
        navigate('/resource-management-portal')
    }

    const handleSearch = (event, value) => {
        setSearchBarValue(value)
    }

    const handlePageChange = (event, pageNum) => {
        setPageNumber(pageNum - 1)
    }

    const getResourceListAsPerTab = (tabIndex) => {
        return tabIndex === 1 ? resourceList.filter(resource => resource.tag === REQUEST_TAG && resource.title.match(searchBarValue))
            : tabIndex === 2 ? resourceList.filter(resource => resource.tag === USER_TAG && resource.title.match(searchBarValue))
                : resourceList.filter(resource => resource.title.match(searchBarValue))
    }

    return (
        <div>
            <Paper>
                <Box style={{ padding: 10, height: 72, display: 'flex', alignItems: 'center' }}>
                    <Typography variant={'h4'} style={{ marginLeft: "auto", marginRight: -180 }}> Resource Management Portal </Typography>
                    <Button
                        variant={"contained"}
                        style={{ background: "#2DCA73", color: "white", marginLeft: "auto" }}
                        onClick={handleResourceAddition}
                    > Add Item </Button>
                    <Button
                        variant={"contained"}
                        style={{ background: "default", marginLeft: "12px" }}
                        onClick={handleLogout}
                    > Logout </Button>
                </Box>
            </Paper>

            <Box ml={2} py={2} align='center' style={{ marginTop: 46 }}>
                {tabs.map((tabName, index) => (
                    <Chip
                        key={tabName}
                        label={tabName}
                        onClick={() => handleTabChange(index)}
                        color={tabIndex === index ? 'primary' : 'default'}
                        style={{ border: "1px solid #D3D3D3", borderRadius: 2, width: 200, height: 40 }}
                    />
                ))}
            </Box>

            <Autocomplete
                freeSolo
                id="search-bar"
                value={searchBarValue}
                clearOnEscape
                options={[]}
                style={{ marginTop: 32, marginLeft: 149 }}
                onInputChange={handleSearch}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        style={{ width: 648, height: 40 }}
                        variant={'outlined'}
                        size={'small'}
                    />
                )}
            />

            <Fetcher
                fetchData={() => PortalService.getResources()}
                onFetch={(items) => handleResourceListChange(items)}
                ref={fetcherRef}
            >
                <ResourceView resources={getResourceListAsPerTab(tabIndex).slice(pageNumber * RESOURCE_PER_PAGE, (pageNumber + 1) * RESOURCE_PER_PAGE)} />
            </Fetcher>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                <Pagination
                    count={Math.ceil(getResourceListAsPerTab(tabIndex).length / RESOURCE_PER_PAGE)}
                    onChange={handlePageChange}
                    page={pageNumber + 1}
                />
            </div>

        </div>
    )
}