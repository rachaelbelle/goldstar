import React, { Component } from 'react';
import { ReactWebChatComponent } from 'react-web-chat';
import Avatar from 'react-web-chat/src/themes/default/components/Avatar/index.js';
import {Button} from 'react-web-chat/src/themes/default/components/Button/index.js';
import {Input} from 'react-web-chat/src/themes/default/components/Input/index.js';



class Chatpage extends Component {
  render() {
    return (
      <div>
        <ReactWebChatComponent url="http://localhost:8080"
          theme={{
            AvatarComponent: Avatar,
            ButtonComponent: Button,
            InputComponent: Input
          }}
        />
      </div>
    )
  }

}


export default Chatpage;
