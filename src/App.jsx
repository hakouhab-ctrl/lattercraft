import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0c;
    --cream: #f5f0e8;
    --gold: #c9a84c;
    --gold-light: #e8d5a3;
    --warm-gray: #8a8378;
    --paper: #faf7f2;
    --border: #e0d8cc;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); }

  .app { min-height: 100vh; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(245,240,232,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em;
    color: var(--ink); cursor: pointer;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-link {
    font-size: 0.875rem; font-weight: 500; color: var(--warm-gray);
    cursor: pointer; transition: color 0.2s; background: none; border: none;
    letter-spacing: 0.02em;
  }
  .nav-link:hover { color: var(--ink); }
  .nav-cta {
    background: var(--ink); color: var(--cream);
    padding: 0.6rem 1.4rem; border-radius: 2px;
    font-size: 0.875rem; font-weight: 500; cursor: pointer;
    border: none; transition: background 0.2s; letter-spacing: 0.03em;
  }
  .nav-cta:hover { background: var(--gold); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 8rem 2rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%);
  }
  .hero-rule {
    width: 60px; height: 1px; background: var(--gold);
    margin-bottom: 1.5rem;
  }
  .hero-label {
    font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 1.2rem;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 1.05; font-weight: 900;
    text-align: center; max-width: 780px;
    letter-spacing: -0.03em; margin-bottom: 1.5rem;
  }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub {
    font-size: 1.1rem; color: var(--warm-gray); font-weight: 300;
    max-width: 480px; text-align: center; line-height: 1.7;
    margin-bottom: 3rem;
  }
  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center; }
  .btn-primary {
    background: var(--ink); color: var(--cream);
    padding: 0.9rem 2.2rem; border: none; border-radius: 2px;
    font-size: 0.95rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.03em;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-primary:hover { background: var(--gold); transform: translateY(-1px); }
  .btn-secondary {
    background: transparent; color: var(--ink);
    padding: 0.9rem 2.2rem; border: 1px solid var(--border); border-radius: 2px;
    font-size: 0.95rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.03em;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-secondary:hover { border-color: var(--ink); }
  .hero-stats {
    display: flex; gap: 3rem; margin-top: 5rem;
    border-top: 1px solid var(--border); padding-top: 2.5rem;
    flex-wrap: wrap; justify-content: center;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700; color: var(--ink);
  }
  .stat-label { font-size: 0.8rem; color: var(--warm-gray); margin-top: 0.2rem; letter-spacing: 0.05em; }

  /* HOW IT WORKS */
  .section {
    padding: 6rem 2rem; max-width: 1100px; margin: 0 auto;
  }
  .section-label {
    font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 0.8rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 3rem;
  }
  .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
  .step {
    padding: 2rem; border: 1px solid var(--border); border-radius: 4px;
    background: var(--cream); position: relative;
  }
  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 3rem; font-weight: 900; color: var(--gold-light);
    line-height: 1; margin-bottom: 1rem;
  }
  .step-title { font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem; }
  .step-desc { font-size: 0.875rem; color: var(--warm-gray); line-height: 1.6; }

  /* GENERATOR PAGE */
  .gen-page {
    min-height: 100vh; padding: 7rem 2rem 4rem;
    max-width: 900px; margin: 0 auto;
  }
  .gen-header { margin-bottom: 2.5rem; }
  .gen-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem;
  }
  .gen-sub { color: var(--warm-gray); font-size: 0.95rem; }
  .gen-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  @media(max-width: 640px) { .gen-grid { grid-template-columns: 1fr; } }
  .field { display: flex; flex-direction: column; gap: 0.5rem; }
  .field.full { grid-column: 1 / -1; }
  label { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--warm-gray); }
  textarea, input, select {
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 2px; padding: 0.8rem 1rem;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    color: var(--ink); outline: none; transition: border-color 0.2s;
    resize: vertical;
  }
  textarea:focus, input:focus, select:focus { border-color: var(--gold); }
  .gen-actions { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .btn-generate {
    background: var(--ink); color: var(--cream);
    padding: 1rem 2.5rem; border: none; border-radius: 2px;
    font-size: 1rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .btn-generate:hover:not(:disabled) { background: var(--gold); }
  .btn-generate:disabled { opacity: 0.5; cursor: not-allowed; }

  /* RESULT */
  .result-box {
    margin-top: 2.5rem; background: var(--cream);
    border: 1px solid var(--border); border-radius: 4px; overflow: hidden;
  }
  .result-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.5rem; border-bottom: 1px solid var(--border);
    background: white;
  }
  .result-title { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--warm-gray); }
  .result-actions-bar { display: flex; gap: 0.5rem; }
  .btn-copy, .btn-reset {
    padding: 0.4rem 1rem; border-radius: 2px; font-size: 0.8rem;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: all 0.2s;
  }
  .btn-copy { background: var(--ink); color: var(--cream); border: none; }
  .btn-copy:hover { background: var(--gold); }
  .btn-reset { background: transparent; border: 1px solid var(--border); color: var(--warm-gray); }
  .btn-reset:hover { border-color: var(--ink); color: var(--ink); }
  .result-content {
    padding: 2rem; white-space: pre-wrap; line-height: 1.8;
    font-size: 0.95rem; color: var(--ink);
  }
  .loading-box {
    padding: 3rem; text-align: center; color: var(--warm-gray);
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
  }
  .spinner {
    width: 32px; height: 32px; border: 2px solid var(--border);
    border-top-color: var(--gold); border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* PRICING */
  .pricing-page { min-height: 100vh; padding: 7rem 2rem 5rem; }
  .pricing-inner { max-width: 900px; margin: 0 auto; }
  .pricing-header { text-align: center; margin-bottom: 4rem; }
  .pricing-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 0.8rem;
  }
  .pricing-sub { color: var(--warm-gray); font-size: 1rem; }
  .pricing-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
  .pricing-card {
    border: 1px solid var(--border); border-radius: 4px;
    padding: 2.5rem 2rem; background: var(--cream);
    display: flex; flex-direction: column; gap: 1.5rem;
    position: relative; transition: transform 0.2s;
  }
  .pricing-card:hover { transform: translateY(-3px); }
  .pricing-card.featured {
    background: var(--ink); color: var(--cream); border-color: var(--ink);
  }
  .featured-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--gold); color: var(--ink);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.3rem 1rem; border-radius: 20px;
  }
  .plan-name { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--gold); }
  .plan-price { font-family: 'Playfair Display', serif; }
  .plan-amount { font-size: 2.8rem; font-weight: 700; }
  .plan-period { font-size: 0.9rem; opacity: 0.6; }
  .plan-desc { font-size: 0.875rem; opacity: 0.7; line-height: 1.6; }
  .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; flex: 1; }
  .plan-features li { font-size: 0.875rem; display: flex; gap: 0.6rem; align-items: flex-start; }
  .check { color: var(--gold); font-weight: 700; flex-shrink: 0; }
  .pricing-card.featured .plan-features li { opacity: 0.9; }
  .btn-plan {
    padding: 0.9rem; border-radius: 2px; font-size: 0.9rem;
    font-weight: 500; cursor: pointer; text-align: center;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s; border: none;
  }
  .btn-plan-light { background: var(--ink); color: var(--cream); }
  .btn-plan-light:hover { background: var(--gold); }
  .btn-plan-dark { background: var(--cream); color: var(--ink); }
  .btn-plan-dark:hover { background: var(--gold); }
  .pricing-note { text-align: center; margin-top: 2.5rem; font-size: 0.85rem; color: var(--warm-gray); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border); padding: 2rem 3rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
  }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; }
  .footer-logo span { color: var(--gold); }
  .footer-copy { font-size: 0.8rem; color: var(--warm-gray); }

  .error-msg { color: #c0392b; font-size: 0.85rem; margin-top: 0.5rem; }
  .copied { background: #2ecc71 !important; }
`;

const TONES = ["Professional", "Confident", "Enthusiastic", "Creative", "Concise"];

export default function App() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState({ jobTitle: "", company: "", jobDesc: "", experience: "", skills: "", tone: "Professional" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) resultRef.current.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.jobDesc.trim() || !form.experience.trim()) {
      setError("Please fill in the job description and your experience.");
      return;
    }
    setError(""); setResult(""); setLoading(true);
    try {
      const prompt = `Write a professional cover letter for the following:

Job Title: ${form.jobTitle || "the position"}
Company: ${form.company || "the company"}
Job Description: ${form.jobDesc}
Candidate Experience: ${form.experience}
Skills: ${form.skills || "not specified"}
Tone: ${form.tone}

Write a compelling, tailored cover letter that:
- Starts with a strong opening hook
- Connects the candidate's experience to the job requirements
- Highlights 2-3 key achievements or skills
- Ends with a confident call to action
- Is 3-4 paragraphs, ready to send
- Do NOT include placeholder brackets — write it as a complete, finished letter`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Something went wrong. Please try again.");
    } catch {
      setError("Failed to generate. Please check your connection and try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav>
          <div className="nav-logo" onClick={() => setPage("home")}>Letter<span>Craft</span></div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => setPage("home")}>Home</button>
            <button className="nav-link" onClick={() => setPage("pricing")}>Pricing</button>
            <button className="nav-cta" onClick={() => setPage("generator")}>Generate Free →</button>
          </div>
        </nav>

        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-bg" />
              <div className="hero-rule" />
              <div className="hero-label">AI-Powered Cover Letters</div>
              <h1 className="hero-title">
                Land interviews with a <em>perfect</em> cover letter
              </h1>
              <p className="hero-sub">
                Paste a job description, describe your background — get a tailored, professional cover letter in 30 seconds.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => setPage("generator")}>Generate Your Letter →</button>
                <button className="btn-secondary" onClick={() => setPage("pricing")}>View Pricing</button>
              </div>
              <div className="hero-stats">
                <div className="stat"><div className="stat-num">30s</div><div className="stat-label">Average Generation Time</div></div>
                <div className="stat"><div className="stat-num">5+</div><div className="stat-label">Tone Options</div></div>
                <div className="stat"><div className="stat-num">100%</div><div className="stat-label">Tailored to the Job</div></div>
              </div>
            </section>

            <section style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "5rem 2rem" }}>
              <div className="section" style={{ padding: 0 }}>
                <div className="section-label">How It Works</div>
                <h2 className="section-title">Three steps to your dream job</h2>
                <div className="steps">
                  {[
                    { n: "01", t: "Paste the job posting", d: "Copy the job description and drop it into the form. Add the company name and job title." },
                    { n: "02", t: "Describe your background", d: "Briefly list your experience, key skills, and any relevant achievements." },
                    { n: "03", t: "Get your letter", d: "Choose a tone, click generate, and receive a complete, ready-to-send cover letter in seconds." },
                  ].map(s => (
                    <div className="step" key={s.n}>
                      <div className="step-num">{s.n}</div>
                      <div className="step-title">{s.t}</div>
                      <div className="step-desc">{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ padding: "5rem 2rem", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem" }}>
                Ready to write your best cover letter?
              </h2>
              <p style={{ color: "var(--warm-gray)", marginBottom: "2rem" }}>No account needed. Start for free.</p>
              <button className="btn-primary" onClick={() => setPage("generator")}>Generate Now — It's Free →</button>
            </section>
          </>
        )}

        {page === "generator" && (
          <div className="gen-page">
            <div className="gen-header">
              <h1 className="gen-title">Generate Your Cover Letter</h1>
              <p className="gen-sub">Fill in the details below — the more context you give, the better the result.</p>
            </div>
            <div className="gen-grid">
              <div className="field">
                <label>Job Title</label>
                <input placeholder="e.g. Software Engineer" value={form.jobTitle} onChange={e => update("jobTitle", e.target.value)} />
              </div>
              <div className="field">
                <label>Company Name</label>
                <input placeholder="e.g. Google" value={form.company} onChange={e => update("company", e.target.value)} />
              </div>
              <div className="field full">
                <label>Job Description *</label>
                <textarea rows={6} placeholder="Paste the full job description here..." value={form.jobDesc} onChange={e => update("jobDesc", e.target.value)} />
              </div>
              <div className="field full">
                <label>Your Experience *</label>
                <textarea rows={5} placeholder="Briefly describe your background, years of experience, and key achievements..." value={form.experience} onChange={e => update("experience", e.target.value)} />
              </div>
              <div className="field">
                <label>Key Skills</label>
                <input placeholder="e.g. Python, project management, leadership" value={form.skills} onChange={e => update("skills", e.target.value)} />
              </div>
              <div className="field">
                <label>Tone</label>
                <select value={form.tone} onChange={e => update("tone", e.target.value)}>
                  {TONES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            {error && <div className="error-msg">{error}</div>}
            <div className="gen-actions">
              <button className="btn-generate" onClick={generate} disabled={loading}>
                {loading ? <><span className="spinner" style={{ width: 18, height: 18 }} /> Generating...</> : "✦ Generate Cover Letter"}
              </button>
            </div>

            {loading && (
              <div className="result-box">
                <div className="loading-box">
                  <div className="spinner" />
                  <span>Crafting your letter...</span>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="result-box" ref={resultRef}>
                <div className="result-header">
                  <span className="result-title">Your Cover Letter</span>
                  <div className="result-actions-bar">
                    <button className={`btn-copy ${copied ? "copied" : ""}`} onClick={copy}>{copied ? "✓ Copied!" : "Copy"}</button>
                    <button className="btn-reset" onClick={() => setResult("")}>Clear</button>
                  </div>
                </div>
                <div className="result-content">{result}</div>
              </div>
            )}
          </div>
        )}

        {page === "pricing" && (
          <div className="pricing-page">
            <div className="pricing-inner">
              <div className="pricing-header">
                <div className="section-label" style={{ marginBottom: "0.8rem" }}>Simple Pricing</div>
                <h1 className="pricing-title">One tool. Many opportunities.</h1>
                <p className="pricing-sub">Start free. Upgrade when you're ready.</p>
              </div>
              <div className="pricing-cards">
                {[
                  {
                    name: "Starter", amount: "Free", period: "", desc: "Perfect to try it out before you commit.",
                    features: ["3 cover letters/month", "5 tone options", "Copy to clipboard", "Basic support"],
                    btn: "Get Started Free", dark: false, featured: false
                  },
                  {
                    name: "Pro", amount: "$9", period: "/month", desc: "For active job seekers who apply regularly.",
                    features: ["Unlimited cover letters", "All tone options", "Download as PDF", "Priority support", "LinkedIn summary generator"],
                    btn: "Start Pro", dark: true, featured: true
                  },
                  {
                    name: "Pay as you go", amount: "$4.99", period: "/letter", desc: "No subscription. Pay only when you need it.",
                    features: ["Single cover letter", "All tone options", "Download as PDF", "No expiry"],
                    btn: "Buy One Letter", dark: false, featured: false
                  }
                ].map(plan => (
                  <div className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
                    {plan.featured && <div className="featured-badge">Most Popular</div>}
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">
                      <span className="plan-amount">{plan.amount}</span>
                      <span className="plan-period">{plan.period}</span>
                    </div>
                    <div className="plan-desc">{plan.desc}</div>
                    <ul className="plan-features">
                      {plan.features.map(f => <li key={f}><span className="check">✦</span>{f}</li>)}
                    </ul>
                    <button className={`btn-plan ${plan.dark ? "btn-plan-dark" : "btn-plan-light"}`} onClick={() => setPage("generator")}>
                      {plan.btn}
                    </button>
                  </div>
                ))}
              </div>
              <div className="pricing-note">All plans include a 7-day money-back guarantee. No questions asked.</div>
            </div>
          </div>
        )}

        <footer>
          <div className="footer-logo">Letter<span>Craft</span></div>
          <div className="footer-copy">© 2026 LetterCraft. Built with Claude AI.</div>
        </footer>
      </div>
    </>
  );
}
