import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const ProposalCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }
`;

const ProposalTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.4rem;
  margin-bottom: 12px;
  font-weight: 500;
`;

const ProposalDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ProposalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #999;
`;

const VoteSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const VoteButton = styled.button`
  background: ${props => props.variant === 'yes' ? '#00ff88' : '#ff4444'};
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const VoteCount = styled.span`
  color: #00d4ff;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 15px 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00d4ff);
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
`;

const ProposalList = ({ proposals, onVote }) => {
  const calculateVotePercentage = (yesVotes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return (yesVotes / totalVotes) * 100;
  };

  return (
    <div>
      {proposals.map(proposal => {
        const totalVotes = proposal.yesVotes + proposal.noVotes;
        const yesPercentage = calculateVotePercentage(proposal.yesVotes, totalVotes);
        
        return (
          <ProposalCard key={proposal.id}>
            <ProposalTitle>{proposal.title}</ProposalTitle>
            <ProposalDescription>{proposal.description}</ProposalDescription>
            
            <ProposalMeta>
              <span>Created: {format(new Date(proposal.createdAt), 'MMM dd, yyyy')}</span>
              <span>Ends: {format(new Date(proposal.endDate), 'MMM dd, yyyy')}</span>
            </ProposalMeta>
            
            <ProgressBar>
              <ProgressFill percentage={yesPercentage} />
            </ProgressBar>
            
            <VoteSection>
              <VoteButton 
                variant="yes" 
                onClick={() => onVote(proposal.id, 'yes')}
                disabled={proposal.hasVoted || new Date() > new Date(proposal.endDate)}
              >
                Yes
              </VoteButton>
              <VoteButton 
                variant="no" 
                onClick={() => onVote(proposal.id, 'no')}
                disabled={proposal.hasVoted || new Date() > new Date(proposal.endDate)}
              >
                No
              </VoteButton>
              <VoteCount>
                {proposal.yesVotes} Yes / {proposal.noVotes} No
              </VoteCount>
            </VoteSection>
          </ProposalCard>
        );
      })}
    </div>
  );
};

export default ProposalList;