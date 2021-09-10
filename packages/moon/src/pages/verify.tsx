import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { updateSnackBar, useGlobalDispatch } from '../libs'
import { emailVerify } from '../libs/rock/api/auth'

function VerifyCallbackPage() {
    const { query, replace, asPath } = useRouter()
    const dispatch = useGlobalDispatch()
    useEffect(() => {
        if (
            query.id &&
            query.token &&
            typeof query.id === 'string' &&
            typeof query.token === 'string'
        ) {
            emailVerify({ id: query.id, token: query.token })
                .then(() => {
                    dispatch(
                        updateSnackBar({
                            message: 'Email Verified',
                            type: 'success',
                            open: true,
                        })
                    )
                    replace({
                        query,
                        pathname: '/'
                    })
                })
                .catch(() => {
                    dispatch(
                        updateSnackBar({
                            message: 'Email Verification Failed',
                            type: 'error',
                            open: true,
                        })
                    )
                    replace({
                        query,
                        pathname: '/'
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    return (
        <h1>
            This is the auth callback page, you should be redirected
            immediately!
        </h1>
    )
}

export default VerifyCallbackPage
