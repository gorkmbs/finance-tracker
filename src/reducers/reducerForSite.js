// http://api.exchangeratesapi.io/v1/latest?access_key=3f715a231993d28bb033e385199929fd

let financeAPI =
  "http://api.exchangeratesapi.io/v1/latest?access_key=3f715a231993d28bb033e385199929fd";

const initialSiteStore = {
  financeAPI,
};

function reducerForSite(state = initialSiteStore, action) {
  return state;
}

export default reducerForSite;
