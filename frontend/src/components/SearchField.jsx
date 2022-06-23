import React from 'react';
import { StoreContext } from '../utils/Store';

const SearchField = () => {
  const [query, setQuery] = React.useState('');
  const context = React.useContext(StoreContext);
  let myListings;
  if (context.listings === null) {
    myListings = null;
  } else {
    myListings = context.listings;
  }
  return (
    <div>
      <input placeholder={'Search for anything'} onChange={event => setQuery(event.target.value)}/>
      {
        myListings.filter((listing) => {
          if (query === '') {
            return null;
          } else if (listing.title.toLowerCase().includes(query.toLowerCase())) {
            return listing;
          } else if (listing.address.city !== undefined && listing.address.city.toLowerCase().includes(query.toLowerCase())) {
            return listing;
          } else {
            return null;
          }
        }).map((listing, idx) => (
          <div className={'searchResult'} key={ idx }>
            <p>{listing.title} at {listing.address.city}</p>
          </div>
        ))
      }
    </div>
  );
}

export default SearchField;
