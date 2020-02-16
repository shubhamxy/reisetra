import React from 'react';
import styled from '@emotion/styled';
import BackButton from './BackButton';

import {
  Heading as BaseHeading,
  TextContainer,
  UnorderedList
} from '../shared/Typography';
import { colors, spacing, dimensions } from '../../utils/styles';

const Heading = styled(BaseHeading)`
  margin-bottom: -${spacing.sm}px;
`;

const ProductTextContainer = styled(TextContainer)`
  padding: ${spacing.xl}px;
`;

const Section = styled(`section`)`
  padding-top: calc(${dimensions.headerHeight} + ${spacing.sm}px);
`;

const SectionHeading = styled(Heading.withComponent(`h2`))`
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  margin-bottom: ${spacing.sm}px;
`;

const SubHeading = styled(Heading.withComponent(`h3`))`
  color: ${colors.text};
  font-size: 1rem;
  margin: ${spacing.lg}px 0 ${spacing.xs}px;
`;

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      units: 'in'
    };
    this.changeUnits = this.changeUnits.bind(this);
  }

  changeUnits(units) {
    this.setState({ units });
  }

  render() {
    const { units } = this.state;

    return (
      <ProductTextContainer>
        <Heading>Product Details</Heading>
        <BackButton>Back to Product</BackButton>
        <Section id="size-chart">
          <SectionHeading>Size Chart</SectionHeading>
        </Section>
        <Section id="materials">
          <SectionHeading>Materials</SectionHeading>
        </Section>

        <Section id="instructions">
          <SectionHeading>Care Instructions</SectionHeading>
        </Section>
      </ProductTextContainer>
    );
  }
}

export default ProductDetails;
