import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { redeemAction, editRedeemAction } from '../../../actions/main';

const mapStateToProps = (state: any) => ({
  modalFlag: state.editRedeem.modalFlag,
  redeem: state.editRedeem.redeem,
});
const mapDispatchToProps = (dispatch: any) => ({
  closeModal: () => dispatch({ type: editRedeemAction.CLOSE_MODAL, value: null }),
  updateRedeem: (params: any) => dispatch({ type: redeemAction.SAGA_UPDATE_REDEEM, value: params }),
});

const EditRedeemComponent = (props: any) => {
  const { redeem, modalFlag, closeModal, updateRedeem } = props;
  const { handleSubmit, register } = useForm();
  const submitUserHandler = (data: any) => {
    updateRedeem(data);
    closeModal();
  };

  return (
    <Modal show={modalFlag} onHide={closeModal}>
      <Form onSubmit={ handleSubmit(submitUserHandler) }>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="editRedeemTitle"/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control 
            type="hidden" 
            id="id" 
            {...register('id')} 
            defaultValue={redeem.id}
          />
          <Form.Control 
            type="hidden" 
            id="created" 
            {...register('created')} 
            defaultValue={redeem.created}
          />
          <Form.Control 
            type="hidden" 
            id="redeemCode" 
            {...register('redeemCode')} 
            defaultValue={redeem.redeemCode}
          />
          <Form.Text className="my-2">
            <FormattedMessage id="fromSectionTitle"/>
          </Form.Text>
          <Form.Group as={Row} className="my-2">
            <label htmlFor="fromFirstName" className="col-md-4 col-form-label text-md-right">
              <FormattedMessage id="firstNamePlaceholder"/>
            </label>
            <Col md={6}>
              <Form.Control 
                type="text" 
                id="fromFirstName" 
                {...register('fromFirstName')} 
                defaultValue={redeem.fromFirstName}
              />        
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-2">
            <label htmlFor="fromLastName" className="col-md-4 col-form-label text-md-right">
              <FormattedMessage id="lastNamePlacholder"/>
            </label>
            <Col md={6}>
              <Form.Control 
                type="text" 
                id="fromLastName" 
                {...register('fromLastName')} 
                defaultValue={redeem.fromLastName}
              />
            </Col>
          </Form.Group>
          <Form.Text className="my-2">
            <FormattedMessage id="toSectionTitle"/>
          </Form.Text>
          <Form.Group as={Row} className="my-2">
            <label htmlFor="toFirstName" className="col-md-4 col-form-label text-md-right">
              <FormattedMessage id="firstNamePlaceholder"/>
            </label>
            <Col md={6}>
              <Form.Control 
                type="text" 
                id="toFirstName" 
                {...register('toFirstName')} 
                defaultValue={redeem.toFirstName}
              />        
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-2">
            <label htmlFor="toLastName" className="col-md-4 col-form-label text-md-right">
              <FormattedMessage id="lastNamePlacholder"/>
            </label>
            <Col md={6}>
              <Form.Control 
                type="text" 
                id="toLastName" 
                {...register('toLastName')} 
                defaultValue={redeem.toLastName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-2">
            <label htmlFor="toPhone" className="col-md-4 col-form-label text-md-right">
              <FormattedMessage id="phonePlaceholder"/>
            </label>
            <Col md={6}>
              <Form.Control 
                type="number" 
                id="toPhone" 
                {...register('toPhone')} 
                defaultValue={redeem.toPhone}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            <FormattedMessage id="closeButton"/>
          </Button>
          <Button variant="primary" type="submit" className="text-white">
            <FormattedMessage id="saveButton"/>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRedeemComponent);
