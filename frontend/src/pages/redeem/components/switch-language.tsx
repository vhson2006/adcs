import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languageAction } from '../../../actions/main';

const mapStateToProps = (state: any) => ({
  activedLanguage: state.language.activedLanguage,
});
const mapDispatchToProps = (dispatch: any) => ({
  changeLanguage: (params: string) => dispatch({ type: languageAction.CHANGE_LANGUAGE, value: params })
});
const SwitchLanguage = (props: any) => {
  const { activedLanguage, changeLanguage } = props;
  const swichLanguage = () => {
    if (activedLanguage === 'vi') {
      changeLanguage('en');
    } else {
      changeLanguage('vi');
    }
  }
  useEffect(() => {
    localStorage.setItem('activedLanguage', props.activedLanguage);
  }, [props.activedLanguage]);
  
  return (
    <a href="#" onClick={swichLanguage}> 
      <p className="text-white">
        <FormattedMessage id="changeLanguageMenu"/>
      </p>
    </a>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchLanguage);
