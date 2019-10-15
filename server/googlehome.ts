// Import the appropriate service and chosen wrappers
import { dialogflow } from "actions-on-google"
import { TodoApp } from './todoapp'
import moment from 'moment';

moment.locale('ja')

// Create an app instance
export const app = dialogflow()
  
// Intent in Dialogflow called `Goodbye`
app.intent('Show Task Intent', async (conv) => {
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
    if(userTasks[0] != undefined){ 
        conv.close(`最新の予定は${ userTasks[0].title }です。締め切りは、${ moment(userTasks[0].dueTime).fromNow() }です。`)

    } else {
        conv.close('予定はありません')

    }

});