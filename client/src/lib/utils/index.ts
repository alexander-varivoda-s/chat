import { message, notification } from 'antd';

export const displayErrorMessage = (error: string): void => {
  message.error(error);
};

export const displaySuccessNotification = (
  notificationMessage: string,
  description: string
): void => {
  notification.success({
    message: notificationMessage,
    description,
  });
};
