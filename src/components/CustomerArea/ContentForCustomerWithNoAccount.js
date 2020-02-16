import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';

import UserContext from '../../context/UserContext';
import Loading from './Loading';
import Error from './Error';
import CreateAccountForm from './CreateAccountForm';
import { Heading, Lede, Text } from './AreaTypography';
import { animations } from '../../utils/styles';

const CREATE_CONTRIBUTOR = gql`
  mutation($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      email
      github {
        username
        customerCount
        pullRequests {
          id
        }
      }
      shopify {
        id
        codes {
          code
          used
        }
      }
    }
  }
`;

const ContentForCustomerWithNoAccountRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const ContentForCustomerWithNoAccount = () => (
  <UserContext.Consumer>
    {({ customer, profile, updateCustomer }) => (
      <ContentForCustomerWithNoAccountRoot>
        <Mutation
          mutation={CREATE_CONTRIBUTOR}
          onCompleted={data => updateCustomer(data.createCustomer)}
        >
          {(createCustomer, { loading, error, data }) => {
            if (error) return <Error error={error.message} />;
            if (loading) return <Loading />;

            return (
              <>
                <Heading>
                  You’re the best <strong>@{profile.nickname}</strong>!
                </Heading>
                <Lede>
                  You’ve made <strong>{customer.github.customerCount}</strong>{' '}
                  customers to Gatsby. 💪💜
                </Lede>
                <Text>
                  Thanks for making Gatsby great! As a token of our
                  appreciation, you are eligible to claim some free Reisetra
                  craft!
                </Text>
                <CreateAccountForm
                  profile={profile}
                  onSubmit={userData => async e => {
                    e.preventDefault();
                    createCustomer({
                      variables: {
                        input: {
                          githubUsername: userData.username,
                          email: userData.email,
                          firstName: userData.first_name,
                          acceptsMarketing: userData.subscribe
                        }
                      }
                    });
                  }}
                />
              </>
            );
          }}
        </Mutation>
      </ContentForCustomerWithNoAccountRoot>
    )}
  </UserContext.Consumer>
);

export default ContentForCustomerWithNoAccount;
