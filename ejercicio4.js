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
  let filteredResults = results.filter(result => result.length < 5);
  console.log("Repositorios con menos de 5 repositorios públicos:");
  console.table(filteredResults.map(result => ({ user: result[0].owner.login, repos: result.length })));
  let jsResults = results.flatMap(result => result.filter(repo => repo.name.includes("JavaScript")));
  jsResults.sort((a, b) => a.name.localeCompare(b.name));
  console.log("\nRepositorios con JavaScript en su nombre:");
  console.table(jsResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
  let longNameResults = results.flatMap(result => result.filter(repo => repo.name.length > 5));
  console.log("\nRepositorios con más de 5 letras en su nombre:");
  console.table(longNameResults.map(repo => ({ name: repo.name, owner: repo.owner.login })));
})();