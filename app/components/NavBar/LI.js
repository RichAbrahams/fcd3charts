import styled from 'styled-components';

const LI = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & :hover {
    background-color: white;
    color: black;
  }

  & a {
    color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
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

export default LI;
