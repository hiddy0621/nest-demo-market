const USER_STATUS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
