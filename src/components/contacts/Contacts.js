import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Contact from './Contact';

import {getContacts} from '../../actions/contactActions';

const contacts = (props) => {

    useEffect(() => {
        props.getContacts();
    }, []);

    const {contacts} = props;
    return (
        <React.Fragment>
            <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
            </h1>
            {contacts.map(contact => (
                <Contact key={contact.id} contact={contact}/>
            ))}
        </React.Fragment>
    );
};

contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contacts: state.contact.contacts
});

export default connect(
    mapStateToProps,
    {getContacts}
)(contacts);
