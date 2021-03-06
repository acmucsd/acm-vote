import React, { useState } from 'react';
import VoteCompletePopup from '../VoteCompletePopup/VoteCompletePopup';
import RankedChoiceOption from '../RankedChoiceOption/RankedChoiceOption';
import ConfirmRankedChoicePopup from '../ConfirmRankedChoicePopup/ConfirmRankedChoicePopup';
import '../PollVoteHome/PollVoteHome.css';
import './PollVoteMain.css';
import { notification } from 'antd';

const PollVoteMain = (props) => {
    const { pollTitle, pollDescription, pollOptions, deadline, pollType, setCurrPage } = props;
    const [selection, setSelection] = useState(-1);
    const [popupVisible, setPopupVisible] = useState(false);
    const [availableOptions, setAvailableOptions] =
        useState(
            [
                {
                    id: -1,
                    optionName: "Please Select an Option",
                    description: "",
                    votes: -1
                },
                ...pollOptions
            ]
        );
    const [choices, setChoices] = useState(Array(pollOptions.length).fill(-1));
    const [confirmationVisible, setConfirmationVisible] = useState(false);


    /* Check the deadline again, and check whether the user selected an option */
    const submitVote = () => {
        const currDate = new Date();
        const deadlineDate = new Date(deadline);
        if (currDate > deadlineDate) {
            notification.open({
                key: "poll-expired-on-submit",
                message: "Unable to Vote",
                description: "The deadline to vote has passed. Click this notification to go back to home page!",
                onClick: () => {
                    notification.close("poll-expired-on-submit");
                    setCurrPage(0);
                }
            });
        }
        else {
            if (pollType == "multiple-choice") {
                if (selection == -1) { alert("Please select an option"); }
                else {
                    document.getElementById('vote-main-body').style.filter = 'blur(10px)';
                    setPopupVisible(true);
                }
            }

            else if (pollType == "ranked-choice") {
                console.log(choices);
                if (choices.some((choice) => choice < 0)) {
                    notification.open({
                        key: "not-all-fields-selected",
                        message: "Unable to vote",
                        description: "Please select an option for every line"
                    })
                }
                else { 
                    notification.close("not-all-fields-selected"); 
                    document.getElementById('vote-main-body').style.filter = 'blur(10px)';
                    setConfirmationVisible(true); 
                }
            }
        }
    }

    /* The vote section for multiple choice questions */
    const multipleChoiceField = pollOptions.map((option, optionInd) => {
        const optionId = "option" + optionInd;
        return (
            <div className="vote-option-box">
                <label for={optionId}>{option.optionName}</label>
                <input type="radio" name="pollOption" id={optionId} onClick={() => setSelection(optionInd)} />
            </div>
        );
    })

    /* The vote section for ranked choice questions */
    const rankedChoiceField = pollOptions.map((option, optionInd) => {
        return (
            <div className="ranked-choice-option">
                <span>{optionInd + 1}. </span>
                <RankedChoiceOption id={optionInd} choices={choices} setChoices={setChoices}
                    availableOptions={availableOptions} setAvailableOptions={setAvailableOptions} />
            </div>
        )
    })

    /* The mapping between poll types and their corrersponding vote section */
    const voteSectionMapping = {
        "multiple-choice": multipleChoiceField,
        "ranked-choice": rankedChoiceField
    }

    const optionsSection = pollOptions ? voteSectionMapping[pollType] : <div></div>

    return (
        <div className="page-body vote-page-body">
            <div id="vote-main-body">
                <h1>{pollTitle}</h1>
                <p id="poll-vote-main-description">{pollDescription}</p>
                {optionsSection}
                <p id="poll-vote-main-footer">Please check your vote carefully before submitting</p>
                <div className="vote-buttons-container">
                    <button className="vote-buttons" id="vote-submit-button" onClick={submitVote}>Vote</button>
                </div>
            </div>
            <VoteCompletePopup visible={popupVisible} />
            <ConfirmRankedChoicePopup confirmationVisible={confirmationVisible} setConfirmationVisible={setConfirmationVisible}
                setPopupVisible={setPopupVisible} choices={choices} pollOptions={pollOptions} 
                deadline={deadline} setCurrPage={setCurrPage} />
        </div>
    )
}
export default PollVoteMain;
