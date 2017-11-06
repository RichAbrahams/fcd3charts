import styled from 'styled-components';

const UL = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & li {
    margin: 0em 2em 0em 1em
  }

  & a {
    color: white;
  }

  & a:link {
    text-decoration: none;
  }

  & a:visited {
      text-decoration: none;
  }

  & a:hover {
      text-decoration: noe;
  }

  & a:active {
      text-decoration: none;
  }
`;

export default UL;
