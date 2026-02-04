export enum UserIdentity {
  STANDARD_USER = 'standard_user',
  LOCKED_OUT_USER = 'locked_out_user',
  PROBLEM_USER = 'problem_user',
  PERFORMANCE_GLITCH_USER = 'performance_glitch_user',
  VISUAL_USER = 'visual_user',
  ERROR_USER = 'error_user',
  INVALID_USER = 'invalid_user',
}

export interface UserCredential {
  username: string;
  password?: string;
}

export const USERS: Record<UserIdentity, UserCredential> = {
  [UserIdentity.STANDARD_USER]: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  [UserIdentity.LOCKED_OUT_USER]: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  [UserIdentity.PROBLEM_USER]: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  [UserIdentity.PERFORMANCE_GLITCH_USER]: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  [UserIdentity.VISUAL_USER]: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
  [UserIdentity.ERROR_USER]: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  [UserIdentity.INVALID_USER]: {
    username: 'invalid_user',
    password: 'secret_sauce',
  },
};
