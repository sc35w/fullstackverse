/**
 * Fullstackverse form intake — Google Apps Script Web App
 *
 * SETUP (do this from scratch, don't reuse an old deployment):
 * 1. Open the Google Sheet you want submissions written to.
 * 2. Extensions > Apps Script. This creates a script BOUND to that sheet
 *    (no spreadsheet ID to configure — it always writes to the sheet it's
 *    opened from).
 * 3. Delete the boilerplate `myFunction() {}` and paste this whole file in.
 * 4. Save (Ctrl/Cmd+S).
 * 5. Deploy > New deployment > gear icon > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy, copy the /exec URL, set it as VITE_GOOGLE_APPS_SCRIPT_URL.
 *
 * If you ever change the code, redeploy via Deploy > Manage deployments >
 * edit (pencil) > Version: New version > Deploy — the URL stays the same.
 */

const CONTACT_SHEET_NAME = 'Submissions';
const CONTACT_HEADERS = [
  'Timestamp', 'Full Name', 'Email', 'Contact Number',
  'Project Description', 'Budget', 'Type', 'Source'
];

const WEBINAR_SHEET_NAME = 'WebinarRegistrations';
const WEBINAR_HEADERS = [
  'Timestamp', 'Webinar Slug', 'Name', 'Email', 'Phone', 'Source'
];

/* ============================
   ENTRY POINT
   ============================ */

function doPost(e) {
  try {
    const payload = parseBody(e);
    if (!payload) {
      return jsonResponse({ success: false, message: 'No JSON payload found in request body.' });
    }

    if (payload.action === 'send_webinar_email') return sendWebinarEmail(payload);
    if (payload.action === 'submit_webinar') return appendWebinar(payload);
    return appendContact(payload);
  } catch (err) {
    Logger.log('doPost error: ' + (err && err.stack ? err.stack : err));
    return jsonResponse({ success: false, message: 'Server error — check the Executions log.' });
  }
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    const parsed = JSON.parse(e.postData.contents);
    return (parsed && typeof parsed === 'object') ? parsed : null;
  } catch (err) {
    return null;
  }
}

/* ============================
   CONTACT / RFP SUBMISSIONS
   ============================ */

function appendContact(p) {
  const fullName = str(p.full_name);
  const email = str(p.email);

  if (!fullName) return jsonResponse({ success: false, message: 'Full name is required' });
  if (!isValidEmail(email)) return jsonResponse({ success: false, message: 'Valid email is required' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet(CONTACT_SHEET_NAME, CONTACT_HEADERS);
    sheet.appendRow([
      new Date(),
      fullName,
      email,
      str(p.contact_number),
      str(p.project_description),
      str(p.budget),
      str(p.type),
      str(p.source),
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ success: true, message: 'Form submitted successfully' });
}

/* ============================
   WEBINAR / WORKSHOP REGISTRATIONS
   ============================ */

function appendWebinar(p) {
  const name = str(p.name);
  const email = str(p.email);
  const phone = str(p.phone);

  if (!name) return jsonResponse({ success: false, message: 'Name is required' });
  if (!isValidEmail(email)) return jsonResponse({ success: false, message: 'Valid email is required' });
  if (!phone) return jsonResponse({ success: false, message: 'Phone is required' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet(WEBINAR_SHEET_NAME, WEBINAR_HEADERS);
    sheet.appendRow([
      new Date(),
      str(p.webinar_slug),
      name,
      email,
      phone,
      str(p.source),
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ success: true, message: 'Registration submitted successfully' });
}

/* ============================
   WEBINAR CONFIRMATION EMAIL
   ============================ */

function sendWebinarEmail(p) {
  const email = str(p.email);
  const name = str(p.name);

  if (!isValidEmail(email)) {
    return jsonResponse({ success: false, message: 'Valid email is required' });
  }

  try {
    const htmlBody = ''
      + '<div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:25px">'
      + '  <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:30px">'
      + '    <h2 style="color:#2563eb; margin-top:0">Welcome ' + (name || 'to SkillVerse') + ' 🚀</h2>'
      + '    <p>Your registration for the <b>USA Webinar – SkillVerse Masterclass</b> is confirmed.</p>'
      + '    <hr/>'
      + '    <h3>📅 Webinar Details</h3>'
      + '    <p><b>Date:</b> Saturday, 14 February<br/><b>Time:</b> 11:00 AM – 1:00 PM<br/><b>Time Zone:</b> Asia/Kolkata</p>'
      + '    <a href="https://meet.google.com/buw-yewo-zxr" style="display:inline-block;padding:12px 18px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">▶ Join Google Meet</a>'
      + '    <hr style="margin:25px 0"/>'
      + '    <h3>⚠ Mandatory</h3>'
      + '    <p>Join our WhatsApp group for updates, tips & community support.</p>'
      + '    <a href="https://chat.whatsapp.com/GK4oAZtp21oGvkEGyZvku1?mode=gi_t" style="display:inline-block;padding:12px 18px;background:#22c55e;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">👉 Join WhatsApp Group</a>'
      + '    <hr style="margin:25px 0"/>'
      + '    <p style="font-size:14px;color:#555">Please join 5 minutes early.<br/>See you there!</p>'
      + '    <b>Team SkillVerse</b>'
      + '  </div>'
      + '</div>';

    MailApp.sendEmail({
      to: email,
      subject: "🎓 You're Registered! USA Webinar – SkillVerse",
      htmlBody: htmlBody,
    });

    return jsonResponse({ success: true });
  } catch (err) {
    Logger.log('sendWebinarEmail error: ' + (err && err.stack ? err.stack : err));
    return jsonResponse({ success: false, message: 'Failed to send email' });
  }
}

/* ============================
   HELPERS
   ============================ */

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f3f3f3');
  }
  return sheet;
}

function str(v) {
  return v === null || v === undefined ? '' : String(v).trim();
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ============================
   TEST HELPERS (run from Editor toolbar to sanity-check)
   ============================ */

function testDoPostContact() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        full_name: 'Test User',
        email: 'test@example.com',
        contact_number: '9876543210',
        project_description: 'Test submission from testDoPostContact()',
        budget: '1000',
        type: 'Website',
        source: 'Editor Test',
      }),
    },
  };
  Logger.log(doPost(fakeEvent).getContent());
}

function testDoPostWebinar() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'submit_webinar',
        webinar_slug: 'test-webinar',
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        source: 'Editor Test',
      }),
    },
  };
  Logger.log(doPost(fakeEvent).getContent());
}
