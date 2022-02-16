export const NOTIFICATION_TYPES = {
  BROADCAST: 'broadcast',
  TASK: 'task',
  BLOG: 'blog',
  RAPPEL: 'Rappel',
  OPPORTUNITIES: 'opportunities',
  AUDIENCE: 'audience',
  STAGE: 'stage',
  CHAT: 'chat',
  PROJECT_CHAT: 'project_chat',
  LOAN: 'loan',
  GOUTI_TASK: 'Tâche',
  GOUTI_ACTION: 'Action',
  GOUTI_PROBLEM: 'Probleme',
  GOUTI_CHANGE: 'Changement',
  GOUTI_MILESTONE: 'Jalon',
  GOUTI_DELIVERABLE: 'Livrable',
  GOUTI_PROJECT: 'Projet',
  GOUTI_ORGANIZATION: 'Organisation',
  GOUTI_RISK: 'Risque',
  GOUTI_GOAL: 'Objectif',

  CALL_REQUEST:'CALL_REQUEST',
  ESTATE_STATE_CHANGE:'ESTATE_STATE_CHANGE'
};

export const NOTIFICATION_DEFAULT_ICON = '/static/components/badge.png';

export const NOTIFICATION_ICONS = {
  // [NOTIFICATION_TYPES.BROADCAST]: "/static/icons/ic_notification_mail.svg",
  [NOTIFICATION_TYPES.TASK]: '/static/icons/ic_task.svg',
  [NOTIFICATION_TYPES.BLOG]: '/static/icons/navbar/ic_blog.svg',
  [NOTIFICATION_TYPES.OPPORTUNITIES]: '/static/faqs/ic_refund.svg',
  // [NOTIFICATION_TYPES.AUDIENCE]: "/static/icons/ic_notification_shipping.svg",
  // [NOTIFICATION_TYPES.STAGE]: "/static/icons/ic_notification_shipping.svg",
  [NOTIFICATION_TYPES.CHAT]: '/static/icons/ic_notification_chat.svg',
  [NOTIFICATION_TYPES.PROJECT_CHAT]: '/static/icons/ic_notification_chat.svg',

};

export const getNotificationIcon = (type) => (type && NOTIFICATION_ICONS[type]) || NOTIFICATION_DEFAULT_ICON;
