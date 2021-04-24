/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react';

import { ContainerDiv } from './components/Styles';

const YES = <>✅&nbsp;&nbsp;Yes.</>;
const NO = <>❌&nbsp;&nbsp;No.</>;

const HomeView: React.FC<{
  data?;
}> = ({ data }) => {
  return (
    <>
      <h1>Stripe Connect Demo</h1>

      <ContainerDiv>
        <button
          type="button"
          className="stripe-connect"
          onClick={() => {
            if (window) {
              const url = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${
                process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID
              }&scope=read_write&state=${Math.random() * 100}&redirect_uri=${
                process.env.NEXT_PUBLIC_BASE_URL
              }`;

              window.document.location.href = url;
            }
          }}
        >
          {data?.data?.account?.id ? (
            <span>Connected: {data?.data?.account?.display_name}</span>
          ) : (
            <span>Connect with Stripe</span>
          )}
        </button>

        {data?.req?.code?.startsWith('ac_') && (
          <>
            <br />
            <br />
            <hr />
            <br />
          </>
        )}

        {data?.data?.account?.id && (
          <>
            <div className="accountAnalysis">
              <div>
                <h3>Payouts Enabled?</h3>
                <h2>{data?.data?.account?.payouts_enabled ? YES : NO}</h2>
              </div>
              <div>
                <h3>Charges Enabled?</h3>
                <h2>{data?.data?.account?.charges_enabled ? YES : NO}</h2>
              </div>
              <div>
                <h3>Details Submitted?</h3>
                <h2>{data?.data?.account?.details_submitted ? YES : NO}</h2>
              </div>
            </div>

            <br />
            <hr />
            <br />

            <div className="allowUnlink">
              <h3>Allow Unlink?</h3>
              <p>
                When users connect their Stripe account, and if it is incomplete
                or invalid, you might want to let them unlink.
              </p>
              <h2>{data?.data?.shouldAllowUnlink ? YES : NO}</h2>
            </div>

            <br />
            <hr />
            <br />
          </>
        )}

        {data?.req?.code?.startsWith('ac_') && (
          <>
            <div className="fetchedData">
              <h3>Fetched data</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>

            <>
              <br />
              <p style={{ textAlign: 'right' }}>
                by <a href="https://kumarabhirup.me">Kumar Abhirup</a>
                <br />
                <a href="https://logrocket.io">A Logrocket Tutorial</a>
              </p>
            </>
          </>
        )}
      </ContainerDiv>
    </>
  );
};

export default HomeView;
