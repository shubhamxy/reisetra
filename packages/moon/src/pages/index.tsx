import React from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { LogIn } from '../modules/Login'
const LoginPage = () => {
    return (
        <MainLayout containerProps={{ style: { justifyContent: 'center' } }}>
            <LogIn />
        </MainLayout>
    )
}

export default LoginPage
