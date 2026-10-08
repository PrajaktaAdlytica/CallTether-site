"use client";
import { useState, type FormEvent } from "react";
import { Icon } from "./ui";
import Link from "next/link";
export function RequestForm({
  mode = "demo",
  compact = false,
}: {
  mode?: "demo" | "pilot" | "contact";
  compact?: boolean;
}) {
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setBusy(false);
    setComplete(true);
  }
  if (complete)
    return (
      <div className="form-success" role="status">
        <div className="success-icon">
          <Icon name="check" />
        </div>
        <h3>Your preview is complete.</h3>
        <p>
          This website is a local concept. Your details have not been sent or
          stored. Form delivery will be connected before launch.
        </p>
        <button className="button secondary" onClick={() => setComplete(false)}>
          Back to the form
          <Icon name="arrow-left" />
        </button>
      </div>
    );
  return (
    <form
      className={`request-form ${compact ? "compact" : ""}`}
      onSubmit={submit}
    >
      <div className="form-disclosure">
        <Icon name="info" />
        <span>
          Preview form · Nothing is sent or stored. Use sample details.
        </span>
      </div>
      <div className="form-row">
        <label>
          Full name <span>Required</span>
          <input
            name="name"
            autoComplete="off"
            placeholder="Alex Morgan"
            required
          />
        </label>
        <label>
          Work email <span>Required</span>
          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="alex@example.com"
            required
          />
        </label>
      </div>
      {mode !== "contact" && (
        <div className="form-row">
          <label>
            Company <span>Required</span>
            <input
              name="company"
              autoComplete="off"
              placeholder="Your organization"
              required
            />
          </label>
          <label>
            Your role
            <select name="role" defaultValue="">
              <option value="" disabled>
                Select a role
              </option>
              <option>Security & governance</option>
              <option>Platform engineering</option>
              <option>Operations</option>
              <option>Founder / leadership</option>
              <option>Other</option>
            </select>
          </label>
        </div>
      )}
      <label>
        {mode === "contact"
          ? "What would you like to discuss?"
          : "Which agent workflow would you like to explore?"}
        <select name="workflow" defaultValue="">
          <option value="" disabled>
            Choose a topic
          </option>
          <option>Database reads & exports</option>
          <option>Customer support actions</option>
          <option>Email & external destinations</option>
          <option>Human approval workflows</option>
          <option>General question</option>
        </select>
      </label>
      {!compact && (
        <label>
          {mode === "pilot"
            ? "What would a successful pilot show?"
            : "Anything else we should know?"}
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us about the boundary you want to make clearer."
          />
        </label>
      )}
      <button
        disabled={busy}
        className="button primary form-submit"
        type="submit"
      >
        <span>
          {busy
            ? "Preparing preview…"
            : mode === "demo"
              ? "Preview demo request"
              : mode === "pilot"
                ? "Preview pilot request"
                : "Preview message"}
        </span>
        <Icon name={busy ? "spinner" : "arrow-right"} />
      </button>
      <p className="form-footnote">
        Prototype walkthrough · Synthetic data.{" "}
        <Link href="/legal/privacy">Privacy information</Link>
      </p>
    </form>
  );
}
export function SignInForm() {
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState(false);
  return (
    <form
      className="signin-form"
      onSubmit={(e) => {
        e.preventDefault();
        setNotice(true);
      }}
    >
      <div className="form-disclosure">
        <Icon name="info" />
        <span>Workspace preview. Use sample credentials only.</span>
      </div>
      <label>
        Work email
        <input
          type="email"
          autoComplete="off"
          placeholder="alex@example.com"
          required
        />
      </label>
      <label>
        Password
        <div className="password-field">
          <input
            type={show ? "text" : "password"}
            autoComplete="off"
            placeholder="Sample password"
            required
            minLength={8}
          />
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow(!show)}
          >
            <Icon name={show ? "eye-off" : "eye"} />
          </button>
        </div>
      </label>
      <div className="signin-help">
        <span>Invitation required</span>
        <Link href="/contact?topic=workspace-access">
          Need help signing in?
        </Link>
      </div>
      <button className="button primary form-submit" type="submit">
        Preview sign in
        <Icon name="arrow-right" />
      </button>
      {notice && (
        <p className="inline-notice" role="status">
          <Icon name="info" />
          Authentication is not connected. No credentials were sent or stored.
        </p>
      )}
      <p className="form-footnote">
        New to CallTether?{" "}
        <Link href="/request-demo">Request a walkthrough</Link>
      </p>
    </form>
  );
}
