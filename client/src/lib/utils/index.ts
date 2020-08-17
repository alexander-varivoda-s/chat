import { message, notification } from 'antd';

export const displayErrorMessage = (error: string) => {
  message.error(error);
}

export const displaySuccessNotification = (message: string, description: string) => {
  notification['success']({
    message,
    description
  });
}