import styled from 'styled-components';
import { palette } from '../palette';

export const HomeWrapper = styled.div`
  width: 80%;
  margin: 1em auto;

  #addUser {
    margin-bottom: 2em;

    button {
      background-color: ${palette.green};
      color: ${palette.white};
      border-radius: 2em;
      margin-top: 1em;

      &:hover {
        opacity: 0.8;
      }
    }

    .addUserItem {
      padding: .5em 0;
    }
  }
`;
