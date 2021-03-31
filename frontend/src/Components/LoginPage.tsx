import css from 'csz';
import { RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import tngLogo from '../img/tng.svg';
import { BORDER_RADIUS, buttonStyle, TNG_BLUE } from '../styles';
import { WebSocketApi } from '../types/WebSocket';
import { generateId } from './generateId';
import { connectToWebSocket } from './WebSocket';

const styling = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: 44px 30px 30px 30px 30px;
  align-content: center;
  justify-content: center;
  grid-gap: 10px;

  a:visited {
    color: blue;
  }

  .heading {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    color: ${TNG_BLUE};
    font-size: 20px;
    text-align: center;
    line-height: 1.2;
  }

  .logo {
    grid-column: 1 / 3;
    grid-row: 5 / 6;
    height: 30px;
    justify-self: center;
  }

  .user-label {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    align-self: center;
    justify-self: end;
  }

  .user-input {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    border-color: ${TNG_BLUE};
    border-style: solid;
    padding: 0px 5px;
    ${BORDER_RADIUS};
  }

  .session-label {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    align-self: center;
    justify-self: end;
  }

  .session-link {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    padding: 0px 5px;
    align-self: center;
    ${BORDER_RADIUS};
  }

  .submit {
    grid-column: 1 / 3;
    grid-row: 4 / 5;
    ${buttonStyle};
    width: 100%;
  }
`;

const ProtoLoginPage = ({ socket }: { socket: WebSocketApi }) => {
  const firstInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [user, setUser] = useState(socket.loginData.user);
  let sessionId = new URLSearchParams(window.location.search).get('sessionId') || '';
  if (!sessionId.match(/^[a-zA-Z0-9]{16}$/i)) {
    sessionId = generateId(16);
    history.replaceState({}, 'Scrum Poker', `?sessionId=${sessionId}`);
  }

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <form
      className={styling}
      onSubmit={(event) => {
        event.preventDefault();
        socket.login(user, sessionId);
      }}
    >
      <div className="heading">
        NEXT GENERATION
        <br />
        SCRUM POKER
      </div>
      <label htmlFor="user" className="user-label">
        Name:
      </label>
      <input
        id="user"
        type="text"
        value={user}
        ref={firstInputRef}
        className="user-input"
        onChange={(event) => setUser((event.target as HTMLInputElement).value)}
      />
      <label htmlFor="session" className="session-label">
        Session:
      </label>
      <a id="session" href={`?sessionId=${sessionId}`} className="session-link">
        {sessionId}
      </a>
      <input type="submit" value="Login" className="submit" disabled={user.length === 0} />
      <a href="https://www.tngtech.com/" target="_blank" className="logo">
        <img src={tngLogo} alt="TNG Logo" className="logo" />
      </a>
    </form>
  );
};

export const LoginPage = connectToWebSocket(ProtoLoginPage);
