import { Box } from '@material-ui/core'
import { Icons, Image } from '../Image'
import { config } from '../../libs'
import { useRouter } from 'next/router'

export function Logo({}) {
    const { push } = useRouter()
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
            <Box
                onClick={() => {
                    push(config.clientUrl)
                }}
            >
                <Image
                    alt={config.title}
                    icon={Icons.logo}
                    objectFit="contain"
                    width="90px"
                    height="24px"
                />
            </Box>
        </Box>
    )
}
