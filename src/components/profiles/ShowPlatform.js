// unused Component can remove file
import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deletePlatform } from '../../api/profile'
import EditPlatform from './EditPlatform'


const ShowPlatform = (props) => {
    const { platform, user, msgAlert, setUser } = props

    const deletePlatform = () => {
        deletePlatform(user, platform )
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Platform username removed from profile',
                    variant: 'success'
                })
            })
            .then(() => setUser())
            .catch(() => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to remove platform',
                    variant: 'danger'
                })
            })
    }
}