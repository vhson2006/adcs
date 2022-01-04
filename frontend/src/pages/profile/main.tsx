import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { InputType } from '../../commons/styles/share';
import { useForm } from 'react-hook-form';
import { callPrivateJsonApi } from '../../helpers/api';
import { common, config } from '../../commons/config';
import { FormattedMessage, useIntl } from 'react-intl';
import { AddressType, EmailType, FullNameType, PhoneNumberType } from '../../commons/validation';
import './style.scss';

const ProfilePage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ message, setMessage ] = useState('');
  const intl = useIntl();
  let [loading, setLoading] = useState(false);
  const downloadQrcode = async () => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    let file = `${config.API_URL}/api/account/qrcode`;
    const token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    fetch(file, { headers })
      .then(response => response.blob())
      .then(blobby => {
        let objectUrl = window.URL.createObjectURL(blobby);

        anchor.href = objectUrl;
        anchor.download = 'qrcode.jpg';
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      });
  }

  const updateProfile =  async(data: any) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    const response = await callPrivateJsonApi('PATCH', '/api/account', data);
    if (response.status === common.INCORRECT) {
      setMessage(intl.formatMessage({ id: 'profileFailMessage' }));
    } else {
      setMessage(intl.formatMessage({ id: 'profileSuccessMessage' }));
    };
  }

  useEffect(() => {
    const initial = async () => {
      const response = await callPrivateJsonApi('GET', '/api/account', {});
      if (response.status === common.INCORRECT) {
        setMessage(intl.formatMessage({ id: 'profileInitFailMessage' }));
      } else {
        const { data } = response;
        reset({
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
        });
      };
    };
    initial();
  }, [])

  return (
    <section className="mt-5" >
      <img className="profile-title" src="/img/profile.png" width="40%" alt=""/>
       <form onSubmit={handleSubmit(updateProfile)}>
        <Table className="profile-table mt-5" role="presentation" cellPadding="0" cellSpacing="0" width="100%" 
          bordered={false} borderless={true}
        >
          <tbody>
            {
              message ? 
              <tr>
                <td align="center" height={50}>
                  <p className="text-warning">{message}</p>
                </td>
              </tr>
              : <></>
            }    
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="namePlaceholder">
                  {(msg) => <InputType type="text" {...register("name", FullNameType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.name && errors.name.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.name && errors.name.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="emailPlaceholder">
                  {(msg) => <InputType disabled type="text" {...register("email", EmailType)} placeholder={msg.toString()} />}
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
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="addressPlaceholder">
                  {(msg) => <InputType type="text" {...register("address", AddressType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.address && errors.address.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.address && errors.address.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50}>
                <FormattedMessage id="phonePlaceholder">
                  {(msg) => <InputType type="number" inputMode='numeric' {...register("phone", PhoneNumberType)} placeholder={msg.toString()} />}
                </FormattedMessage>
                {
                  errors.phone && errors.phone.type === "required" && 
                  <span className="text-danger">
                    <FormattedMessage id="requiredError"/>
                  </span>
                }
                {
                  errors.phone && errors.phone.type === "minLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
                {
                  errors.phone && errors.phone.type === "maxLength" && 
                  <span className="text-danger">
                    <FormattedMessage id="validateError"/>
                  </span>
                }
              </td>
            </tr>
            <tr>
              <td align="center" height={50} className="pt-4">
                <a role="button" onClick={downloadQrcode}>
                  <p className="text-white" style={{textDecoration: 'underline'}}><FormattedMessage id="getQrcodeLabel"/></p>
                </a>
                <a href="/redeem">
                  <p className="text-white">Back</p>
                </a>
                  <input type="image" src="/img/updatebutton.png" width="120" alt="Submit"/>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </section>
  )
}

export default ProfilePage;
