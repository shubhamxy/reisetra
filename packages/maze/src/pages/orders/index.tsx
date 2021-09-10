import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Orders } from '../../modules/Orders'
import { AppHeader, Footer } from '../../ui'

const OrdersPage = () => {
    return (
        <MainLayout header={<AppHeader />} footer={<Footer />}>
            <Orders />
        </MainLayout>
    )
}

export default OrdersPage
