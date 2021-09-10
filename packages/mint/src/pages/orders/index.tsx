import React from 'react'
import { MainLayout } from '../../layouts'
import { Orders } from '../../modules'
import { AppHeader, Footer } from '../../ui'

const OrdersPage = () => {
    return (
        <MainLayout header={<AppHeader />} footer={<Footer />}>
            <Orders />
        </MainLayout>
    )
}

export default OrdersPage
