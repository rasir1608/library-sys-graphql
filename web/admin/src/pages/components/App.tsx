import React from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
query {
  userRecoders(user:{name:"1"}){userId,userName,bookId,bookName}
}
`;

function ExchangeRates() {
  const [getUserRecoders, { loading, error, data, refetch }] = useLazyQuery(EXCHANGE_RATES, {
    // pollInterval: 1000,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network"

  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error.toString()})</p>;
  return <><button onClick={() => getUserRecoders()}>调用</button>{data?.userRecoders.map(({ userId, userName, bookId, bookName }: any, index: number) => (
    <div key={index}>
      <span>
        userId: {userId}
      </span>
      <span>
        userName: {userName}
      </span>
      <span>
        bookId: {bookId}
      </span>
      <span>
        bookName: {bookName}
      </span>
    </div>
  ))}</>;
}

export default ExchangeRates;
