import React from 'react';
import { StoreContext } from '../utils/Store';
import ListingItem from '../components/ListingItem';
import FilterArea from './FilterArea';

const HomeBody = () => {
  // const [loading, setLoading] = React.useState(false);
  const context = React.useContext(StoreContext);
  const [listings, setListings] = context.listings;

  const concatAddress = ({ street, suburb, city, state, zip, country }) => {
    return `${street}, ${suburb}, ${city}, ${state} ${zip}, ${country}`;
  }
  const addRatings = (reviews) => {
    let res = 0;
    for (const review of reviews) {
      res += review.rating;
    }
    return res;
  }

  React.useEffect(async () => {
    const resp1 = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data1 = await resp1.json();
    const listingIds = data1.listings.map(elem => elem.id);
    const tmpListings = [];
    for (const id of listingIds) {
      const resp2 = await fetch(`http://localhost:5005/listings/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data2 = await resp2.json();
      tmpListings.push({
        id: data2.listing.id,
        title: data2.listing.title,
        address: concatAddress(data2.listing.address),
        thumbnail: data2.listing.thumbnail,
        price: data2.listing.price,
        nReviews: data2.listing.reviews.length,
        owner: data2.listing.owner,
        sumRating: addRatings(data2.listing.reviews)
      })
    }
    setListings(tmpListings);
  }, []);

  return (
    <>
      <div>
        <FilterArea/>
      </div>
      <div className='d-flex flex-wrap'>
        { listings.map((listing, idx) => {
          return (
            <div key={ idx } className='p-2'>
              <ListingItem
                props={ listing }
              />
            </div>
          )
        })}
      </div>
    </>
  );
}

export default HomeBody;
