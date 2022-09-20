type Session = {
  token: string;
};

export const parser = {
  session: (value: string): Session => JSON.parse(value),
};
