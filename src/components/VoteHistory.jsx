import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const HistoryList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const VoteCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VoteInfo = styled.div`
  flex: 1;
`;

const ProposalTitle = styled.h4`
  color: #00d4ff;
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const VoteDetails = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const VoteBadge = styled.span`
  background: ${props => props.vote === 'yes' ? '#00ff88' : '#ff4444'};
  color: #000;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const VoteHistory = ({ votes }) => {
  if (!votes || votes.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
        No voting history found.
      </div>
    );
  }

  return (
    <HistoryList>
      {votes.map(vote => (
        <VoteCard key={vote.id}>
          <VoteInfo>
            <ProposalTitle>{vote.proposalTitle}</ProposalTitle>
            <VoteDetails>
              Voted on {format(new Date(vote.votedAt), 'MMM dd, yyyy HH:mm')}
            </VoteDetails>
          </VoteInfo>
          <VoteBadge vote={vote.vote}>
            {vote.vote.toUpperCase()}
          </VoteBadge>
        </VoteCard>
      ))}
    </HistoryList>
  );
};

export default VoteHistory;