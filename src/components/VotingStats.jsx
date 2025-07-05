import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 1rem;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const VotingStats = ({ proposals }) => {
  const totalProposals = proposals.length;
  const activeProposals = proposals.filter(p => new Date() < new Date(p.endDate)).length;
  const completedProposals = totalProposals - activeProposals;
  const totalVotes = proposals.reduce((sum, p) => sum + p.yesVotes + p.noVotes, 0);

  return (
    <div>
      <StatsContainer>
        <StatCard>
          <StatValue>{totalProposals}</StatValue>
          <StatLabel>Total Proposals</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{activeProposals}</StatValue>
          <StatLabel>Active Proposals</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{completedProposals}</StatValue>
          <StatLabel>Completed Proposals</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{totalVotes}</StatValue>
          <StatLabel>Total Votes Cast</StatLabel>
        </StatCard>
      </StatsContainer>

      <ChartContainer>
        <h3 style={{ color: '#00d4ff', marginBottom: '20px' }}>Voting Activity</h3>
        <p style={{ color: '#ccc' }}>
          Detailed voting statistics and charts will be displayed here.
        </p>
      </ChartContainer>
    </div>
  );
};

export default VotingStats;