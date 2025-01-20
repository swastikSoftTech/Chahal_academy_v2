import { showMessage } from 'react-native-flash-message';

//const FlashMessage = ({flashMsgRef})=> <FlashMessage position="top" ref={flashMsgRef}/>
const flashMessage = (message, type, description) => showMessage({
    message: message,
    description: description,
    type: type,
    icon: type,
    position: "top",
    autoHide: true,
    floating: true,
});
export default flashMessage;