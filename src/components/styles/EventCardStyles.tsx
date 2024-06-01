import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
`;

export const DateTime = styled.p`
  margin: 0 0 8px 0;
`;

export const Location = styled.p`
  margin: 0 0 8px 0;
`;

export const Description = styled.p`
  margin: 0 0 8px 0;
`;

export const Button = styled.button`
  margin-right: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;
