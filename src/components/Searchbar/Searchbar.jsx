import { Header, SearchInput } from 'components/Searchbar/Searchbar.styled';
import { SearchButton } from 'components/Searchbar/Searchbar.styled';
import { useState } from 'react';

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('')

  const setSearchQuery = ({ target: { value } }) => {
    setQuery({ query: value });
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
            onChange={setSearchQuery}
            value={query}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </Header>
    );
  
};
export default Searchbar;