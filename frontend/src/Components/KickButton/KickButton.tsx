import { BUTTON_KICK } from '../../constants';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './KickButton.module.css';

interface Props {
  user: string;
}

export const KickButton = connectToWebSocket<Props>(({ socket, user }) => {
  return (
    <button class={classes.root} title={BUTTON_KICK(user)} onClick={() => socket.removeUser(user)}>
      {/* icon taken from material icons */}
      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
      </svg>
    </button>
  );
});
