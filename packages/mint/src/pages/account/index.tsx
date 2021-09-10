import React from 'react'
import { MainLayout } from '../../layouts'
import { Account } from '../../modules'

const AccountPage = () => {
    return (
        <MainLayout containerProps={{ style: { justifyContent: 'center' } }}>
            <Account />
        </MainLayout>
    )
}

export default AccountPage
