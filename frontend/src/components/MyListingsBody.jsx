import React from 'react';
import MyListingItem from './MyListingItem';
import CreateListingCard from './CreateListingCard';
import { StoreContext } from '../utils/Store';

const MyListingsBody = () => {
  const context = React.useContext(StoreContext);
  const [myListings, setMyListings] = context.myListings;
  const userEmail = localStorage.getItem('userEmail');

  React.useEffect(async () => {
    const resp = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await resp.json();
    const tempMyListings = data.listings.filter(elem => elem.owner === userEmail);
    setMyListings(tempMyListings);
  }, []);

  return (
    <div className='d-flex flex-wrap'>
      <div key={ -1 } className='p-2'>
        <CreateListingCard />
      </div>
      { myListings.map((listing, idx) => {
        return (
          <div key={ idx } className='p-2'>
            <MyListingItem id={ listing.id }/>
          </div>
        );
      })}
    </div>
  )
}

export default MyListingsBody;
