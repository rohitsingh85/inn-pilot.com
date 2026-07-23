interface Env {
  BREVO_API_KEY: string;
}

interface ContactRequestBody {
  name?: string;
  email?: string;
  property_name?: string;
  property_location?: string;
  message?: string;
  plan?: string;
  _hp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const ALLOWED_PLANS = ["free", "starter", "professional", "enterprise"] as const;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_UTM_LENGTH = 200;

function sanitize(input: string, maxLen: number): string {
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(status: number, body: Record<string, unknown>, corsOrigin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin") || "*";

  if (!context.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not configured");
    return jsonResponse(500, { ok: false, error: "Service not configured" }, origin);
  }

  let body: ContactRequestBody;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: "Invalid request body" }, origin);
  }

  const name = sanitize(body.name || "", MAX_FIELD_LENGTH);
  const email = sanitize(body.email || "", MAX_FIELD_LENGTH);
  const propertyName = sanitize(body.property_name || "", MAX_FIELD_LENGTH);
  const propertyLocation = sanitize(body.property_location || "", MAX_FIELD_LENGTH);
  const message = sanitize(body.message || "", MAX_MESSAGE_LENGTH);
  const plan = sanitize(body.plan || "", 50).toLowerCase();

  const errors: string[] = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Invalid email address");
  if (!propertyName) errors.push("Property name is required");
  if (!propertyLocation) errors.push("Property location is required");

  if (errors.length > 0) {
    return jsonResponse(400, { ok: false, errors }, origin);
  }

  if (body._hp) {
    return jsonResponse(200, { ok: true }, origin);
  }

  if (plan && !ALLOWED_PLANS.includes(plan as typeof ALLOWED_PLANS[number])) {
    return jsonResponse(400, { ok: false, errors: ["Invalid plan value"] }, origin);
  }

  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const val = body[key];
    if (val && typeof val === "string") {
      utm[key] = sanitize(val, MAX_UTM_LENGTH);
    }
  }

  let trackingId: string;
  try {
    trackingId = crypto.randomUUID();
  } catch {
    trackingId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  const planLine = plan ? `\nPlan Interest: ${plan.charAt(0).toUpperCase() + plan.slice(1)}` : "";

  const utmLines = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.replace("utm_", "").charAt(0).toUpperCase() + k.replace("utm_", "").slice(1)}: ${v}`)
    .join("\n");

  const utmBlock = utmLines ? `\n\n--- UTM Tracking ---\n${utmLines}` : "";

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #0a0f1a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #10b981; font-size: 20px; margin: 0;">New Access Request</h1>
        <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">InnPilot Marketing Site</p>
      </div>
      <div style="background: #f8fafc; padding: 24px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 140px; vertical-align: top;">Name</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${name.replace(/</g, "&lt;")}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${email.replace(/"/g, "&quot;")}" style="color: #10b981;">${email.replace(/</g, "&lt;")}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Property</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${propertyName.replace(/</g, "&lt;")}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Location</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${propertyLocation.replace(/</g, "&lt;")}</td></tr>
          ${planLine ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Plan Interest</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${plan.charAt(0).toUpperCase() + plan.slice(1)}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${message.replace(/</g, "&lt;").replace(/\n/g, "<br>")}</td></tr>` : ""}
        </table>
        ${utmLines ? `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">UTM Tracking</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${Object.entries(utm).filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding: 4px 0; color: #64748b; font-size: 12px;">${k}</td><td style="padding: 4px 0; color: #475569; font-size: 12px;">${v.replace(/</g, "&lt;")}</td></tr>`).join("")}
          </table>
        </div>` : ""}
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">Tracking ID: ${trackingId} | Submitted via inn-pilot.com</p>
        </div>
      </div>
    </div>`;

  const textContent = `New Access Request — InnPilot Marketing Site\n\nName: ${name}\nEmail: ${email}\nProperty: ${propertyName}\nLocation: ${ propertyLocation}${planLine}\n${message ? `\nMessage:\n${message}\n` : ""}${utmBlock}\n\nTracking ID: ${trackingId}\nSubmitted via inn-pilot.com`;

  const subject = `InnPilot Access Request — ${propertyName}${plan ? ` (${plan.charAt(0).toUpperCase() + plan.slice(1)})` : ""}`;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": context.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: "support@inn-pilot.com", name: "InnPilot" },
        to: [{ email: "support@inn-pilot.com", name: "InnPilot Support" }],
        replyTo: { email, name },
        subject,
        htmlContent,
        textContent,
        tags: ["request-access", "marketing-site"],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "unknown");
      console.error(`Brevo API error: ${res.status} — ${errText}`);
      return jsonResponse(500, { ok: false, error: "Email delivery failed" }, origin);
    }

    return jsonResponse(200, { ok: true, id: trackingId }, origin);
  } catch (err) {
    console.error("Brevo request failed:", err);
    return jsonResponse(500, { ok: false, error: "Email delivery failed" }, origin);
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  const origin = context.request.headers.get("Origin") || "*";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
