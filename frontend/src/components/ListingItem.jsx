import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import StarNoneIcon from '../assets/star-none.png';
import StarIcon from '../assets/star.png';
import '../App.css';

const ListingItem = ({ props }) => {
  const { id, title, address, thumbnail, price, nReviews, owner, sumRating } = props;
  const avgRating = (nReviews === 0 ? 0 : sumRating / nReviews);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        src={ thumbnail }
        varaiant='top'
        alt={ title + `listing ${id}`}
      />
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Subtitle>{ '$' + price + ' AUD per night' }</Card.Subtitle>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>{ address }</ListGroup.Item>
        <ListGroup.Item>{ 'For booking please contact: ' + owner }</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        { Array.from({ length: avgRating }).map((item, idx) => {
          return (
            <Image
              src={ StarIcon }
              key={ idx }
              height={ 17 }
              width={ 17 }
            />
          )
        })}
        { Array.from({ length: 5 - avgRating }).map((item, idx) => {
          return (
            <Image
              src={ StarNoneIcon }
              key={ idx }
              height={ 17 }
              width={ 17 }
            />
          )
        })}
        <span>{' '}&#183;</span>
        { ' ' + nReviews + ' reviews' }
      </Card.Body>
    </Card>
  );
}

ListingItem.propTypes = {
  id: PropTypes.string,
  price: PropTypes.number,
  owner: PropTypes.string,
  nReviews: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  address: PropTypes.string,
  sumRating: PropTypes.number,
  props: PropTypes.object,
}

export default ListingItem;
