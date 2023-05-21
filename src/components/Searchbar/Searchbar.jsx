import { Header, SearchInput } from 'components/Searchbar/Searchbar.styled';
import { SearchButton } from 'components/Searchbar/Searchbar.styled';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeQuery = e => {
    setQuery(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <Header>
      <form onSubmit={onFormSubmit}>
        <SearchInput
          type="text"
          name="searchQuery"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeQuery}
          value={query}
          required
        />
        <SearchButton type="submit">Search</SearchButton>
      </form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
