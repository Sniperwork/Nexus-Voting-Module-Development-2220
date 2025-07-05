import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchProposals, fetchUserVotes, castVote, createProposal } from '../actions/votingActions.js';
import ProposalList from './ProposalList.jsx';
import VoteHistory from './VoteHistory.jsx';
import CreateProposal from './CreateProposal.jsx';
import VotingStats from './VotingStats.jsx';

const Container = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  min-height: 100vh;
  color: #ffffff;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  color: #00d4ff;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  background: ${props => props.active ? '#00d4ff' : 'transparent'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: 2px solid #00d4ff;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00b8e6' : '#00d4ff'};
    color: #000;
  }
`;

const ContentArea = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const VotingModule = () => {
  const dispatch = useDispatch();
  const { proposals, userVotes, loading, error } = useSelector(state => state.voting);
  const [activeTab, setActiveTab] = useState('proposals');

  useEffect(() => {
    dispatch(fetchProposals());
    dispatch(fetchUserVotes());
  }, [dispatch]);

  const handleVote = (proposalId, vote) => {
    dispatch(castVote(proposalId, vote));
  };

  const handleCreateProposal = (proposalData) => {
    dispatch(createProposal(proposalData));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'proposals':
        return <ProposalList proposals={proposals} onVote={handleVote} />;
      case 'create':
        return <CreateProposal onSubmit={handleCreateProposal} />;
      case 'history':
        return <VoteHistory votes={userVotes} />;
      case 'stats':
        return <VotingStats proposals={proposals} />;
      default:
        return <ProposalList proposals={proposals} onVote={handleVote} />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>Nexus Voting</Title>
      </Header>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'proposals'} 
          onClick={() => setActiveTab('proposals')}
        >
          Active Proposals
        </Tab>
        <Tab 
          active={activeTab === 'create'} 
          onClick={() => setActiveTab('create')}
        >
          Create Proposal
        </Tab>
        <Tab 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
        >
          Vote History
        </Tab>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </Tab>
      </TabContainer>

      <ContentArea>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: '#ff4444' }}>Error: {error}</div>}
        {renderContent()}
      </ContentArea>
    </Container>
  );
};

export default VotingModule;