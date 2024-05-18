import { format, isToday, isYesterday } from 'date-fns'; // Import the necessary functions


function messageSendTime(createdAt: Date): string {
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}



function messagesTimeGroup(createdAt: Date): string {
    // Get current date
    const currentDate = new Date();
    
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
    const timeDifference = currentDate - postDate;
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
  }

export {messageSendTime ,  getTimeAgoString , messagesTimeGroup} ;

