// Action Types
export const FETCH_PROPOSALS_REQUEST = 'FETCH_PROPOSALS_REQUEST';
export const FETCH_PROPOSALS_SUCCESS = 'FETCH_PROPOSALS_SUCCESS';
export const FETCH_PROPOSALS_FAILURE = 'FETCH_PROPOSALS_FAILURE';

export const CAST_VOTE_REQUEST = 'CAST_VOTE_REQUEST';
export const CAST_VOTE_SUCCESS = 'CAST_VOTE_SUCCESS';
export const CAST_VOTE_FAILURE = 'CAST_VOTE_FAILURE';

export const CREATE_PROPOSAL_REQUEST = 'CREATE_PROPOSAL_REQUEST';
export const CREATE_PROPOSAL_SUCCESS = 'CREATE_PROPOSAL_SUCCESS';
export const CREATE_PROPOSAL_FAILURE = 'CREATE_PROPOSAL_FAILURE';

export const FETCH_USER_VOTES_REQUEST = 'FETCH_USER_VOTES_REQUEST';
export const FETCH_USER_VOTES_SUCCESS = 'FETCH_USER_VOTES_SUCCESS';
export const FETCH_USER_VOTES_FAILURE = 'FETCH_USER_VOTES_FAILURE';

// Mock data for development/preview
const mockProposals = [
  {
    id: '1',
    title: 'Increase Block Rewards',
    description: 'Proposal to increase mining rewards by 10% to incentivize network security.',
    createdAt: '2024-01-15T10:00:00Z',
    endDate: '2024-02-15T10:00:00Z',
    yesVotes: 150,
    noVotes: 45,
    hasVoted: false
  },
  {
    id: '2',
    title: 'Implement New Consensus Algorithm',
    description: 'Proposal to upgrade to a more efficient consensus mechanism.',
    createdAt: '2024-01-10T14:30:00Z',
    endDate: '2024-02-10T14:30:00Z',
    yesVotes: 89,
    noVotes: 123,
    hasVoted: true
  }
];

const mockUserVotes = [
  {
    id: '1',
    proposalTitle: 'Previous Governance Vote',
    vote: 'yes',
    votedAt: '2024-01-05T12:00:00Z'
  },
  {
    id: '2',
    proposalTitle: 'Network Upgrade Proposal',
    vote: 'no',
    votedAt: '2024-01-03T09:15:00Z'
  }
];

// Check if NEXUS is available (for production environment)
const isNexusAvailable = () => {
  return typeof NEXUS !== 'undefined' && NEXUS && NEXUS.API;
};

// Action Creators
export const fetchProposals = () => async (dispatch) => {
  dispatch({ type: FETCH_PROPOSALS_REQUEST });
  
  try {
    if (isNexusAvailable()) {
      // Use NEXUS global API to fetch proposals
      const response = await NEXUS.API.invoke('assets/list/proposals');
      
      if (response.success) {
        dispatch({
          type: FETCH_PROPOSALS_SUCCESS,
          payload: response.result
        });
      } else {
        throw new Error(response.error || 'Failed to fetch proposals');
      }
    } else {
      // Use mock data for development/preview
      setTimeout(() => {
        dispatch({
          type: FETCH_PROPOSALS_SUCCESS,
          payload: mockProposals
        });
      }, 1000);
    }
  } catch (error) {
    dispatch({
      type: FETCH_PROPOSALS_FAILURE,
      payload: error.message
    });
  }
};

export const castVote = (proposalId, vote) => async (dispatch) => {
  dispatch({ type: CAST_VOTE_REQUEST });
  
  try {
    if (isNexusAvailable()) {
      // Use NEXUS global API to cast vote
      const response = await NEXUS.API.invoke('assets/create/vote', {
        proposal_id: proposalId,
        vote: vote,
        pin: NEXUS.user.pin
      });
      
      if (response.success) {
        dispatch({
          type: CAST_VOTE_SUCCESS,
          payload: { proposalId, vote }
        });
        
        // Refresh proposals to update vote counts
        dispatch(fetchProposals());
      } else {
        throw new Error(response.error || 'Failed to cast vote');
      }
    } else {
      // Mock vote casting for development/preview
      setTimeout(() => {
        dispatch({
          type: CAST_VOTE_SUCCESS,
          payload: { proposalId, vote }
        });
        
        // Refresh proposals
        dispatch(fetchProposals());
      }, 500);
    }
  } catch (error) {
    dispatch({
      type: CAST_VOTE_FAILURE,
      payload: error.message
    });
  }
};

export const createProposal = (proposalData) => async (dispatch) => {
  dispatch({ type: CREATE_PROPOSAL_REQUEST });
  
  try {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(proposalData.duration));
    
    if (isNexusAvailable()) {
      // Use NEXUS global API to create proposal
      const response = await NEXUS.API.invoke('assets/create/proposal', {
        title: proposalData.title,
        description: proposalData.description,
        end_date: endDate.toISOString(),
        pin: NEXUS.user.pin
      });
      
      if (response.success) {
        dispatch({
          type: CREATE_PROPOSAL_SUCCESS,
          payload: response.result
        });
        
        // Refresh proposals
        dispatch(fetchProposals());
      } else {
        throw new Error(response.error || 'Failed to create proposal');
      }
    } else {
      // Mock proposal creation for development/preview
      setTimeout(() => {
        const newProposal = {
          id: Date.now().toString(),
          title: proposalData.title,
          description: proposalData.description,
          createdAt: new Date().toISOString(),
          endDate: endDate.toISOString(),
          yesVotes: 0,
          noVotes: 0,
          hasVoted: false
        };
        
        dispatch({
          type: CREATE_PROPOSAL_SUCCESS,
          payload: newProposal
        });
        
        // Refresh proposals
        dispatch(fetchProposals());
      }, 1000);
    }
  } catch (error) {
    dispatch({
      type: CREATE_PROPOSAL_FAILURE,
      payload: error.message
    });
  }
};

export const fetchUserVotes = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_VOTES_REQUEST });
  
  try {
    if (isNexusAvailable()) {
      // Use NEXUS global API to fetch user votes
      const response = await NEXUS.API.invoke('assets/list/votes', {
        username: NEXUS.user.username
      });
      
      if (response.success) {
        dispatch({
          type: FETCH_USER_VOTES_SUCCESS,
          payload: response.result
        });
      } else {
        throw new Error(response.error || 'Failed to fetch user votes');
      }
    } else {
      // Use mock data for development/preview
      setTimeout(() => {
        dispatch({
          type: FETCH_USER_VOTES_SUCCESS,
          payload: mockUserVotes
        });
      }, 800);
    }
  } catch (error) {
    dispatch({
      type: FETCH_USER_VOTES_FAILURE,
      payload: error.message
    });
  }
};