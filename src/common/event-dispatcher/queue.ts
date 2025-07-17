export enum QueueName {
  ROLE_SERVICE_QUEUE = 'role-service-queue',
  USER_SERVICE_QUEUE = 'user-service-queue',
}

export default Object.values(QueueName).map((name) => ({ name }));
