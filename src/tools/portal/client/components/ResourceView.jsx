import { Grid, CardContent, Typography, Card } from '@material-ui/core'
import React, { useState } from 'react'
import { RESOURCE_PER_PAGE } from '../constants'
import { Pagination } from '@material-ui/lab'

export const ResourceView = (props) => {
    const { resources } = props
    const [pageNumber, setPageNumber] = useState(0)

    const card = (resource) => {
        return (
            <React.Fragment>
                <CardContent>
                    <div style={{ marginTop: 24, display: 'flex', alignItems: 'center' }}>
                        <img src={resource['icon_url']} style={{ width: 44, height: 44 }} />
                        <div style={{ marginLeft: 16 }}>
                            <Typography style={{ color: "#171F46", fontSize: "16px" }}> {resource['title']} </Typography>
                            <Typography style={{ marginTop: 4, color: "#7E858E", fontSize: "12px" }}> {resource['category']} </Typography>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <a href={resource['link']} style={{ color: "#0B69FF" }}> {resource['link']} </a>
                    </div>
                    <p style={{ marginTop: 8, fontSize: "14px", color: "#7E858E" }}> {resource['id']} {resource['description']} </p>
                </CardContent>
            </React.Fragment>
        )
    }

    const handlePageChange = (event, pageNum) => {
        console.log(pageNum - 1);
        setPageNumber(pageNum - 1)
    }

    return (
        <>
            <Grid container>
                {resources.slice(pageNumber * RESOURCE_PER_PAGE, (pageNumber + 1) * RESOURCE_PER_PAGE).map((resource, index) => (
                    <Grid item xs={2} sm={4} md={4} key={resource['id']}>
                        <Card variant='outlined' style={{ width: 360, height: 192, marginTop: 32, marginLeft: 32 }}>
                            {card(resource)}
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                <Pagination
                    count={Math.ceil(Object.values(resources).length / RESOURCE_PER_PAGE)}
                    onChange={handlePageChange}
                    page={pageNumber + 1}
                />
            </div>
        </>
    )
}