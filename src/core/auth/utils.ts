export async function fetchAccessToken() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  if (Object.keys(session).length) {
    return session.access;
  }
  return null;
}
