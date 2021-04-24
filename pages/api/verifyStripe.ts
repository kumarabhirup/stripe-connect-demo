import { NextApiHandler } from 'next';

import handleErrors from '@/api/middlewares/handleErrors';
import createError from '@/api/utils/createError';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
  const body = req.body;

  switch (req.method) {
    case 'POST':
      const result = await stripe.oauth
        .token({
          grant_type: 'authorization_code',
          code: body?.code,
        })
        .catch((err: unknown) => {
          throw createError(400, `${(err as any)?.message}`);
        });

      const account = await stripe.accounts
        ?.retrieve(result?.stripe_user_id)
        ?.catch((err: unknown) => {
          throw createError(400, `${(err as any)?.message}`);
        });

      const accountAnalysis = {
        hasConnectedAccount: !!account?.id,
        accountId: account?.id,
        hasCompletedProcess: account?.details_submitted,
        isValid: account?.charges_enabled && account?.payouts_enabled,
        displayName:
          account?.settings?.dashboard?.display_name ||
          account?.display_name ||
          null,
        country: account?.country,
        currency: account?.default_currency,
      };

      const shouldAllowUnlink =
        accountAnalysis?.hasConnectedAccount &&
        (!accountAnalysis?.isValid ||
          !accountAnalysis?.hasCompletedProcess ||
          !accountAnalysis?.displayName);

      res
        .status(200)
        .json({ account, oauth: result, accountAnalysis, shouldAllowUnlink });
      break;

    default:
      throw createError(405, 'Method Not Allowed');
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default handleErrors(handler);
