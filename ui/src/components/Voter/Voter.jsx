import React from 'react';
import './Voter.css';

const Voter = (props) => {
    return (
        <tr className="poll-voter-row">
            <td className="poll-voter-id">{props.ind}.</td>
            <td className="poll-voter-name">{props.name}</td>
            <td className="poll-voter-button">
                <span className="poll-voter-remove" onClick ={() => props.removeVoter(props.id)}>remove</span>
            </td>
        </tr>
    );
}

export default Voter;