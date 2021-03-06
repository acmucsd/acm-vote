 import React, { useState } from 'react';
// import * as d3 from 'd3';
import PieChart from '../components/PieChart/PieChart';
import ResultRow from '../components/ResultRow/ResultRow';
import ResultAudit from '../components/ResultAudit/ResultAudit';
import '../components/PollVoteHome/PollVoteHome.css';
import './style.css';

const ViewResults = (props) => {
    const [popupVisible, setPopupVisible] = useState(false);

    const { pollTitle, pollDescription, votes, numVotes } = props;


    const colorArray = ['#E981A0', '#816DFF', '#FFD51E'];

    const orderedVotes = votes ?
        votes.sort((option1, option2) => {
            if (option1.votes > option2.votes) { return -1; }
            if (option1.votes == option2.votes) { return 0; }
            return 1;
        }) : [];

    let optionArray = [];
    let voteData = [];
    orderedVotes.forEach((option) => {
        optionArray.push(option.optionName);
        voteData.push(option.votes);
    })
    
    const votesTableContent = orderedVotes.map((option, optionInd) => {
        let percentageString = (option.votes / numVotes * 100).toFixed(2) + "%";
        return <ResultRow color={colorArray[optionInd]} optionName={option.optionName}
            percentageString={percentageString} numVotes={option.votes} />
    })

    const showAudit = () => {
        document.getElementById('view-results-content').style.filter = 'blur(10px)';
        setPopupVisible(true);
    }

    const redirectToHome = () => {
        window.location.href = "/";
    }

    return (
        <div>
            <div className="page-body vote-page-body" id="view-results-content">
                <h1>{pollTitle}</h1>
                <p className="poll-id-vote">{pollDescription}</p>
                <div id="view-results-center-content">
                    <PieChart voteData={voteData} optionArray={optionArray} colorArray={colorArray}/>
                    <table id="view-results-table">
                        <tbody>
                            {votesTableContent}
                        </tbody>
                    </table>
                    <div id="view-results-footers">
                        <p>
                            Total: <span id="num-votes">{numVotes}</span> votes
                </p>
                        <p>Winner: {orderedVotes[0].optionName}</p>
                    </div>
                    <button className="vote-buttons" id="view-results-audit-button" onClick={showAudit}>
                        View Audit
                </button>
                    <button className="vote-buttons" id="view-results-go-home-button" onClick={redirectToHome}>
                        Return Home
                </button>
                </div>
            </div>
            <ResultAudit popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
        </div>
    )
}

export default ViewResults;