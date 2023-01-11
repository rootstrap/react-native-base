export type User = {
  firstName?: string;
  lastName?: string;
  token?: string;
};

export type Session = {
  user: User;
  updateUser(user: User): void;
  getFullName(): string;
};
