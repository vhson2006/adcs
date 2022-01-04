import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputType, TextType } from '../../commons/styles/share';
import { callJsonApi } from '../../helpers/api';
import { common } from '../../commons/config';
import { EmailType, PasswordType } from '../../commons/validation';
import './style.scss';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const intl = useIntl();
  const [ message, setMessage ] = useState('');
  const onLogin = async (data: any) => {
    const response = await callJsonApi('PATCH', '/api/auth/login', data);
    if (response.status === common.INCORRECT) {
      setMessage(intl.formatMessage({ id: 'loginFailMessage' }));
    } else {
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      setTimeout(() => {
        history.push('/redeem');
      }, 200);
    }
  }
  return (
    <section className="mt-5">
      <img className="login-title" src="/img/login.png" width="100%" alt=""/>
      <TextType className="login-header mt-1"><FormattedMessage id="loginText"/></TextType>
      <form onSubmit={handleSubmit(onLogin)}>
        <Table className="login-table mt-4" role="presentation" cellPadding="0" cellSpacing="0" width="100%" 
          bordered={false} borderless={true}
        >
          <tbody>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="emailPlaceholder">
                  {(msg) => <InputType type="text" {...register("email", EmailType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.email && errors.email.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.email && errors.email.type === "minLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
              <td align="center" height={50}>
                <FormattedMessage id="passwordPlaceholder">
                  {(msg) => <InputType type="password" {...register("password", PasswordType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.password && errors.password.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.password && errors.password.type === "minLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="left" >
                <p className="text-danger">{message}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center" height={50} >
                {/* <a href="/forgot-password">
                  <p className="text-white"> <FormattedMessage id="forgotPasswordLabel"/></p>
                </a> */}
                <input type="image" src="/img/loginbutton.png" width="120" alt="Submit"/>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </section>
  )
}

export default LoginPage;
