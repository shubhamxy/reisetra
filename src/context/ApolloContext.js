export const isBrowser = typeof window !== 'undefined';

export const client = isBrowser ? {} : {};
// ? new ApolloClient({
//     uri: `${process.env.API_DOMAIN}/graphql`,
//     request: operation => {
//       operation.setContext({
//         headers: {
//           authorization: `Bearer ${getAccessToken()}`
//         }
//       });
//     }
//   })
// : {};
