import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputType, TextType } from '../../commons/styles/share';
import { callJsonApi } from '../../helpers/api';
import { codeStatus, common } from '../../commons/config';
import { AgreementType, FirstNameType, LastNameType, PhoneNumberType } from '../../commons/validation';
import './style.scss';

const RefereePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({criteriaMode: 'all'});
  const { code }: any = useParams();
  const intl = useIntl();
  const history = useHistory();
  const [ message, setMessage ] = useState('');

  const onReferee = async (data: any) => {
    const { confirm, consent, ...inviteData } = data;
    const response = await callJsonApi(
      'POST',
      '/api/redeem/invite',
      {...inviteData, code: code }
    );
    if (response.status === common.INCORRECT) {
      setMessage(intl.formatMessage({ id: 'inviteFailMessage' }));
    } else {
      setTimeout(() => {
        history.push(`/referee-success`);
      }, 200);
    }
  }

  useEffect(() => {
    const initial = async () => {
      const response = await callJsonApi('GET', `/api/account/${code}`, {});
      if (response.status === common.INCORRECT) {
        setTimeout(() => {
          history.push('/error');
        }, 200)
      } else {
        switch(response.status) {
          case codeStatus.LIMIT_STATUS:
            setMessage(intl.formatMessage({ id: 'reachOutMessage' }));
            break;
          case codeStatus.PROCESS_STATUS:
          default:
            break;
        }
      }
    }
    initial();
  }, []);

  return (
    <>
      <img className="referee-title" src="/img/invite.png" width="80%" alt=""/>
      <TextType className="mt-2"><FormattedMessage id="refereeText"/></TextType>
      <form onSubmit={handleSubmit(onReferee)} className="referee-form">
        <Table className="referee-table mt-4" role="presentation" cellPadding="0" cellSpacing="0" width="100%" 
          bordered={false} borderless={true}
        >
          <tbody>
            <tr>
              <td align="left" className="text-danger">
                <strong>{message}</strong>
              </td>
            </tr>
            <tr>
              <td align="left" height={50} className="text-white">
                <strong className="referee-header"><FormattedMessage id="fromSectionTitle"/></strong>
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="firstNamePlaceholder">
                  {(msg) => <InputType type="text" {...register('fromFirstName', FirstNameType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.fromFirstName && errors.fromFirstName.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.fromFirstName && errors.fromFirstName.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.fromFirstName && errors.fromFirstName.type === "pattern" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="lastNamePlacholder">
                  {(msg) => <InputType type="text" {...register('fromLastName', LastNameType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.fromLastName && errors.fromLastName.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.fromLastName && errors.fromLastName.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.fromLastName && errors.fromLastName.type === "pattern" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="left" height={50} className="text-white">
                <strong className="referee-header"><FormattedMessage id="toSectionTitle"/></strong>
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="firstNamePlaceholder">
                  {(msg) => <InputType type="text" {...register('toFirstName', FirstNameType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.toFirstName && errors.toFirstName.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.toFirstName && errors.toFirstName.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.toFirstName && errors.toFirstName.type === "pattern" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="lastNamePlacholder">
                  {(msg) => <InputType type="text" {...register('toLastName', LastNameType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.toLastName && errors.toLastName.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.toLastName && errors.toLastName.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.toLastName && errors.toLastName.type === "pattern" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="phonePlaceholder">
                  {(msg) => <InputType type="number" inputMode="numeric" {...register('toPhone', PhoneNumberType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.toPhone && errors.toPhone.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.toPhone && errors.toPhone.type === "minLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.toPhone && errors.toPhone.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="left" height={50} className="pt-4">
                <input className="myinput" type="checkbox" {...register('confirm', AgreementType)} />
                <label>
                  <span>
                    <a className="text-white" href="/document.pdf" target="_blank">
                      <FormattedMessage id="refereeTerm"/>
                    </a>
                  </span>
                </label>
              </td>
            </tr>
            {
              (errors && errors.confirm) ? 
              <tr>
                <td align="left" height={50}>
                  <span className="text-danger"><FormattedMessage id="refereeTermMessage"/></span> 
                </td>
              </tr>
              : <></>
            }
            <tr>
              <td align="left" height={50} className="pt-1">
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <input className="myinput" type="checkbox" {...register('consent', AgreementType)} />
                <label>
                  <span className="text-white"> <FormattedMessage id="refereeConsent"/></span>
                </label>
                </div>
              </td>
            </tr>
            {
              (errors && errors.consent) ? 
              <tr>
                <td align="left" height={50}>
                  <span className="text-danger"><FormattedMessage id="refereeTermMessage"/></span> 
                </td>
              </tr>
              : <></>
            }
            <tr>
              <td align="center" height={50}>
                <input type="image" src="/img/invitebutton.png" width="100%" alt="Submit" disabled={ message !== '' ? true : false }/>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </>
  )
}

export default RefereePage;
