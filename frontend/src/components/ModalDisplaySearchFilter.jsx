import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/Store';
import Card from 'react-bootstrap/Card';
import * as dayjs from 'dayjs';

function ModalDisplaySearchFilter (props) {
  const context = React.useContext(StoreContext);
  const [myListings] = context.listings;

  let myFullListings = [];
  React.useEffect(async () => {
    myFullListings = myListings.map(async (listing) => {
      // fetch this listing detail from backend
      const resp = await fetch(`http://localhost:5005/listings/${listing.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await resp.json();
      listing.metadata = (data.listing.metadata);
      listing.availability = (data.listing.availability);
    })
  }, []);

  const returnMyListing = () => {
    if (props.values.order === true) {
      return [].concat(myFullListings)
        .sort((a, b) => a.sumRating < b.sumRating ? 1 : -1);
    } else {
      return [].concat(myFullListings)
        .sort((a, b) => a.sumRating > b.sumRating ? 1 : -1);
    }
  }

  const produceCheckInRangeAsArray = (dateRange, checkInDate, checkOutDate) => {
    const isBetween = require('dayjs/plugin/isBetween');
    dayjs.extend(isBetween);
    let counter = -1;
    dateRange.filter(eachDate => {
      if (dayjs(eachDate).isBetween(checkInDate, checkOutDate, null, '[]')) {
        counter += 1;
        return eachDate;
      } else {
        return null;
      }
    });
    return counter === dayjs(checkOutDate).diff(checkInDate, 'day');
  }
  const sortedListing = returnMyListing();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>The following is your inputs:</h4>
        <p>Minimum number of beds: {props.values.minBed}</p>
        <p>Maximum number of beds: {props.values.maxBed}</p>
        <p>Minimum Price Range: {props.values.minPrice}</p>
        <p>Maximum Price Range: {props.values.maxPrice}</p>
        <p>Check in date: {props.values.checkIn}</p>
        <p>Check out date: {props.values.checkOut}</p>
        <h4>The following is matched results:</h4>
        <div>
          {
            sortedListing.filter((listing) => {
              // Check price range first
              if (listing.price > props.values.maxPrice) {
                return null;
              } else if (listing.metadata.bedrooms > props.values.maxBed) {
                return null;
              } else if (listing.metadata.bedrooms < props.values.minBed) {
                return null;
              } else if (listing.price < props.values.minPrice) {
                return null;
              } else if (produceCheckInRangeAsArray(listing.availability, props.values.checkIn, props.values.checkOut) === false) {
                return null;
              } else {
                return listing;
              }
            }).map((listing, idx) => (
              <div className={'searchResult'} key={ idx }>
                <p>--------------------------</p>
                <Card.Img
                  src={ listing.thumbnail}
                  variant='top'
                  fluid
                />
                <p>Title: {listing.title}</p>
                <p>Address: {listing.address}</p>
                <p>Owner: {listing.owner}</p>
                <p>Price: {listing.price}</p>
                <p>Rating: {listing.sumRating}</p>
                <p>Bedrooms: {listing.metadata.bedrooms}</p>
                <p>Review: {listing.nReviews}</p>
                {/* Need to implement thumbnail */}
              </div>
            ))
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalDisplaySearchFilter.propTypes = {
  onHide: PropTypes.func,
  values: PropTypes.object,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
}

export default ModalDisplaySearchFilter;
