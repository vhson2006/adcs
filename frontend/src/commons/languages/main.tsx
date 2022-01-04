import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import RouterComponent from '../routes/main';
import vi from './vi/main';
import en from './en/main';

const mapStateToProps = (state: any) => ({
  activedLanguage: state.language.activedLanguage,
});

const LanguagesComponent = (props: any) => {
  const messages = { vi, en };
  const { activedLanguage } = props;
  const getLanguage = () => {
    if (activedLanguage === 'vi') {
      return messages.vi;
    }
    return messages.en;
  }
  
  return (
    <IntlProvider messages={getLanguage()} locale={activedLanguage} defaultLocale="en">
      <RouterComponent/>
    </IntlProvider>
  );
};

export default connect(mapStateToProps, null)(LanguagesComponent);
