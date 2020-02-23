import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {deleteContact} from '../../actions/contactActions';

const contact = (props) => {
    const [showContactInfo, setShowContactInfo] = useState(false);

    const onDeleteClick = id => {
        props.deleteContact(id);
    };

    const {id, name, email, phone} = props.contact;

    return (
        <div className="card card-body mb-3">
            <h4>
                {name}{' '}
                <i
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="fas fa-sort-down"
                    style={{cursor: 'pointer'}}
                />
                <i
                    className="fas fa-times"
                    style={{cursor: 'pointer', float: 'right', color: 'red'}}
                    onClick={onDeleteClick.bind(this, id)}
                />
                <Link to={`contact/edit/${id}`}>
                    <i
                        className="fas fa-pencil-alt"
                        style={{
                            cursor: 'pointer',
                            float: 'right',
                            color: 'black',
                            marginRight: '1rem'
                        }}
                    />
                </Link>
            </h4>
            {showContactInfo ? (
                <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                </ul>
            ) : null}
        </div>
    );
};

contact.propTypes = {
    contact: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired
};

export default connect(
    null,
    {deleteContact}
)(contact);
