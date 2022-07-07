import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ProvideService } from '../../../service';

function CustomModal({ className, title, message, inputs, select, buttons, onOk, onClose, errorMessage, setErrorMessage, editValues, fetchProducts, ...props }) {

    const dispatch = useDispatch();
    const initialValues = {
        baseURL: '',
        fromName: '',
        username: '',
        password: '',
        vendorCode: '',
        apiKey: '',
        secretKey: '',
        accountSID: '',
        authToken: '',
    }

    const [providerID, setOptionValue] = useState("");
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (editValues) {
            setValues({ ...editValues });
            setOptionValue(editValues.providerID);
        }
    }, [editValues])

    const handleClose = () => {
        setErrorMessage(null);
        onClose();
        setValues(initialValues);
        setOptionValue("");
        
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleChange = (e) => {
        setOptionValue(e.target.value)
    }

    const handleSetProvider = async () => {
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            if (editValues) {
                const data = await ProvideService.editProvider(editValues.id, providerID, values);
                setValues("");
                setOptionValue("");
                console.log(data);
            } else {
                console.log("handleSetProvider: ", values);
                const data = await ProvideService.setProvider(providerID, values);
                // dispatch({ type: "SET_PROVIDER", payload: data.data.partnerProviders });
                console.log(data);
            }
            fetchProducts();
            handleClose();
            setValues(initialValues);
        } catch (error) {  // validation needded PROVIDER_ID edit && create --- Loading status
            console.log(error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    };

    return (
        <Modal
            {...props}
            onHide={handleClose}
            show={onOk}
            dialogClassName={className}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {select && !errorMessage && (
                    <>
                        <Form.Select aria-label="Default select example" value={providerID} onChange={handleChange}>
                            <option>Open this select menu (Provider Enums)</option>
                            {select.map((item, index) => {
                                const { option, value } = item;
                                return (
                                    <option value={value} key={index}>{option}</option>
                                )
                            })}
                        </Form.Select>
                    </>
                )}
                
                {!errorMessage && inputs.map((input, index) => {
                    const { label, type } = input;
                    return (
                        <Form.Group className="mb-3" controlId="formBasicEmail" key={index}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control type={type} placeholder={label} name={label} value={values[label]} onChange={handleInput} />
                        </Form.Group>
                    )
                })}
                {errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"primary"} onClick={handleClose}>{"Close"}</Button>
                {!errorMessage && (
                <Button variant={"light"} onClick={handleSetProvider}>{"Submit"}</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;