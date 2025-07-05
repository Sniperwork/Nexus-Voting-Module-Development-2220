import {
  FETCH_PROPOSALS_REQUEST,
  FETCH_PROPOSALS_SUCCESS,
  FETCH_PROPOSALS_FAILURE,
  CAST_VOTE_REQUEST,
  CAST_VOTE_SUCCESS,
  CAST_VOTE_FAILURE,
  CREATE_PROPOSAL_REQUEST,
  CREATE_PROPOSAL_SUCCESS,
  CREATE_PROPOSAL_FAILURE,
  FETCH_USER_VOTES_REQUEST,
  FETCH_USER_VOTES_SUCCESS,
  FETCH_USER_VOTES_FAILURE
} from '../actions/votingActions.js';

const initialState = {
  proposals: [],
  userVotes: [],
  loading: false,
  error: null,
  voting: false,
  creating: false
};

export default function votingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROPOSALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROPOSALS_SUCCESS:
      return {
        ...state,
        loading: false,
        proposals: action.payload,
        error: null
      };
    case FETCH_PROPOSALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CAST_VOTE_REQUEST:
      return {
        ...state,
        voting: true,
        error: null
      };
    case CAST_VOTE_SUCCESS:
      return {
        ...state,
        voting: false,
        proposals: state.proposals.map(proposal =>
          proposal.id === action.payload.proposalId
            ? { ...proposal, hasVoted: true }
            : proposal
        ),
        error: null
      };
    case CAST_VOTE_FAILURE:
      return {
        ...state,
        voting: false,
        error: action.payload
      };
    case CREATE_PROPOSAL_REQUEST:
      return {
        ...state,
        creating: true,
        error: null
      };
    case CREATE_PROPOSAL_SUCCESS:
      return {
        ...state,
        creating: false,
        error: null
      };
    case CREATE_PROPOSAL_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.payload
      };
    case FETCH_USER_VOTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_VOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        userVotes: action.payload,
        error: null
      };
    case FETCH_USER_VOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}