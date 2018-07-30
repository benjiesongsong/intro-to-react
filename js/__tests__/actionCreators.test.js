import moxios from 'moxios';
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators';

const strangerThings = {
  title: 'Stranger Things',
  year: '2016–',
  description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.',
  poster: 'st.jpg',
  imdbID: 'tt4574334',
  trailer: '9Egf5U8xLo8',
  rating: '9.1'
};

test('setSearchTerm', () => {
  expect(setSearchTerm('New York')).toMatchSnapshot();
});

test('addAPIData', () => {
  expect(addAPIData(strangerThings)).toMatchSnapshot();
});

test('getAPIDetails', done => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    const thunk = getAPIDetails(strangerThings.imdbID);
    thunk(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: strangerThings
        })
        .then(() => {
          expect(request.url).toEqual(
            `http://localhost:3000/${strangerThings.imdbID}`
          );
          expect(dispatchMock).toBeCalledWith(addAPIData(strangerThings));
          done();
        });
    });
  });
});
