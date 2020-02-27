import React from 'react';
import styled from '@emotion/styled';
import { breakpoints, colors, spacing } from '../../utils/styles';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const FooterRoot = styled('footer')`
  font-size: 0.8rem;
  color: ${colors.textLighter};
  display: flex;
  flex-direction: column;
  padding: 3.6rem;
  min-height: 250px;

  a {
    color: ${colors.brandLighter};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const Row = styled(`span`)`
  flex: 1;
  line-height: 1.3;
  padding-bottom: ${spacing['2xs']}px;
  text-align: flex-start;
  flex-direction: column;
  @media (min-width: ${breakpoints.desktop}px) {
    line-height: 1.4;
    padding-bottom: 0;
  }
`;

const FooterHeader = styled(`div`)`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${colors.tuscan};
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
`;
const FooterImage = styled(`img`)`
  flex: 1;
`;
const FooterLink = styled(`a`)`
  font-size: 0.8rem;
  align-content: flex-start;
  color: ${colors.textLight};
  font-weight: bold;
  text-decoration: none;
`;

const FooterText = styled(`div`)`
  font-size: 0.8rem;
  color: ${colors.textMilder};
`;

const ButtonContainer = styled(`div`)`
  align-content: flex-start;
  text-align: left;
  padding: 0.4rem 0 1rem 0;
`;

const Button = styled(`a`)`
  padding: 1rem 1rem 1rem 0;
  justify-content: center;
`;

const Footer = () => (
  <div
    style={{
      backgroundColor: colors.darkest,
      paddingTop: 30
    }}
  >
    <FooterRoot style={{ justifyContent: 'space-around' }}>
      <Row style={{ flex: 3 }}>
        <FooterHeader>About us</FooterHeader>
        <FooterText>
          Our Exclusive line of furniture is well balanced collection of designs
          ranging from rustic to eclectic, from antique to contemporary, well
          proportioned and durable for today's casual chic life styles.
        </FooterText>
        <FooterText style={{ paddingTop: 16 }}>
          It is imbued with style and strength, resulting in affordable piece to
          furnish one's home. Reisetra has achieved a remarkable reputation in
          the manufacturing & exporting of premium quality wooden products.
        </FooterText>
        <FooterText style={{ paddingTop: 16 }}>
          We have maintained a state of the art manufacturing unit that enables
          the production of flawless products as per the buyer's specification.
          our workforce is trained to turn all ides in to reality. We constantly
          updates our products as well as the skills of workers to keep abreast
          with the latest in the international market.
        </FooterText>
        <FooterText style={{ paddingTop: 16 }}>
          Reisetra Emphasizes on Quality, Innovation, Renovation, and most
          importantly customer satisfaction. Our Professionaly qualified and
          dedicated product design team leaves no stone unturned to provide you
          quality products. In addition to this, competitive prices, large
          production capicity, committed business dealings and timely deliveries
          add to our reputation in the international market. We believe that we
          can tackle any order in quality and quantity and look forward to
          receive meaningful business quaeries from your side.
        </FooterText>
      </Row>

      <FooterImage
        style={{
          flex: 2,
          paddingLeft: 60,
          alignSelf: 'center',
          color: colors.tuscan
        }}
        src={require('../../assets/paymentsfooter.svg')}
      />
    </FooterRoot>
    <FooterRoot>
      <Row>
        <FooterHeader>Online Shopping&nbsp;</FooterHeader>
        <FooterText>
          <FooterLink href="/categories/topselling">Top Selling</FooterLink>
        </FooterText>
        <FooterText>
          <FooterLink href="/categories/new">New Arrivals</FooterLink>
        </FooterText>
        <FooterText>
          <FooterLink href="/categories/sale">For Sale</FooterLink>
        </FooterText>
        <FooterText>
          <FooterLink href="/categories/mostpopular">Most Popular</FooterLink>
        </FooterText>
      </Row>
      <Row>
        <FooterHeader>Quick Links</FooterHeader>
        <FooterText>
          <FooterLink href="/tos">Terms of Service</FooterLink>
        </FooterText>
        <FooterText>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
        </FooterText>
        <FooterText>
          <FooterLink href="/shiping">Shiping</FooterLink>
        </FooterText>
      </Row>
      <Row>
        <FooterHeader>Got any questions or Queries?&nbsp;</FooterHeader>
        <FooterText>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </FooterText>
        <FooterText>
          Send us an email to{' '}
          <FooterLink href="mailto:contact@reisetra.co">
            contact@reisetra.co
          </FooterLink>
        </FooterText>
        <FooterText>
          Or give us a call @<FooterLink>+911143538935</FooterLink>
        </FooterText>

        <FooterHeader>Keep in touch</FooterHeader>
        <ButtonContainer>
          <Button
            href="https://api.whatsapp.com/send?phone=919212222935&text=&source=&data=Hi"
            target="_blank"
          >
            <FaWhatsapp size={20} />
          </Button>
          <Button href="https://instagram.com/reise.yatra" target="_blank">
            <FaInstagram size={20} />
          </Button>
          <Button href="https://facebook.com/reisetra" target="_blank">
            <FaFacebook size={20} />
          </Button>
        </ButtonContainer>
        <FooterText
          style={{
            flex: 1,
            alignSelf: 'flex-end',
            color: colors.tuscan
          }}
        >
          © 2020 Reisetra Enterprises
        </FooterText>
      </Row>
    </FooterRoot>
  </div>
);

export default Footer;
