import styled from 'styled-components';

const Button = styled.button`
font-size: 14px;
padding: 0.25em 0.5em;
border: 1px solid rgba(107, 107, 107, 0.5);
border-radius: 3px;
outline: none;
background: white;
color: rgba(107, 107, 107, 1);
transition: color 300ms, background 300ms;
:hover {
  background: rgba(107, 107, 107, 1);
  color: white;
}
`;

export default Button;
