import styled from "styled-components";

export const S_Tooltip = styled.div`
  position: fixed;
  pointer-events: none;
  background: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  transform: translate(-50%, -30px);
  font-size: 12px;
  z-index: 999;
  transition: opacity 0.15s ease;
`;
