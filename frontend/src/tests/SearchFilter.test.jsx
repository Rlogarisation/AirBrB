import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
// import { configure, shallow } from 'enzyme';
import App from '../App';
// configure({ adapter: new Adapter() });
render(<App/>);

describe('Search filter forms for Minimum Bedrooms', () => {
  const minBed = screen.getByTestId('FormMinBed');
  // it('User able to see checkbox for selecting minimum bedrooms', () => {
  //   expect(minBed).toBeInTheDocument();
  // });

  it('User able to input a number for minimum bedrooms', () => {
    fireEvent.change((minBed), { target: { value: '2' } });
    expect(minBed.value).toBe('2');
    fireEvent.change((minBed), { target: { value: '' } });
  });

  it('User should not able to enter character into the min bed field', () => {
    expect(minBed.value).toBe('');
    fireEvent.change((minBed), { target: { value: 'Trimester is the best!' } });
    expect(minBed.value).toBe('');
  });

  it('User should be allowed to change value after their first entered value', () => {
    fireEvent.change((minBed), { target: { value: '2' } });
    expect(minBed.value).toBe('2');
    fireEvent.change((minBed), { target: { value: '3' } });
    expect(minBed.value).toBe('3');
    fireEvent.change((minBed), { target: { value: '' } });
  });
});

describe('Search filter forms for Maximum Bedrooms', () => {
  const maxBed = screen.getByTestId('FormMaxBed');
  // it('User able to see checkbox for selecting maximum bedrooms', () => {
  //   expect(maxBed).toBeInTheDocument();
  // });

  it('User able to input a number for maximum bedrooms', () => {
    fireEvent.change((maxBed), { target: { value: '5' } });
    expect(maxBed.value).toBe('5');
    fireEvent.change((maxBed), { target: { value: '' } });
  });

  it('User should not able to enter character into the max bed field', () => {
    expect(maxBed.value).toBe('');
    fireEvent.change((maxBed), { target: { value: 'hahhaa' } });
    expect(maxBed.value).toBe('');
  });

  it('User should be allowed to change value after their first entered value', () => {
    fireEvent.change((maxBed), { target: { value: '5' } });
    expect(maxBed.value).toBe('5');
    fireEvent.change((maxBed), { target: { value: '6' } });
    expect(maxBed.value).toBe('6');
    fireEvent.change((maxBed), { target: { value: '' } });
  });
});

describe('Search filter forms for Minimum Price', () => {
  const minPrice = screen.getByTestId('FormMinPrice');
  // it('User able to see checkbox for selecting min price', () => {
  //   expect(minPrice).toBeInTheDocument();
  // });

  it('User able to input a number for min price', () => {
    fireEvent.change((minPrice), { target: { value: '1' } });
    expect(minPrice.value).toBe('1');
    fireEvent.change((minPrice), { target: { value: '' } });
  });

  it('User should not able to enter character into the min price field', () => {
    expect(minPrice.value).toBe('');
    fireEvent.change((minPrice), { target: { value: 'hahaha' } });
    expect(minPrice.value).toBe('');
  });

  it('User should be allowed to change value after their first entered value', () => {
    fireEvent.change((minPrice), { target: { value: '5' } });
    expect(minPrice.value).toBe('5');
    fireEvent.change((minPrice), { target: { value: '6' } });
    expect(minPrice.value).toBe('6');
    fireEvent.change((minPrice), { target: { value: '' } });
  });
});

describe('Search filter forms for Maximum Price', () => {
  const maxPrice = screen.getByTestId('FormMaxPrice');
  // it('User able to see checkbox for selecting max price', () => {
  //   expect(maxPrice).toBeInTheDocument();
  // });

  it('User able to input a number for max price', () => {
    fireEvent.change((maxPrice), { target: { value: '666' } });
    expect(maxPrice.value).toBe('666');
    fireEvent.change((maxPrice), { target: { value: '' } });
  });

  it('User should not able to enter character into the max price field', () => {
    expect(maxPrice.value).toBe('');
    fireEvent.change((maxPrice), { target: { value: 'haha' } });
    expect(maxPrice.value).toBe('');
  });

  it('User should be allowed to change value after their first entered value', () => {
    fireEvent.change((maxPrice), { target: { value: '666' } });
    expect(maxPrice.value).toBe('666');
    fireEvent.change((maxPrice), { target: { value: '777' } });
    expect(maxPrice.value).toBe('777');
    fireEvent.change((maxPrice), { target: { value: '' } });
  });
});

describe('Search filter forms for Check In date', () => {
  const checkIn = screen.getByTestId('FormCheckin');
  // it('User able to see checkbox for selecting check in date', () => {
  //   expect(checkIn).toBeInTheDocument();
  // });

  it('User should only be able to input a number with correct format for check in date', () => {
    fireEvent.change((checkIn), { target: { value: '2021-11-11' } });
    expect(checkIn.value).toBe('2021-11-11');
    fireEvent.change((checkIn), { target: { value: '' } });
  });

  it('User should not able to input a incorrect format for check in date', () => {
    fireEvent.change((checkIn), { target: { value: '666' } });
    expect(checkIn.value).toBe('');
  });

  it('User should not able to enter character into the check in date field', () => {
    expect(checkIn.value).toBe('');
    fireEvent.change((checkIn), { target: { value: 'haha' } });
    expect(checkIn.value).toBe('');
  });

  it('User should be allowed to change value after their first entered value', () => {
    fireEvent.change((checkIn), { target: { value: '2021-11-11' } });
    expect(checkIn.value).toBe('2021-11-11');
    fireEvent.change((checkIn), { target: { value: '2021-11-12' } });
    expect(checkIn.value).toBe('2021-11-12');
    fireEvent.change((checkIn), { target: { value: '' } });
  });
});

describe('Search filter forms for Check Out date', () => {
  const checkOut = screen.getByTestId('FormCheckout');
  // it('User able to see checkbox for selecting check in date', () => {
  //   expect(checkOut).toBeInTheDocument();
  // });

  it('User should only be able to input a number with correct format for check out date', () => {
    fireEvent.change((checkOut), { target: { value: '2021-11-11' } });
    expect(checkOut.value).toBe('2021-11-11');
    fireEvent.change((checkOut), { target: { value: '' } });
  });

  it('User should not able to input a incorrect format for check out date', () => {
    fireEvent.change((checkOut), { target: { value: '666' } });
    expect(checkOut.value).toBe('');
  });

  it('User should not able to enter character into the check out date field', () => {
    expect(checkOut.value).toBe('');
    fireEvent.change((checkOut), { target: { value: 'haha' } });
    expect(checkOut.value).toBe('');
  });

  it('User should be allowed to change value after their first entered date', () => {
    fireEvent.change((checkOut), { target: { value: '2021-11-11' } });
    expect(checkOut.value).toBe('2021-11-11');
    fireEvent.change((checkOut), { target: { value: '2021-11-12' } });
    expect(checkOut.value).toBe('2021-11-12');
    fireEvent.change((checkOut), { target: { value: '' } });
  });
});

describe('Search filter forms for selecting sorting order', () => {
  const sortingCheckbox = screen.getByTestId('FormCheckbox');

  it('User should be able to click sorting check box', () => {
    expect(sortingCheckbox.checked).toBe(false);
    fireEvent.click(sortingCheckbox);
    expect(sortingCheckbox.checked).toBe(true);
    fireEvent.click(sortingCheckbox);
    expect(sortingCheckbox.checked).toBe(false);
  });
});
