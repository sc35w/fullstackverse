/**
 * Full Google Apps Script Web App
 * - Accepts HTTP POST (JSON or form-encoded)
 * - Normalizes fields and appends to a sheet
 * - Uses LockService to avoid race conditions
 * - Optional API key protection
 * - Basic validation and truncation
 * - Test helpers for editor runs
 *
 * Configuration: edit constants below before deploying.
 */

/* ============================
   CONFIGURATION
   ============================ */
// Replace with your Spreadsheet ID (keeps script independent from bound spreadsheets)
const SPREADSHEET_ID = '1UHIHjJ-uxTRvgvRv2lgOKW74NY-SUoJ1HGn9x8yNTkU';

// Sheet and header configuration
const SHEET_NAME = 'Submissions-fullstackverse';
const HEADER_ROW = [
  'Timestamp',
  'Full Name',
  'Email',
  'Contact Number',
  'Project Description',
  'Budget',
  'Type',
  'Client IP'
];

// Optional security: set a secret API key string to require it in requests (or null to disable)
const API_KEY = null; // e.g. 'my-super-secret-key'

// Limits
const MAX_DESCRIPTION_LENGTH = 2000; // truncate long text to this length
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // window length for rate limiting (1 minute)
const RATE_LIMIT_MAX_PER_WINDOW = 30; // max submissions per IP (basic throttle)

/* ============================
   ENTRY POINT
   ============================ */

/**
 * doPost(e) - Web app POST handler
 * @param {Object} e - Apps Script event object
 * @returns {ContentService.TextOutput} JSON response
 */
function doPost(e) {
  try {
    if (!e) {
      // Friendly response when run from editor without an event object.
      return jsonResponse({ success: false, message: 'No event object (e). Run test helper or POST to the web app URL.' });
    }

    // 1) Optional API key protection
    if (API_KEY) {
      const providedApiKey = getApiKeyFromEvent(e);
      if (providedApiKey !== API_KEY) {
        Logger.log('Rejected request due to invalid API key.');
        return jsonResponse({ success: false, message: 'Invalid API key' });
      }
    }

    // 2) Extract payload (handles JSON body and form encoded parameters)
    const payload = extractPayload(e);
    if (!payload || Object.keys(payload).length === 0) {
      return jsonResponse({ success: false, message: 'No payload found in request.' });
    }

    // 3) Normalize fields
    const normalized = normalizePayload(payload);

    // 4) Basic validation
    const validationError = validateData(normalized);
    if (validationError) {
      return jsonResponse({ success: false, message: 'Validation error: ' + validationError });
    }

    // 5) Basic rate limiting by client IP (best-effort)
    const clientIp = getClientIp(e) || '';
    if (isRateLimited(clientIp)) {
      Logger.log('Rate limit triggered for IP: ' + clientIp);
      return jsonResponse({ success: false, message: 'Too many submissions. Try again later.' });
    }

    // 6) Append to spreadsheet (use lock to avoid race conditions)
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // wait up to 10s

    try {
      let sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        sheet.appendRow(HEADER_ROW);
        const headerRange = sheet.getRange(1, 1, 1, HEADER_ROW.length);
        headerRange.setFontWeight('bold').setBackground('#f3f3f3');
      }

      const row = [
        new Date(),
        normalized.full_name || '',
        normalized.email || '',
        normalized.contact_number || '',
        truncate(normalized.project_description || '', MAX_DESCRIPTION_LENGTH),
        normalized.budget || '',
        normalized.type || '',
        clientIp // last column for simple audit
      ];

      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

  return jsonResponse({ success: true, message: 'Form submitted successfully' });

  } catch (err) {
    // Log full error server-side but return a generic message to clients to avoid leaking internals
    Logger.log('doPost error: ' + (err && err.stack ? err.stack : err));
    // Optional: sendAlertOnError(err); // uncomment and implement notification if desired
    return jsonResponse({ success: false, message: 'Internal server error' });
  }
}

/* ============================
   HELPERS
   ============================ */

/** Respond with JSON text output */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Safe JSON parse, returns {} on failure */
function tryParseJsonSafe(s) {
  try {
    return s ? JSON.parse(s) : {};
  } catch (e) {
    return {};
  }
}

/** Extract payload from event (supports JSON body and form-encoded parameters) */
function extractPayload(e) {
  // 1) JSON body (common for fetch / curl)
  if (e.postData && e.postData.contents) {
    const parsed = tryParseJsonSafe(e.postData.contents);
    if (parsed && Object.keys(parsed).length > 0) return parsed;
    // if parse failed or empty, fall through to check parameters
  }

  // 2) Form-encoded HTML form submission
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    // e.parameter contains single-value params; map them into a plain object
    var out = {};
    for (var k in e.parameter) {
      out[k] = e.parameter[k];
    }
    return out;
  }

  // 3) Nothing found
  return {};
}

/** Normalize common field names to a consistent shape */
function normalizePayload(payload) {
  var out = {};

  // helper to safely coerce and trim string values
  function s(v) { return v ? String(v).trim() : ''; }

  // common name variants (trimmed)
  out.full_name = s(payload.full_name || payload.fullName || payload.name || payload.fullname);
  out.email = s(payload.email || payload.email_address || payload.emailAddress);
  // normalize contact number to digits only for consistent storage/search (remove non-digits)
  out.contact_number = s(payload.contact_number || payload.contact || payload.phone || payload.phone_number || payload.phoneNumber).replace(/\D/g, '');
  out.project_description = s(payload.project_description || payload.projectDescription || payload.description);
  out.budget = s(payload.budget || payload.estimate || payload.project_budget);
  out.type = s(payload.type || payload.project_type || payload.category);
  return out;
}

/** Very basic validation; return null if OK or string message on error */
function validateData(data) {
  if (!data) return 'No data';
  // Email format (if provided)
  if (data.email) {
    var email = String(data.email).trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
  }
  // Contact digits (if provided)
  if (data.contact_number) {
    var digits = String(data.contact_number).replace(/\D/g, '');
    if (digits.length > 0 && (digits.length < 6 || digits.length > 20)) return 'Contact number length looks invalid';
  }
  // Optionally require a name or description - uncomment below if needed:
  // if (!data.full_name) return 'Full name is required';
  // if (!data.project_description) return 'Project description is required';
  return null;
}

/** Truncate string safely */
function truncate(s, max) {
  s = String(s || '');
  return s.length > max ? s.slice(0, max - 3) + '...' : s;
}

/** Extract API key from event (either parameter or JSON body) */
function getApiKeyFromEvent(e) {
  // check parameters
  if (e.parameter && e.parameter.api_key) return e.parameter.api_key;
  // check JSON body
  if (e.postData && e.postData.contents) {
    var parsed = tryParseJsonSafe(e.postData.contents);
    if (parsed && parsed.api_key) return parsed.api_key;
  }
  return null;
}

/** Attempt to find client IP from event (best-effort; may not be available for anonymous web app) */
function getClientIp(e) {
  // Some proxies or clients might include an ip header in parameters (rare)
  if (e.parameter && e.parameter.client_ip) return e.parameter.client_ip;
  // If postData has an 'x-forwarded-for' in raw contents it must be parsed by client; otherwise unknown
  // Apps Script does NOT reliably expose client IP. This field will often be empty.
  return '';
}

/* ============================
   Basic rate limiting (by IP) - best-effort using PropertiesService
   Note: Not bulletproof; PropertiesService is shared across executions and not real-time.
   ============================ */

/** Check and increment rate counter for ip; returns true if rate limited */
function isRateLimited(ip) {
  if (!ip) return false; // cannot rate limit unknown IPs here

  // Use a script lock to avoid race conditions when reading/updating PropertiesService
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    var props = PropertiesService.getScriptProperties();
    var key = 'rate:' + ip;
    var raw = props.getProperty(key);
    var now = Date.now();
    if (!raw) {
      var obj = { count: 1, windowStart: now };
      props.setProperty(key, JSON.stringify(obj));
      return false;
    }
    var obj = JSON.parse(raw);
    if (now - obj.windowStart <= RATE_LIMIT_WINDOW_MS) {
      obj.count = (obj.count || 0) + 1;
      props.setProperty(key, JSON.stringify(obj));
      if (obj.count > RATE_LIMIT_MAX_PER_WINDOW) return true;
      return false;
    } else {
      // reset window
      obj = { count: 1, windowStart: now };
      props.setProperty(key, JSON.stringify(obj));
      return false;
    }
  } catch (e) {
    // If rate limiting fails for any reason, err on side of allowing
    Logger.log('Rate limit check failed: ' + e);
    return false;
  } finally {
    try { lock.releaseLock(); } catch (releaseErr) { /* ignore release errors */ }
  }
}

/* ============================
   Optional: Error notification hook (uncomment to use)
   ============================ */
// function sendAlertOnError(err) {
//   try {
//     var subject = 'Web App Error: Submission handler';
//     var body = 'Error: ' + (err && err.stack ? err.stack : err) + '\n\n' + 'Time: ' + new Date().toISOString();
//     MailApp.sendEmail('your-email@example.com', subject, body);
//   } catch (mailErr) {
//     Logger.log('Failed to send error email: ' + mailErr);
//   }
// }

/* ============================
   TEST HELPERS (run from Editor)
   ============================ */

/** Simulate JSON POST in editor */
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        full_name: 'Test User',
        email: 'test@example.com',
        contact_number: '+1-555-555-5555',
        project_description: 'This is a test submission from testDoPost()',
        budget: '1000',
        type: 'Website'
        // api_key: 'if you use API_KEY, include it here'
      })
    }
  };
  var resp = doPost(fakeEvent);
  Logger.log(resp.getContent());
}

/** Simulate form-encoded POST in editor */
function testDoPostForm() {
  var fakeEvent = {
    parameter: {
      full_name: 'Form User',
      email: 'form@example.com',
      project_description: 'Form-encoded submission test',
      contact_number: '1234567890'
    }
  };
  var resp = doPost(fakeEvent);
  Logger.log(resp.getContent());
}

/** Utility to reset the sheet to a clean state (runs from editor) */
function setupHeaders() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.appendRow(HEADER_ROW);
  var headerRange = sheet.getRange(1, 1, 1, HEADER_ROW.length);
  headerRange.setFontWeight('bold').setBackground('#f3f3f3');
  Logger.log('Headers reset on sheet: ' + SHEET_NAME);
}

/* ============================
   END OF FILE
   ============================ */
AA