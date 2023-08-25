
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

export default  {
  getUsers: () => {
    return {
        status: true,
        message: "Get users success!",
        data: users
    }
  },
};
