import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextType } from '../../commons/styles/share';
import './style.scss';

const HandedOutPage = () => {
  return (
    <section className="mt-5">
      <img className="hand-out-title" src="/img/handedout.png" width="100%" alt=""/>
      <TextType className="mt-1 hand-out-text"><FormattedMessage id="handOutText"/></TextType>
    </section>
  )
}

export default HandedOutPage;
