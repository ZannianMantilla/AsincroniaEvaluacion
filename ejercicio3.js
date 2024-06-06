(async () => {
  let response = await fetch('user.json');
  let res = await response.json();
  let repos = [];
  res.users.forEach(e => {
    let repo = fetch(`https://api.github.com/users/${e.user}/repos`).then(
      successResponse => {
        if (successResponse.status !== 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },

      failResponse => {
        return null;
      }
    );
    repos.push(repo);
  });
  let results = await Promise.all(repos);
  console.log(results)
})();