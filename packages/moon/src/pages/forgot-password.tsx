import React from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { ForgotPassword } from '../modules/Forgot'

const ForgotPasswordPage = () => {
    return (
        <MainLayout containerProps={{ style: { justifyContent: 'center' } }}>
            <ForgotPassword />
        </MainLayout>
    )
}

export default ForgotPasswordPage
