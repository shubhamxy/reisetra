import styled from '@emotion/styled'

import { colors, fonts, spacing } from '../../utils/styles'

export const SectionHeading = styled(`h3`)`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1rem;
  margin: 0;
`

export const Heading = styled(`h2`)`
  color: ${colors.accent};
  font-family: ${fonts.heading};
  font-size: 1.2rem;
  line-height: 1.2;
  margin: 0;
  margin-top: ${spacing.sm}px;

  strong {
    color: ${colors.darkest};
  }
`

export const Subheading = styled(Heading)`
  color: ${colors.darkest};
  font-size: 1rem;
`

export const Text = styled(`p`)`
  color: ${colors.darkest};
  line-height: 1.6;
  margin-bottom: 0;

  a {
    color: ${colors.darkest};
    font-weight: normal;

    :hover {
      color: ${colors.tuscan};
    }
  }
`

export const Lede = styled(Text)`
  font-size: 1.25rem;
  line-height: 1.4;
`
