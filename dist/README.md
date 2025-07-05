# Nexus Voting Module

A modern, dark minimalist voting module for the Nexus wallet, enabling on-chain governance and community voting.

## Features

- **Modern UI**: Dark theme with minimalist design
- **On-chain Voting**: Utilizes Nexus blockchain for secure, transparent voting
- **Proposal Management**: Create and manage voting proposals
- **Vote History**: Track personal voting history
- **Real-time Statistics**: View voting statistics and analytics
- **Responsive Design**: Works seamlessly across different screen sizes

## Installation

1. Download the module zip file
2. Extract to your Nexus wallet modules directory
3. Restart the Nexus wallet
4. The Voting module will appear in your modules list

## Usage

### Creating Proposals
1. Navigate to the "Create Proposal" tab
2. Fill in the proposal title and description
3. Set the voting duration (in days)
4. Submit the proposal

### Voting
1. Browse active proposals in the "Active Proposals" tab
2. Read the proposal details
3. Click "Yes" or "No" to cast your vote
4. Votes are recorded on the Nexus blockchain

### Viewing History
- Check your voting history in the "Vote History" tab
- View overall voting statistics in the "Statistics" tab

## Technical Details

- Built with React and Redux for state management
- Uses Nexus API for blockchain interactions
- Styled with styled-components for a modern look
- Responsive design using CSS Grid and Flexbox

## API Integration

The module integrates with the Nexus blockchain using the following APIs:

- `assets/list/proposals` - Fetch active proposals
- `assets/create/vote` - Cast votes on proposals
- `assets/create/proposal` - Create new proposals
- `assets/list/votes` - Fetch user voting history

## Development

To build the module:

```bash
npm install
npm run build
```

## License

MIT License - see LICENSE file for details