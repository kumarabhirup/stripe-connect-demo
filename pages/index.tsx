import React from 'react';
import fetch from 'isomorphic-unfetch';

import HomeView from '@/views/Home';

const Home: React.FC<{
  data?: Record<string, unknown>;
  req: Record<string, unknown>;
}> = (props) => {
  return <HomeView data={props} />;
};

export const getServerSideProps = async ({
  req,
}: {
  req: { __NEXT_INIT_QUERY: any };
}) => {
  const body = req?.__NEXT_INIT_QUERY;

  if (!body?.code) {
    return { props: { data: null, req: body } };
  }

  let response;
  try {
    response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/verifyStripe',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.json());
  } catch (error) {
    return { props: { data: { error }, req: body } };
  }

  return { props: { data: response, req: body } };
};

export default Home;
