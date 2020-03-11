const getUsersApi = ({ get, post }) => {
  const getUrl = url => `/tournaments/${url}`;

  const createScheduledMatch = ({ data }) => post({ url: getUrl('create-scheduled-match'), data });
  
  const fetchTournamentConfig = ({ params }) => get({ url: getUrl('tournament-config'), params });

  const payout = ({ data }) => post({ url: getUrl('payout'), data });

  // const fetchMatchDetails = ({ params }) => get({ url: getUrl('match'), params });

  return {
    createScheduledMatch,
    fetchTournamentConfig,
    payout
    // fetchMatchDetails
  };
};

module.exports = getUsersApi;