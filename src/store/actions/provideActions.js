export const setProviders = (provider) => {
  return {
    type: "SET_PROVIDER",
    payload: provider,
  };
};