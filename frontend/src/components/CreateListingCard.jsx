import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import PlusSign from '../assets/plus-sign.png';
import { useNavigate } from 'react-router-dom';

const CreateListingCard = () => {
  const navigate = useNavigate();
  return (
    <Card className='text-center'>
      <Card.Img
        src={ PlusSign }
        variant='top'
      />
      <Card.Body>
        <Button
          className='btn-block btn-lg'
          variant='primary'
          onClick={ () => navigate('/createListing') }
        >
          Create new listing
        </Button>
      </Card.Body>
    </Card>
  )
};

export default CreateListingCard;
