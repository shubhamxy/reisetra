import React from 'react'
import styled from '@emotion/styled'
import { GoMarkGithub } from 'react-icons/go'

import { login } from '../../utils/auth'
import { Button as BaseButton } from '../shared/Buttons'
import { Heading, SectionHeading, Text } from './AreaTypography'
import { spacing, animations, colors } from '../../utils/styles'
import { MdLock } from 'react-icons/md'

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
  position: relative;
`

const FirstHeading = styled(Heading)`
  padding-right: ${spacing.lg}px;
  margin-right: 15px;
  color: ${colors.darkest};
  span {
    color: ${colors.brandDark};
  }
`

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`

const ContentForGuest = () => (
  <ContentForGuestRoot>
    <SectionHeading>For Existing customers</SectionHeading>
    <FirstHeading>
      Shop at Reisetra Craft and get <strong>FREE!</strong> shipping!
    </FirstHeading>
    <Text>
      Already a customer or have a referal? Claim your coupon code now!
    </Text>
    <SectionHeading>For First time customers</SectionHeading>
    <Heading>Hey! Log in to get your referal code.</Heading>
    <Text>
      Let’s get you started with your first purchase at Reisetra! Once you’ve
      made your first purchase completed, you can come back here to claim free
      shiping on subsequent purchases.
    </Text>

    <Button inverse href="/contact">
      Contact Us For Special Discounts!
    </Button>
  </ContentForGuestRoot>
)

export default ContentForGuest
