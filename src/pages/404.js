import React from 'react';
import { Heading, Text, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => (
  <TextContainer>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Heading>Whoops - That Page Doesn’t Exist (404)</Heading>
      <Text>
        Looks like the page you requested either doesn’t exist or has been
        moved. If you think this is an error or ended up at this page by
        following a link, please <a href="/contact">contact</a> to let us know.
      </Text>
      <Text>
        {' '}
        <a href="/">Reisetra Store Home page</a>{' '}
        <a href="/contact">Contact Us!</a>{' '}
      </Text>
    </div>
  </TextContainer>
);

export default NotFoundPage;
