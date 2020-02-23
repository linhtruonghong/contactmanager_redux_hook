import React, {useState, useEffect} from 'react';
import TextInputGroup from '../layout/TextInputGroup';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getContact, updateContact} from '../../actions/contactActions';

const editContact = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const {id} = props.match.params;
        props.getContact(id);
    });

    useEffect(() => {
        setName(props.contact.name);
    }, [name]);

    useEffect(() => {
        setEmail(props.contact.email);
    }, [email]);

    useEffect(() => {
        setPhone(props.contact.phone);
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        // Check For Errors
        if (name === '') {
            setErrors({name: 'Name is required'});
            return;
        }

        if (email === '') {
            setErrors({email: 'Name is required'});
            return;
        }

        if (phone === '') {
            setErrors({phone: 'Name is required'});
            return;
        }

        const {id} = props.match.params;

        const updContact = {
            id,
            name,
            email,
            phone
        };

        props.updateContact(updContact);

        // Clear State
        setName('');
        setEmail('');
        setPhone('');
        setErrors({});

        props.history.push('/');
    };

    console.log(name);

    return (
        <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <TextInputGroup
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        error={errors.name}
                    />
                    <TextInputGroup
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        error={errors.email}
                    />
                    <TextInputGroup
                        label="Phone"
                        name="phone"
                        placeholder="Enter Phone"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                        error={errors.phone}
                    />
                    <input
                        type="submit"
                        value="Update Contact"
                        className="btn btn-light btn-block"
                    />
                </form>
            </div>
        </div>
    );
};

editContact.propTypes = {
    contact: PropTypes.object.isRequired,
    getContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact.contact
});

export default connect(
    mapStateToProps,
    {getContact, updateContact}
)(editContact);
