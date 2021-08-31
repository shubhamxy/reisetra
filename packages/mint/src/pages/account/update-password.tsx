import React from 'react'
import { MainLayout } from '../../layouts'
import { UpdatePassword } from '../../modules'

const UpdatePasswordPage = () => {
    return (
        <MainLayout containerProps={{ style: { justifyContent: 'center' } }}>
            <UpdatePassword />
        </MainLayout>
    )
}

export default UpdatePasswordPage
