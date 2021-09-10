import { Box } from '@material-ui/core'
import { Icons, Image } from '../Image'
import Link from 'next/link'

export function Logo() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pt={1.2}
            pb={1.2}
            position="relative"
            style={{ cursor: 'pointer' }}
        >
            <Link passHref href="/">
                <Image
                    alt=""
                    icon={Icons.logo}
                    objectFit="contain"
                    width="80px"
                    height="40px"
                />
            </Link>
        </Box>
    )
}
