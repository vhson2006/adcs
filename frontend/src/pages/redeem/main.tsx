import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputType } from '../../commons/styles/share';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { callPrivateJsonApi } from '../../helpers/api';
import { codeStatus, common } from '../../commons/config';
import './style.scss';
import { RedeemCodeType } from '../../commons/validation';

const RedeemPage = () => {
  const history = useHistory();
  const intl = useIntl();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ message, setMessage ] = useState('');
  const onLogout = async () => {
    const response = await callPrivateJsonApi('PATCH', '/api/auth/logout', {});
    if (response.status === common.INCORRECT ) {
      setMessage(intl.formatMessage({ id: 'logoutFailMessage' }));
    } else {
      localStorage.removeItem('token');
      setTimeout(() => {
        history.push('/');
      }, 200);
    }
    return false;
  }
  
  const onRedeem = async (data: any) => {
    const response = await callPrivateJsonApi('POST', '/api/redeem/claim', data);
    if (response.status === common.INCORRECT) {
      setMessage(intl.formatMessage({ id: 'claimFailMessage' }));
    } else {
      switch (response.status) {
        case codeStatus.PROCESS_STATUS:
          setMessage(intl.formatMessage({ id: 'claimSuccessMessage' }));
          break;
        case codeStatus.LIMIT_STATUS:
          setTimeout(() => {
            history.push('/handed-out');
          }, 200);
          break;
        default:
          break;
      }
    }
  }
  
  return (
    <section className="my-5">
      <img className="redeem-title" src="/img/insertcustomercodehere.png" width="100%" alt=""/>
      <form onSubmit={handleSubmit(onRedeem)}>
        <Table className="redeem-table mt-1" role="presentation" cellPadding="0" cellSpacing="0" width="100%" bordered={false} borderless={true}>
          <tbody>
            <tr>
              <td>
                <p className={message === intl.formatMessage({id: 'claimSuccessMessage'}) ? "text-success" : "text-danger"}>{message}</p>
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="claimPlaceholder">
                  {(msg) => <InputType type="text" {...register("redeemCode", RedeemCodeType)} placeholder={msg.toString()}/>}
                </FormattedMessage>
                {
                  errors.redeemCode && errors.redeemCode.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.redeemCode && errors.redeemCode.type === "minLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.redeemCode && errors.redeemCode.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50} className="pt-2">
                <a href="/profile">
                  <p className="text-white">
                    <FormattedMessage id="profileMenu"/>
                  </p>
                </a>
                <a href="/redeem-report">
                  <p className="text-white">
                    Redeem Report
                  </p>
                </a>
                <a href="#" onClick={onLogout}> 
                  <p className="text-white">
                    <FormattedMessage id="logoutMenu"/>
                  </p>
                </a>
                <input type="image" src="/img/sendbutton.jpg" width="120" alt="Submit"/>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </section>
  )
}

export default RedeemPage;
