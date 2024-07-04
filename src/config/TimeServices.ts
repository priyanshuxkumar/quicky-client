import { format, isToday, isYesterday } from 'date-fns'; // Import the necessary functions
import { Message } from '../../gql/graphql';
import { number } from 'zod';


function messageSendTime(createdAt: Date):string {
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}



function messagesTimeGroup(createdAt: Date) {
    // Check if the message was sent today
    if (isToday(createdAt)) {
        // If the message was sent today, return the time in hours and minutes
        const hours = String(createdAt.getHours()).padStart(2, '0');
        const minutes = String(createdAt.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    } else if (isYesterday(createdAt)) {
        // If the message was sent yesterday, return 'Yesterday'
        return 'Yesterday';
    } else {
        // Otherwise, return the date in 'MMM dd' format (e.g., Jan 01)
        return format(createdAt, 'MMM dd');
    }
}



function getTimeAgoString(createdAt: Date) : string{
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  };

const groupMessagesByDate = (messages: Message[]) => {
  return messages?.reduce((groups: { [key: string]: Message[] }, message) => {
    const date = format(new Date(parseInt(message.createdAt)), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});
};

export {messageSendTime ,  getTimeAgoString , messagesTimeGroup ,groupMessagesByDate} ;

