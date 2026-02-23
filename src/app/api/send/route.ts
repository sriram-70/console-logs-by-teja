import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Map raw form values to readable labels
const PROJECT_TYPE_MAP: Record<string, string> = {
  landing: 'Landing Page',
  business: 'Business Website (Multi-page)',
  portfolio: 'Portfolio Site',
  event: 'Event Page',
  other: 'Other',
};

const TIMELINE_MAP: Record<string, string> = {
  urgent: 'ASAP (Rush Fee)',
  '1week': '1-2 Weeks',
  '2weeks': '2-4 Weeks',
  flexible: 'Flexible',
};

export async function POST(req: NextRequest) {
  // Instantiate inside the handler — avoids build-time evaluation failure
  // when RESEND_API_KEY is not present in the build environment.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { status: 'SYSTEM_ERROR', error: 'Email service not configured.' },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, phone, type, timeline, details } = body;

    // ─── EMAIL 1: INTERNAL SYSTEM LOG (to Developer) ────────────────────────
    const internalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SYSTEM LOG // NEW TRANSMISSION</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: 'Courier New', Courier, monospace;
      padding: 40px 32px;
    }
    .header {
      border-bottom: 1px solid #333;
      padding-bottom: 20px;
      margin-bottom: 28px;
    }
    .header .label {
      font-size: 10px;
      letter-spacing: 0.3em;
      color: #555;
      margin-bottom: 6px;
    }
    .header h1 {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #fff;
    }
    .header .timestamp {
      font-size: 11px;
      color: #444;
      margin-top: 6px;
      letter-spacing: 0.1em;
    }
    .log-block {
      margin-bottom: 8px;
    }
    .log-block .key {
      font-size: 10px;
      letter-spacing: 0.25em;
      color: #555;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .log-block .value {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      padding: 10px 14px;
      border-left: 2px solid #fff;
      background: #0a0a0a;
      letter-spacing: 0.05em;
      word-break: break-word;
    }
    .value.memo {
      font-size: 13px;
      line-height: 1.7;
      font-weight: 400;
    }
    .divider {
      border: none;
      border-top: 1px dashed #222;
      margin: 20px 0;
    }
    .footer {
      margin-top: 32px;
      font-size: 10px;
      color: #333;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    .badge {
      display: inline-block;
      background: #fff;
      color: #000;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.3em;
      padding: 3px 8px;
      margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="label">// CONSOLE LOGS BY TEJA</div>
    <h1>NEW TRANSMISSION RECEIVED</h1>
    <div class="timestamp">TIMESTAMP: ${new Date().toISOString()}</div>
  </div>

  <span class="badge">INBOUND // PROJECT BRIEF</span>

  <div class="log-block">
    <div class="key">CLIENT_NAME</div>
    <div class="value">${name || 'N/A'}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">CLIENT_EMAIL</div>
    <div class="value">${email || 'N/A'}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">CLIENT_PHONE</div>
    <div class="value">${phone || 'NOT_PROVIDED'}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">PROJECT_TYPE</div>
    <div class="value">${PROJECT_TYPE_MAP[type] || type || 'N/A'}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">TIMELINE</div>
    <div class="value">${TIMELINE_MAP[timeline] || timeline || 'N/A'}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">PROJECT_DESCRIPTION</div>
    <div class="value memo">${details || 'N/A'}</div>
  </div>

  <div class="footer">
    END OF TRANSMISSION // CONSOLE LOGS SYSTEM v1.0
  </div>
</body>
</html>`;

    // ─── EMAIL 2: CLIENT RECEIPT (High-Aesthetic B&W) ────────────────────────
    const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>INITIALIZATION SUCCESSFUL.</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      padding: 0;
    }
    .wrapper {
      max-width: 580px;
      margin: 0 auto;
      padding: 56px 40px 48px;
    }
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.4em;
      color: #444;
      text-transform: uppercase;
      margin-bottom: 48px;
    }
    .headline {
      font-size: 42px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: #fff;
      margin-bottom: 12px;
    }
    .sub-headline {
      font-size: 13px;
      color: #555;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 48px;
    }
    .divider-line {
      border: none;
      border-top: 1px solid #1a1a1a;
      margin: 32px 0;
    }
    .section-label {
      font-size: 9px;
      letter-spacing: 0.4em;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 12px 0;
      border-bottom: 1px solid #111;
    }
    .summary-item:last-child {
      border-bottom: none;
    }
    .summary-key {
      font-size: 11px;
      letter-spacing: 0.15em;
      color: #444;
      text-transform: uppercase;
    }
    .summary-value {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-align: right;
      max-width: 60%;
    }
    .details-block {
      background: #0a0a0a;
      border: 1px solid #1a1a1a;
      padding: 20px 24px;
      margin-top: 8px;
    }
    .details-text {
      font-size: 13px;
      color: #888;
      line-height: 1.8;
    }
    .promise-block {
      margin-top: 40px;
      padding: 28px 0;
      border-top: 1px solid #1a1a1a;
      border-bottom: 1px solid #1a1a1a;
    }
    .promise-text {
      font-size: 15px;
      font-weight: 300;
      color: #aaa;
      line-height: 1.7;
    }
    .promise-text strong {
      color: #fff;
      font-weight: 700;
    }
    .signature-block {
      margin-top: 48px;
    }
    .signature-name {
      font-size: 11px;
      letter-spacing: 0.3em;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .signature-tagline {
      font-size: 18px;
      font-weight: 900;
      color: #fff;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .signature-tagline .accent {
      color: #fff;
      display: block;
      font-size: 13px;
      font-weight: 300;
      color: #555;
      letter-spacing: 0.1em;
      margin-top: 6px;
    }
    .footer-strip {
      margin-top: 56px;
      padding-top: 24px;
      border-top: 1px solid #0f0f0f;
      font-size: 9px;
      color: #2a2a2a;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <div class="eyebrow">CONSOLE LOGS // TRANSMISSION COMPLETE</div>

    <h1 class="headline">INITIALIZATION<br />SUCCESSFUL.</h1>
    <p class="sub-headline">Your brief has been received and logged.</p>

    <hr class="divider-line" />

    <div class="section-label">// PROJECT SUMMARY</div>

    <div class="summary-item">
      <span class="summary-key">Client</span>
      <span class="summary-value">${name}</span>
    </div>
    <div class="summary-item">
      <span class="summary-key">Project Type</span>
      <span class="summary-value">${PROJECT_TYPE_MAP[type] || type || 'N/A'}</span>
    </div>
    <div class="summary-item">
      <span class="summary-key">Timeline</span>
      <span class="summary-value">${TIMELINE_MAP[timeline] || timeline || 'N/A'}</span>
    </div>

    <div style="margin-top: 16px;">
      <div class="section-label">// BRIEF</div>
      <div class="details-block">
        <p class="details-text">${details || 'No additional details provided.'}</p>
      </div>
    </div>

    <hr class="divider-line" />

    <div class="promise-block">
      <p class="promise-text">
        I've read your brief. I'll respond within <strong>24 hours</strong> with a tailored approach — 
        no templates, no guesswork. Every decision will have a reason behind it.
      </p>
    </div>

    <div class="signature-block">
      <div class="signature-name">From the desk of</div>
      <div class="signature-tagline">
        TEJA
        <span class="accent">SO, I AM YOUR DEVELOPER ARTIST.<br />Clear by Design. Designed to Convert.</span>
      </div>
    </div>

    <div class="footer-strip">
      CONSOLE LOGS BY TEJA // ${new Date().getFullYear()} // ALL SYSTEMS OPERATIONAL
    </div>
  </div>
</body>
</html>`;

    // ─── DUAL DISPATCH via Promise.all ───────────────────────────────────────
    //
    // TODO: Once tejasriram.live is verified at resend.com/domains:
    //   1. Change `from` to 'hello@tejasriram.live' on both emails
    //   2. Change client receipt `to` back to: email  (the form submitter)
    //   3. Remove the "(FOR: ...)" prefix from the client subject line
    //
    // CURRENT MODE — Resend sandbox: can only send to verified owner address.
    // Client's email is captured in the subject so you can reply to them manually.
    const OWNER_EMAIL = 'tejasriramungarala@gmail.com';

    const [internalResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: OWNER_EMAIL,
        subject: `[SYSTEM LOG] New transmission from ${name} — ${PROJECT_TYPE_MAP[type] || type}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: OWNER_EMAIL, // ← swap to `email` once domain is verified
        subject: `[CLIENT COPY — FOR: ${email}] INITIALIZATION SUCCESSFUL. // CONSOLE LOGS`,
        html: clientHtml,
      }),
    ]);

    // Check for errors from Resend
    if (internalResult.error || clientResult.error) {
      const errMsg = internalResult.error?.message || clientResult.error?.message;
      console.error('[SEND_ERROR]', errMsg);
      return NextResponse.json({ status: 'SYSTEM_ERROR', error: errMsg }, { status: 500 });
    }

    return NextResponse.json({ status: 'SYSTEM_READY' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API_ERROR]', message);
    return NextResponse.json({ status: 'SYSTEM_ERROR', error: message }, { status: 500 });
  }
}
