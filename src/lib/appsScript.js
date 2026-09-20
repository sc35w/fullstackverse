const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

// Posts { action, ...data } to the Google Apps Script web app. Uses
// text/plain to avoid a CORS preflight (Apps Script still parses the JSON
// body). Apps Script always responds HTTP 200, so success is read from the
// JSON body's `success` field, not the HTTP status.
export async function submitToAppsScript(action, data) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured (VITE_GOOGLE_APPS_SCRIPT_URL).');
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...data }),
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    // handled by the check below
  }

  if (!res.ok || !json || json.success === false) {
    throw new Error((json && json.message) || 'Submission failed. Please try again.');
  }

  return json;
}
