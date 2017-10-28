import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  .xAxis line{
    stroke: rgba(115, 115, 115, 0.15);
  }

  .xAxis path{
    stroke: rgba(115, 115, 115, 0.15);
  }

  .xAxis text{
    fill: rgba(115, 115, 115, 1);
    user-select: none;
  }

  .yAxis line{
    stroke: rgba(115, 115, 115, 0.15);
    transform: translateX(-3px);
  }

  .yAxis path{
    stroke: rgba(115, 115, 115, 0.15);
  }

  .yAxis text{
    fill: rgba(115, 115, 115, 1);
    user-select: none;
  }

  .domain {
    display: none;
  }

  .yAxisPath {
    fill: none;
    stroke: rgb(115, 115, 115);
    stroke-opacity: 0.15;
    stroke-width: 1px;
  }
`;

export default Wrapper;
