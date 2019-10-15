// Import the appropriate service and chosen wrappers
import { dialogflow, Image } from "actions-on-google"
  
// Create an app instance
export const app = dialogflow()
  
// Intent in Dialogflow called `Goodbye`
app.intent('Show Task Intent', (conv) => {
    conv.close('お前ぶち殺すぞ')
});