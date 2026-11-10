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
    },
    {
      "path": "chebot/comparison.html",
      "title": "CheBot vs CodeAlta vs Claude Cowork",
      "headings": [
        {
          "level": 1,
          "text": "Tres productos, un solo motor"
        },
        {
          "level": 2,
          "text": "CodeAlta"
        },
        {
          "level": 2,
          "text": "Claude Cowork"
        },
        {
          "level": 2,
          "text": "CheBot"
        },
        {
          "level": 3,
          "text": "El wedge de CheBot contra Cowork"
        },
        {
          "level": 2,
          "text": "Mapeo escenario por escenario"
        },
        {
          "level": 2,
          "text": "Dimensión por dimensión"
        },
        {
          "level": 3,
          "text": "Qué se queda el fork de CodeAlta"
        },
        {
          "level": 3,
          "text": "Qué hace distinto de Cowork"
        },
        {
          "level": 3,
          "text": "Dónde CheBot pierde contra Cowork"
        },
        {
          "level": 3,
          "text": "Dónde se podrían encontrar"
        }
      ]
    },
    {
      "path": "chebot/concept-1-helpers.html",
      "title": "CheBot — estantería de bots",
      "headings": [
        {
          "level": 1,
          "text": "Buenas, Marina"
        }
      ]
    },
    {
      "path": "chebot/concept-2-feed.html",
      "title": "CheBot — feed del día",
      "headings": [
        {
          "level": 1,
          "text": "Martes, 10 de nov."
        },
        {
          "level": 3,
          "text": "Esperan tu OK"
        },
        {
          "level": 3,
          "text": "Tus bots"
        }
      ]
    },
    {
      "path": "chebot/concept-3-dashboard.html",
      "title": "CheBot — tablero de la familia",
      "headings": [
        {
          "level": 1,
          "text": "Finanzas del hogar · noviembre"
        },
        {
          "level": 4,
          "text": "Gastos por rubro — noviembre"
        },
        {
          "level": 4,
          "text": "Créditos CheBot — este mes"
        }
      ]
    },
    {
      "path": "chebot/index.html",
      "title": "CheBot — galería de conceptos",
      "headings": [
        {
          "level": 1,
          "text": "CheBot"
        },
        {
          "level": 2,
          "text": "La estantería de bots"
        },
        {
          "level": 2,
          "text": "El feed del día"
        },
        {
          "level": 2,
          "text": "Tablero"
        },
        {
          "level": 2,
          "text": "Mercado de bots"
        },
        {
          "level": 2,
          "text": "Créditos por uso"
        },
        {
          "level": 2,
          "text": "CheBot vs. CodeAlta vs. Claude Cowork"
        },
        {
          "level": 3,
          "text": "Cero código en pantalla"
        },
        {
          "level": 3,
          "text": "Personas, no procesos"
        },
        {
          "level": 3,
          "text": "Aprobación por defecto"
        },
        {
          "level": 3,
          "text": "Tienda primero"
        }
      ]
    },
    {
      "path": "chebot/marketplace.html",
      "title": "CheBot — tienda de bots",
      "headings": [
        {
          "level": 1,
          "text": "Tienda"
        },
        {
          "level": 2,
          "text": "Tomás — AFIP y Monotributo"
        },
        {
          "level": 3,
          "text": "Popular con anfitriones de Airbnb"
        },
        {
          "level": 3,
          "text": "Popular con abogadas y abogados independientes"
        },
        {
          "level": 3,
          "text": "Popular con familias"
        }
      ]
    },
    {
      "path": "chebot/pricing.html",
      "title": "CheBot — precios y créditos",
      "headings": [
        {
          "level": 1,
          "text": "Precios y créditos"
        },
        {
          "level": 3,
          "text": "Una unidad, igual en toda la tienda"
        },
        {
          "level": 2,
          "text": "Créditos por acción"
        },
        {
          "level": 2,
          "text": "Lo que ves en tu página de uso"
        },
        {
          "level": 2,
          "text": "Economía del publicador"
        },
        {
          "level": 4,
          "text": "El usuario no apuesta \"¿me conviene este bot?\""
        },
        {
          "level": 4,
          "text": "Los publicadores compiten por eficiencia, no por marketing"
        },
        {
          "level": 4,
          "text": "Las aprobaciones son el lugar ideal para mostrar costo"
        },
        {
          "level": 4,
          "text": "Los créditos son la unidad justa para avisos del celu"
        },
        {
          "level": 4,
          "text": "Nada drena en silencio"
        }
      ]
    }
  ]
};
