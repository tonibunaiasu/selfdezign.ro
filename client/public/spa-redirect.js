(() => {
  const path = window.location.pathname + window.location.search + window.location.hash;
  const redirect = encodeURIComponent(path);
  window.location.replace(`/?redirect=${redirect}`);
})();
