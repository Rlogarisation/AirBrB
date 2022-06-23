import React from 'react';
import PropTypes from 'prop-types';

// TODO feel free to add more things to 'store'
export const StoreContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  // these listings will come from '/listings' not '/listings/{listingId}'
  const [listings, setListings] = React.useState([]);
  const [myListings, setMyListings] = React.useState([]);

  const store = {
    listings: [listings, setListings],
    myListings: [myListings, setMyListings],
  }

  return <StoreContext.Provider value={ store }>{ children }</StoreContext.Provider>
}

ContextProvider.propTypes = {
  children: PropTypes.node,
}

export default ContextProvider;
