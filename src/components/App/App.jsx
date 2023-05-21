import { useEffect, useReducer } from 'react';
import { Container } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import fetchImages from 'Api';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'formSubmit':
      return {
        ...state,
        page: 1,
        images: [],
        searchQuery: payload,
      };
    case 'setIsLoading':
      return {
        ...state,
        isLoading: payload,
      };
    case 'loadMoreImages':
      return {
        ...state,
        images: [...state.images, ...payload],
      };
    case 'setPage':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'openModal':
      return {
        ...state,
        modalImg: payload,
        showModal: true,
      };
    case 'closeModal':
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};

const App = () => {
  const [searchState, dispatch] = useReducer(reducer, {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImg: '',
    visibleLoadMoreBtn: true,
  });

  useEffect(() => {
    dispatch({ type: 'setIsLoading', payload: true });
    if (searchState.searchQuery.trim() !== '') {
      fetchImages(searchState.searchQuery, searchState.page)
        .then(response => {
          const lastPage = Math.ceil(Number(response.data.totalHits) / 12);

          if (
            response.data.hits.length === 0 ||
            lastPage === searchState.page
          ) {
            dispatch({ type: 'setIsLoading', payload: false });
            Notify.failure('Invalid request or you have reached the last page');
          }
          dispatch({ type: 'loadMoreImages', payload: response.data.hits });
        })
        .finally(() => {
          dispatch({ type: 'setIsLoading', payload: false });
        });
    }
  }, [searchState.searchQuery, searchState.page]);

  const handleFormSubmit = query => {
    dispatch({ type: 'formSubmit', payload: query });
  };

  const onLoadMore = () => {
    dispatch({ type: 'setPage' });
  };

  const showModal = modalImg => {
    dispatch({ type: 'openModal', payload: modalImg });
  };

  const closeModal = () => {
    dispatch({ type: 'closeModal' });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {searchState.images.length > 0 && (
        <>
          <ImageGallery images={searchState.images} showModal={showModal} />
          {searchState.isLoading ? (
            <Loader visible={searchState.isLoading} />
          ) : (
            <Button onClick={onLoadMore} />
          )}
          {searchState.showModal && (
            <Modal modalImg={searchState.modalImg} closeModal={closeModal} />
          )}
        </>
      )}
    </Container>
  );
};
export default App;
