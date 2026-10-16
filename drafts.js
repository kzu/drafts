window.DRAFTS = {
  "files": [
    {
      "path": "jobs-api.html",
      "title": "Jobs API — Design",
      "headings": [
        {
          "level": 1,
          "text": "Jobs API"
        },
        {
          "level": 2,
          "text": "1 Purpose"
        },
        {
          "level": 2,
          "text": "2 Technical names"
        },
        {
          "level": 2,
          "text": "3 Parts"
        },
        {
          "level": 2,
          "text": "4 Routes"
        },
        {
          "level": 2,
          "text": "5 Flows"
        },
        {
          "level": 3,
          "text": "5.1 Upload the input files"
        },
        {
          "level": 3,
          "text": "5.2 Start the job"
        },
        {
          "level": 3,
          "text": "5.3 Read inputs and write outputs"
        },
        {
          "level": 3,
          "text": "5.4 Report status"
        },
        {
          "level": 3,
          "text": "5.5 Wait, then download"
        },
        {
          "level": 2,
          "text": "6 Key decisions"
        },
        {
          "level": 2,
          "text": "7 The row"
        },
        {
          "level": 2,
          "text": "8 Access"
        }
      ]
    },
    {
      "path": "jobs-mercadopago-qr.html",
      "title": "Jobs API — MercadoPago QR Payment",
      "headings": [
        {
          "level": 1,
          "text": "MercadoPago QR for paid jobs"
        },
        {
          "level": 2,
          "text": "1. Summary"
        },
        {
          "level": 2,
          "text": "2. Status model"
        },
        {
          "level": 2,
          "text": "3. Flows"
        },
        {
          "level": 4,
          "text": "Free job (no amount)"
        },
        {
          "level": 4,
          "text": "Paid job (ARS amount)"
        },
        {
          "level": 3,
          "text": "Paid path in detail"
        },
        {
          "level": 2,
          "text": "4. API surface"
        },
        {
          "level": 3,
          "text": "Start job — POST /jobs/{id}"
        },
        {
          "level": 3,
          "text": "Public status"
        },
        {
          "level": 3,
          "text": "Webhook — POST /webhooks/mercadopago"
        },
        {
          "level": 3,
          "text": "MCP gate"
        },
        {
          "level": 2,
          "text": "5. What shipped in the repo"
        },
        {
          "level": 2,
          "text": "6. Your MercadoPago checklist"
        },
        {
          "level": 3,
          "text": "Still on you — not done in code"
        },
        {
          "level": 2,
          "text": "7. Cloudflare / D1 you still need"
        },
        {
          "level": 2,
          "text": "8. How to test locally"
        },
        {
          "level": 3,
          "text": "Manual smoke after deploy"
        },
        {
          "level": 2,
          "text": "9. Caveats"
        }
      ]
    },
    {
      "path": "muse-jobs-connector.html",
      "title": "Jobs → Muse Connector — Draft",
      "headings": [
        {
          "level": 1,
          "text": "Jobs processing as a Muse connector"
        },
        {
          "level": 2,
          "text": "1. The scene we’re aiming for"
        },
        {
          "level": 2,
          "text": "2. What we already have"
        },
        {
          "level": 4,
          "text": "Jobs engine"
        },
        {
          "level": 4,
          "text": "IPC+3 product shell"
        },
        {
          "level": 2,
          "text": "3. What Muse’s platform demands"
        },
        {
          "level": 2,
          "text": "4. The gap map"
        },
        {
          "level": 2,
          "text": "5. Proposed Muse-facing tool surface"
        },
        {
          "level": 3,
          "text": "Happy path as Muse sees it"
        },
        {
          "level": 2,
          "text": "6. Payment: three realistic tracks"
        },
        {
          "level": 4,
          "text": "Keep Mercado Pago for the web"
        },
        {
          "level": 4,
          "text": "A second pay rail for Muse"
        },
        {
          "level": 4,
          "text": "Paid job, caller finishes the work"
        },
        {
          "level": 2,
          "text": "7. Build plan (what it would take)"
        },
        {
          "level": 3,
          "text": "Phase 0 — Decide the product border"
        },
        {
          "level": 3,
          "text": "Phase 1 — Consumer MCP in front of jobs"
        },
        {
          "level": 3,
          "text": "Phase 2 — A pay gate Muse is allowed to finish"
        },
        {
          "level": 3,
          "text": "Phase 3 — Platform intake"
        },
        {
          "level": 3,
          "text": "Phase 4 — Hardening that review will poke"
        },
        {
          "level": 2,
          "text": "8. Open questions to settle before coding"
        },
        {
          "level": 3,
          "text": "Bottom line"
        }
      ]
    },
    {
      "path": "nativevalidation-format-message.html",
      "title": "FormatMessage in NativeValidation",
      "headings": [
        {
          "level": 1,
          "text": "FormatMessage in NativeValidation",
          "id": "format-message"
        },
        {
          "level": 2,
          "text": "The runtime method",
          "id": "runtime"
        },
        {
          "level": 2,
          "text": "Why NativeValidation does not call it",
          "id": "why-not-call"
        },
        {
          "level": 2,
          "text": "The placeholder contract",
          "id": "contract"
        },
        {
          "level": 3,
          "text": "StringLength and Length",
          "id": "length-order"
        },
        {
          "level": 3,
          "text": "StringLength"
        },
        {
          "level": 3,
          "text": "Length"
        },
        {
          "level": 3,
          "text": "File extensions",
          "id": "extensions"
        },
        {
          "level": 3,
          "text": "Raw property"
        },
        {
          "level": 3,
          "text": "What {1} receives"
        },
        {
          "level": 2,
          "text": "Choosing the template",
          "id": "template"
        },
        {
          "level": 2,
          "text": "Generated checks",
          "id": "generator"
        },
        {
          "level": 2,
          "text": "What stays out",
          "id": "limits"
        },
        {
          "level": 2,
          "text": "How it was checked",
          "id": "evidence"
        }
      ]
    }
  ]
};
