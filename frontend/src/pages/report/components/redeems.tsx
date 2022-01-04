import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { FormattedMessage, FormattedDate, FormattedTime, useIntl } from 'react-intl';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import { editRedeemAction, redeemAction } from '../../../actions/main';
import { redeemStatus, PAGE_SIZE, FIRST_PAGE } from '../../../commons/config';

const mapStateToProps = (state: any) => ({
  redeems: state.redeem.data,
});
const mapDispatchToProps = (dispatch: any) => ({
  getRedeems: (params: any) => dispatch({ type: redeemAction.SAGA_GET_REDEEMS, value: params }),
  deleteRedeem: (params: any) => dispatch({ type: redeemAction.SAGA_REMOVE_REDEEM, value: params }),
  editRedeem: (params: any) => dispatch({ type: editRedeemAction.OPEN_MODAL, value: params }),
});

const RedeemsComponent = (props: any) => {
  const { redeems, getRedeems, editRedeem, deleteRedeem } = props;
  const intl = useIntl();
  useEffect(() => {
    getRedeems({ search: '', page: FIRST_PAGE, size: PAGE_SIZE });
  }, []);
  const formatStatus = (status: number) => {
    return status === redeemStatus.ACTIVE 
      ? intl.formatMessage({ id: 'activeStatus' }) 
      : intl.formatMessage({ id: 'waitingStatus' });
  };
  const editRedeemHandler = (redeem: any) => {
    editRedeem(redeem);
  };
  const deleteRedeemHandler = (id: string) => {
    deleteRedeem({ id: id });
  };
  
  return (
    <Table className="mt-4" striped bordered hover>
      <thead>
        <tr>
          <th><FormattedMessage id="fromFirstNameHeader"/></th>
          <th><FormattedMessage id="fromLastNameHeader"/></th>
          <th><FormattedMessage id="toFirstNameHeader"/></th>
          <th><FormattedMessage id="toLastNameHeader"/></th>
          <th><FormattedMessage id="toPhoneNumberHeader"/></th>
          <th><FormattedMessage id="redeemCodeHeader"/></th>
          <th><FormattedMessage id="statusHeader"/></th>
          <th><FormattedMessage id="inviteTimeHeader"/></th>
          <th><FormattedMessage id="actionsHeader"/></th>
        </tr>
      </thead>
      <tbody>
        {
          redeems
            .map((redeem: any) => (
              <tr key={redeem.id}>
                <td>{redeem.fromFirstName}</td>
                <td>{redeem.fromLastName}</td>
                <td>{redeem.toFirstName}</td>
                <td>{redeem.toLastName}</td>
                <td>{redeem.toPhone}</td>
                <td>{redeem.redeemCode}</td>
                <td>{formatStatus(redeem.status)}</td>
                <td>
                  <FormattedDate 
                    value={redeem.created}
                    year="numeric"
                    month="long"
                    day="numeric"
                    weekday="long"/>&nbsp;-&nbsp;
                  <FormattedTime value={redeem.created} />
                </td>
                <td>
                  <BsPencilSquare onClick={() => editRedeemHandler(redeem)}/>
                  <BsFillTrashFill onClick={() => deleteRedeemHandler(redeem.id)}/>
                </td>
              </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RedeemsComponent);
