import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// ─── LABEL MAPS ──────────────────────────────────────────────────────────────
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

// ─── PRODUCTION IDENTITY ─────────────────────────────────────────────────────
const FROM_ADDRESS = 'Teja <hello@tejasriram.live>';
const OWNER_EMAIL = 'tejasriramungarala@gmail.com';

// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Lazy instantiation — never runs at build time, only on live requests.
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

    const projectType = PROJECT_TYPE_MAP[type] || type || 'N/A';
    const timelineStr = TIMELINE_MAP[timeline] || timeline || 'N/A';
    const timestamp = new Date().toISOString();

    // ─── EMAIL 1: INTERNAL SYSTEM LOG (to Developer) ─────────────────────────
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
    .badge {
      display: inline-block;
      background: #fff;
      color: #000;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.3em;
      padding: 4px 10px;
      margin-bottom: 28px;
      text-transform: uppercase;
    }
    .header {
      border-bottom: 1px solid #222;
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
    .log-block { margin-bottom: 10px; }
    .log-block .key {
      font-size: 10px;
      letter-spacing: 0.25em;
      color: #555;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .log-block .value {
      font-size: 15px;
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
      margin: 18px 0;
    }
    .footer {
      margin-top: 32px;
      font-size: 10px;
      color: #333;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <span class="badge">INBOUND // PROJECT BRIEF</span>

  <div class="header">
    <div class="label">// CONSOLE LOGS BY TEJA · tejasriram.live</div>
    <h1>NEW TRANSMISSION RECEIVED</h1>
    <div class="timestamp">TIMESTAMP: ${timestamp}</div>
  </div>

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
    <div class="value">${projectType}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">TIMELINE</div>
    <div class="value">${timelineStr}</div>
  </div>
  <hr class="divider" />

  <div class="log-block">
    <div class="key">PROJECT_DESCRIPTION</div>
    <div class="value memo">${details || 'N/A'}</div>
  </div>

  <div class="footer">
    END OF TRANSMISSION // CONSOLE LOGS SYSTEM · tejasriram.live
  </div>
</body>
</html>`;

    // ─── EMAIL 2: CLIENT RECEIPT — Pure B&W, 1px border ──────────────────────
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
    }
    .wrapper {
      max-width: 580px;
      margin: 0 auto;
      padding: 56px 40px 48px;
      border: 1px solid #1c1c1c;
    }
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.4em;
      color: #444;
      text-transform: uppercase;
      margin-bottom: 48px;
      font-family: 'Courier New', monospace;
    }
    .headline {
      font-size: 44px;
      font-weight: 900;
      line-height: 1.0;
      letter-spacing: -0.03em;
      color: #fff;
      margin-bottom: 10px;
    }
    .sub-headline {
      font-size: 11px;
      color: #555;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 48px;
      font-family: 'Courier New', monospace;
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
      font-family: 'Courier New', monospace;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 13px 0;
      border-bottom: 1px solid #111;
    }
    .summary-item:last-child { border-bottom: none; }
    .summary-key {
      font-size: 10px;
      letter-spacing: 0.15em;
      color: #444;
      text-transform: uppercase;
      font-family: 'Courier New', monospace;
    }
    .summary-value {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-align: right;
      max-width: 60%;
    }
    .details-block {
      background: #080808;
      border: 1px solid #1a1a1a;
      padding: 20px 24px;
      margin-top: 8px;
    }
    .details-text {
      font-size: 13px;
      color: #888;
      line-height: 1.8;
      font-family: 'Courier New', monospace;
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
    .promise-text strong { color: #fff; font-weight: 700; }
    .signature-block { margin-top: 48px; }
    .signature-name {
      font-size: 10px;
      letter-spacing: 0.3em;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 12px;
      font-family: 'Courier New', monospace;
    }
    .signature-tagline {
      font-size: 20px;
      font-weight: 900;
      color: #fff;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
    .signature-mantra {
      display: block;
      font-size: 11px;
      font-weight: 300;
      color: #555;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 8px;
      font-family: 'Courier New', monospace;
    }
    .footer-strip {
      margin-top: 56px;
      padding-top: 20px;
      border-top: 1px solid #111;
      font-size: 9px;
      color: #2a2a2a;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      font-family: 'Courier New', monospace;
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
      <span class="summary-value">${projectType}</span>
    </div>
    <div class="summary-item">
      <span class="summary-key">Timeline</span>
      <span class="summary-value">${timelineStr}</span>
    </div>

    <div style="margin-top: 20px;">
      <div class="section-label">// BRIEF</div>
      <div class="details-block">
        <p class="details-text">${details || 'No additional details provided.'}</p>
      </div>
    </div>

    <hr class="divider-line" />

    <div class="promise-block">
      <p class="promise-text">
        I've read your brief. I'll respond within <strong>24 hours</strong> with a
        tailored approach — no templates, no guesswork. Every decision will have a
        reason behind it.
      </p>
    </div>

    <div class="signature-block">
      <div class="signature-name">From the desk of</div>
      <div class="signature-tagline">
        TEJA
        <span class="signature-mantra">
          SO, I AM YOUR DEVELOPER ARTIST.<br />
          Clear by Design. Designed to Convert.
        </span>
      </div>
    </div>

    <div class="footer-strip">
      CONSOLE LOGS BY TEJA // ${new Date().getFullYear()} // tejasriram.live
    </div>
  </div>
</body>
</html>`;

    // ─── DUAL DISPATCH via Promise.all ───────────────────────────────────────
    const [internalResult, clientResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        subject: `[SYSTEM LOG] New transmission from ${name} — ${projectType}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: 'INITIALIZATION SUCCESSFUL. // CONSOLE LOGS',
        html: clientHtml,
      }),
    ]);

    // ─── ERROR HANDLING ───────────────────────────────────────────────────────
    if (internalResult.error || clientResult.error) {
      const errMsg = internalResult.error?.message || clientResult.error?.message;
      console.error('[SEND_ERROR]', errMsg);
      return NextResponse.json({ status: 'SYSTEM_ERROR', error: errMsg }, { status: 500 });
    }

    // ─── SYSTEM_READY FEEDBACK ────────────────────────────────────────────────
    console.log(`SYSTEM_READY: Transmission authorized via tejasriram.live → [${OWNER_EMAIL}] + [${email}]`);

    return NextResponse.json({ status: 'SYSTEM_READY' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[API_ERROR]', message);
    return NextResponse.json({ status: 'SYSTEM_ERROR', error: message }, { status: 500 });
  }
}
