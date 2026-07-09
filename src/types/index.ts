export const Roles = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];


export interface ISendResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string;
}