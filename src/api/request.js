export default (url, params = {}) => {
  const fakeDataStore = {
    '/authorization'() {
      return JSON.parse(localStorage.getItem('yellow_duck_saved_user')) || null;
    },
    '/login'() {
      const user = {
        login: params.login,
        // eslint-disable-next-line camelcase
        vacation_days: 14,
        // eslint-disable-next-line camelcase
        first_vacation_interval: false,
      };

      localStorage.setItem(
          'yellow_duck_saved_user',
          JSON.stringify(user),
      ); // Side effect only for emulation saving auth session

      return user;
    },
    '/logout'() {
      localStorage.setItem(
          'yellow_duck_saved_user',
          null,
      ); // Side effect only for emulation saving auth session
      return {
        logout: true,
      };
    },
    '/users'() {
      const month = new Date().getMonth();
      return [
        {
          id: 1234, login: 'Коля',
          reserved: [...generateFakeDateList(18, 30, month)],
          color: '#4cc1bc'},
        {
          id: 1235,
          login: 'Вася', reserved:
                [...generateFakeDateList(10, 20, month)],
          color: '#7C7F6D'},
        {
          id: 1236,
          login: 'Валера',
          reserved: [...generateFakeDateList(10, 17, month)],
          color: '#4a7ac1'},
        {
          id: 1237,
          login: 'Петя',
          reserved: [...generateFakeDateList(15, 29, month)],
          color: '#89a7c1',
        },
      ];
    },
    '/save_vacation'() {
      return {period: [...params], status: 'wait'};
    },
  };

  function* generateFakeDateList(begin, end) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    for (let i = begin; i < end; i++) {
      yield new Date(currentYear, currentMonth, i);
    }
  }

  function getFakeDataByUrl() {
    return fakeDataStore[url]();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFakeDataByUrl());
    }, 300); // Emulate request time
  });
};
