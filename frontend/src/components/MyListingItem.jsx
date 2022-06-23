import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import starIcon from '../assets/star.png';
import starNoneIcon from '../assets/star-none.png';
import { StoreContext } from '../utils/Store';
import MessageModal from './MessageModal';

const MyListingItem = ({ id }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const context = React.useContext(StoreContext);
  const [listings, setListings] = context.listings;

  // keep track of this listing item
  const [item, setItem] = React.useState({
    title: '',
    price: 0,
    owner: '',
    reviews: [
      {}
    ],
    availability: [
      {}
    ],
    metadata: {},
    thumbnail: '',
    published: false,
    postedOn: '',
    address: {}
  });

  const [avgRating, setAvgRating] = React.useState(0);
  const addRatings = (reviews) => {
    let res = 0;
    for (const review of reviews) {
      res += review.rating;
    }
    return res;
  }
  React.useEffect(async () => {
    // fetch this listing detail from backend
    const resp = await fetch(`http://localhost:5005/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    const nReviews = data.listing.reviews.length;
    const sumRating = addRatings(data.listing.reviews);
    const tempAvgRating = nReviews === 0 ? 0 : sumRating / nReviews;
    setAvgRating(tempAvgRating);
    setItem({
      id: data.listing.id,
      title: data.listing.title,
      price: data.listing.price,
      address: data.listing.address,
      metadata: data.listing.metadata,
      availability: data.listing.availability,
      published: data.listing.published,
      reviews: data.listing.reviews,
      owner: data.listing.owner,
      postedOn: data.listing.postedOn,
      thumbnail: data.listing.thumbnail,
    })
  }, []);

  const deleteItem = async () => {
    // ask the backend to remove this item
    const resp = await fetch(`http://localhost:5005/listings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    });
    if (!resp.ok) {
      // TODO show the modal so that the user knows the deletion listing was not successful
      setShowModal(true);
    } else {
      // else the deletion was successful then we need to remove this particular from listing context
      const tempListings = listings.filter(elem => elem.id !== id);
      setListings(tempListings);
    }

    let tempListings = [...listings];
    // remove the listing whose id is current listing id
    tempListings = tempListings.filter(item => {
      return item.id !== id;
    });
    setListings(tempListings);
  }

  React.useEffect(() => {
    // whenever the listing changes we need to re-calculate average rating
    let sum = 0;
    let count = 0;
    item.reviews.forEach(review => {
      count++;
      sum += review.rate;
    });
    if (count === 0) setAvgRating(0);
    else setAvgRating(Math.round(sum / count));
  }, [item]);

  return (
    <>

      <Card style={{ width: '20rem' }}>
        <Card.Img
          src={ item.thumbnail }
          variant='top'
          alt={ item.title + `listing ${id}`}
        />
        <Card.Body>
          <Card.Title>{ item.title + ' (' + item.metadata.type + ')' }</Card.Title>
          <Card.Subtitle className='mb-2'>{ '$' + item.price + ' AUD per night' }</Card.Subtitle>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>
            { item.metadata.bedrooms + ' bedrooms' }
            <span>{' '}&#183;{' '}</span>
            { item.metadata.beds + ' beds' }
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          { /* TODO SVG rating of listing */ }
          { Array.from({ length: avgRating }).map((a, b) => {
            return (
              <Image
                src={ starIcon }
                rounded key={ b }
                thumbnail={ true }
                height={ 10 }
                width={ 10 }
              />
            )
          })}
          { Array.from({ length: 5 - avgRating }).map((a, b) => {
            return (
              <Image
                src={ starNoneIcon }
                rounded
                key={ b }
                height={ 17 }
                width={ 17 }
              />
            )
          })}
          <span>{' '}&#183;</span>
          { item.reviews.length + ' reviews' }
        </Card.Body>
        <Card.Body>
          { /* TODO a button to edit this listing
               TODO a button to delete this listing */ }
          <Button
            variant='warning'
            onClick={ () => navigate(`/editListing/${id}`) }
          >
            Edit
          </Button>
          {' '}
          <Button
            variant='danger'
            onClick={ deleteItem }
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      <MessageModal>
        show={ showModal }
        message = { 'Oops! Something went wrong, cannot delete this listing!' }
        handleClose={ () => setShowModal(false) }
      </MessageModal>
    </>
  );
}

MyListingItem.propTypes = {
  id: PropTypes.number,
}

export default MyListingItem;
