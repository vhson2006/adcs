import React from 'react';
import { FormattedMessage } from 'react-intl';

const RedeemData = () => {
  return (
    <a href="/redeem-report"> 
      <p className="text-white">
        <FormattedMessage id="redeemMenu"/>
      </p>
    </a>
  )
}

export default RedeemData;