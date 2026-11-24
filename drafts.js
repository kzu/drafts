window.DRAFTS = {
  "files": [
    {
      "path": "brk-withdrawal-simulator.html",
      "title": "Living off Berkshire Hathaway — Withdrawal & Cash Buffer Simulator",
      "headings": [
        {
          "level": 1,
          "text": "Living off BRK.A: withdrawals with a cash buffer"
        },
        {
          "level": 2,
          "text": "Inputs"
        },
        {
          "level": 2,
          "text": "Every start date, played back"
        },
        {
          "level": 2,
          "text": "Portfolio over time"
        },
        {
          "level": 2,
          "text": "Same plan, each asset"
        },
        {
          "level": 2,
          "text": "Buffer size compared"
        },
        {
          "level": 2,
          "text": "Withdrawn vs. what’s left"
        },
        {
          "level": 2,
          "text": "BRK.A price and all-time high",
          "id": "priceTitle"
        },
        {
          "level": 2,
          "text": "Annual return: actual vs. smoothed"
        },
        {
          "level": 2,
          "text": "Year by year"
        },
        {
          "level": 2,
          "text": "How it works"
        },
        {
          "level": 3,
          "text": "The rules"
        },
        {
          "level": 3,
          "text": "Assumptions and limits"
        },
        {
          "level": 3,
          "text": "Data"
        }
      ]
    },
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
    },
    {
      "path": "cowork/authoring.html",
      "title": "Cowork: making and changing a task",
      "headings": [
        {
          "level": 1,
          "text": "What should the new task do?"
        },
        {
          "level": 2,
          "text": "Or start from a task"
        },
        {
          "level": 2,
          "text": "What happens next"
        },
        {
          "level": 3,
          "text": "What needs deciding"
        },
        {
          "level": 3,
          "text": "Found in your files, so not asked"
        },
        {
          "level": 3,
          "text": "Answered so far"
        },
        {
          "level": 2,
          "text": "Brief so far"
        },
        {
          "level": 3,
          "text": "Samples"
        },
        {
          "level": 1,
          "text": "Change a task"
        },
        {
          "level": 3,
          "text": "In the brief"
        },
        {
          "level": 3,
          "text": "In the steps"
        },
        {
          "level": 3,
          "text": "Around the task"
        },
        {
          "level": 3,
          "text": "The 14 invoices of run 48, through your draft"
        },
        {
          "level": 1,
          "text": "What Invoice Intake does"
        },
        {
          "level": 3,
          "text": "Ledgerline, version 2.4"
        },
        {
          "level": 3,
          "text": "You3 lines on top"
        },
        {
          "level": 3,
          "text": "What Cowork reads when you change this task"
        },
        {
          "level": 3,
          "text": "Change it"
        },
        {
          "level": 3,
          "text": "Versions"
        }
      ]
    },
    {
      "path": "cowork/concept-1-shelf.html",
      "title": "Cowork concept 1: Shelf",
      "headings": [
        {
          "level": 2,
          "text": "Installed"
        },
        {
          "level": 1,
          "text": "Marketplace"
        },
        {
          "level": 3,
          "text": "Invoice Intake"
        },
        {
          "level": 3,
          "text": "Receipt Renamer"
        },
        {
          "level": 3,
          "text": "Meeting Notes to Actions"
        },
        {
          "level": 3,
          "text": "Weekly Status Digest"
        },
        {
          "level": 3,
          "text": "Contract Clause Check"
        },
        {
          "level": 3,
          "text": "Inbox Triage"
        },
        {
          "level": 3,
          "text": "CSV Cleaner"
        },
        {
          "level": 3,
          "text": "Expense Report Builder"
        },
        {
          "level": 3,
          "text": "Screenshot Sorter"
        },
        {
          "level": 2,
          "text": "Invoice Intake"
        },
        {
          "level": 3,
          "text": "Steps"
        },
        {
          "level": 3,
          "text": "Its own screens"
        },
        {
          "level": 3,
          "text": "What it can touch"
        },
        {
          "level": 1,
          "text": "My tasks"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "What you get"
        },
        {
          "level": 2,
          "text": "Last time"
        },
        {
          "level": 3,
          "text": "Starts Change"
        },
        {
          "level": 3,
          "text": "What it can touch"
        },
        {
          "level": 3,
          "text": "About"
        },
        {
          "level": 1,
          "text": "Run 48"
        },
        {
          "level": 2,
          "text": "Steps"
        },
        {
          "level": 1,
          "text": "Start Invoice Intake on its own"
        },
        {
          "level": 2,
          "text": "When files are added to a folder"
        },
        {
          "level": 2,
          "text": "At set times"
        },
        {
          "level": 2,
          "text": "If a run needs you and you are away"
        },
        {
          "level": 3,
          "text": "Coming up"
        },
        {
          "level": 3,
          "text": "Answers for runs that start on their own"
        }
      ]
    },
    {
      "path": "cowork/concept-2-launchpad.html",
      "title": "Cowork concept 2: Launchpad",
      "headings": [
        {
          "level": 1,
          "text": "Run a task"
        },
        {
          "level": 2,
          "text": "Your tasks"
        },
        {
          "level": 2,
          "text": "This week"
        },
        {
          "level": 3,
          "text": "Today, Tue 17"
        },
        {
          "level": 3,
          "text": "Wed 18"
        },
        {
          "level": 3,
          "text": "Thu 19"
        },
        {
          "level": 3,
          "text": "Fri 20"
        },
        {
          "level": 3,
          "text": "Sat 21"
        },
        {
          "level": 1,
          "text": "Find a task"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "How it works"
        },
        {
          "level": 2,
          "text": "Previous runs"
        },
        {
          "level": 2,
          "text": "Starts on its own"
        },
        {
          "level": 2,
          "text": "What it can touch"
        },
        {
          "level": 1,
          "text": "Invoice Intake, run 48"
        },
        {
          "level": 1,
          "text": "When should Invoice Intake start?"
        },
        {
          "level": 2,
          "text": "When nobody is at the computer"
        },
        {
          "level": 2,
          "text": "The next 7 days"
        }
      ]
    },
    {
      "path": "cowork/concept-3-thread.html",
      "title": "Cowork concept 3: Thread",
      "headings": [
        {
          "level": 1,
          "text": "Activity"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "About this task"
        },
        {
          "level": 2,
          "text": "Workflow"
        },
        {
          "level": 2,
          "text": "Starts Change"
        },
        {
          "level": 2,
          "text": "What it can touch"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "Steps in this run"
        },
        {
          "level": 2,
          "text": "This run"
        },
        {
          "level": 1,
          "text": "Add tasks"
        },
        {
          "level": 2,
          "text": "Start when files arrive"
        },
        {
          "level": 3,
          "text": "Invoice Intake"
        },
        {
          "level": 3,
          "text": "Receipt Renamer"
        },
        {
          "level": 3,
          "text": "Screenshot Sorter"
        },
        {
          "level": 2,
          "text": "Run on a schedule"
        },
        {
          "level": 3,
          "text": "Weekly Status Digest"
        },
        {
          "level": 3,
          "text": "Inbox Triage"
        },
        {
          "level": 3,
          "text": "Expense Report Builder"
        },
        {
          "level": 2,
          "text": "Start them yourself"
        },
        {
          "level": 3,
          "text": "Meeting Notes to Actions"
        },
        {
          "level": 3,
          "text": "Contract Clause Check"
        },
        {
          "level": 3,
          "text": "CSV Cleaner"
        },
        {
          "level": 2,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "What a run looks like"
        },
        {
          "level": 2,
          "text": "Workflow"
        },
        {
          "level": 2,
          "text": "What it can touch"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "Send this run"
        }
      ]
    },
    {
      "path": "cowork/concept-4-canvas.html",
      "title": "Cowork concept 4: Canvas",
      "headings": [
        {
          "level": 1,
          "text": "All tasks"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "Previous runs"
        },
        {
          "level": 2,
          "text": "Overview"
        },
        {
          "level": 3,
          "text": "What it can touch"
        },
        {
          "level": 2,
          "text": "1. Read the files Overview"
        },
        {
          "level": 2,
          "text": "2. Pull out the details Overview"
        },
        {
          "level": 2,
          "text": "3. Match to purchase orders Overview"
        },
        {
          "level": 2,
          "text": "4. Review exceptions Overview"
        },
        {
          "level": 2,
          "text": "5. File and log Overview"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 1,
          "text": "Invoice Intake"
        },
        {
          "level": 2,
          "text": "When files arrive"
        },
        {
          "level": 3,
          "text": "Answers this start uses"
        },
        {
          "level": 2,
          "text": "At set times"
        },
        {
          "level": 3,
          "text": "Next three"
        },
        {
          "level": 2,
          "text": "Run now"
        },
        {
          "level": 2,
          "text": "Add a start"
        },
        {
          "level": 1,
          "text": "Marketplace"
        },
        {
          "level": 3,
          "text": "Invoice Intake"
        },
        {
          "level": 3,
          "text": "Receipt Renamer"
        },
        {
          "level": 3,
          "text": "Meeting Notes to Actions"
        },
        {
          "level": 3,
          "text": "Weekly Status Digest"
        },
        {
          "level": 3,
          "text": "Contract Clause Check"
        },
        {
          "level": 3,
          "text": "Inbox Triage"
        },
        {
          "level": 3,
          "text": "CSV Cleaner"
        },
        {
          "level": 3,
          "text": "Expense Report Builder"
        },
        {
          "level": 3,
          "text": "Screenshot Sorter"
        },
        {
          "level": 2,
          "text": "Invoice Intake"
        },
        {
          "level": 3,
          "text": "It can start"
        },
        {
          "level": 3,
          "text": "What it can touch"
        }
      ]
    },
    {
      "path": "cowork/index.html",
      "title": "Cowork task app: four UX mockups",
      "headings": [
        {
          "level": 1,
          "text": "Four ways to find, run and schedule tasks"
        },
        {
          "level": 2,
          "text": "Shelf"
        },
        {
          "level": 2,
          "text": "Launchpad"
        },
        {
          "level": 2,
          "text": "Thread"
        },
        {
          "level": 2,
          "text": "Canvas"
        },
        {
          "level": 2,
          "text": "Making and changing a task",
          "id": "authoring"
        },
        {
          "level": 2,
          "text": "A new task"
        },
        {
          "level": 2,
          "text": "Changing it later"
        },
        {
          "level": 2,
          "text": "How they differ"
        },
        {
          "level": 2,
          "text": "Decided and still open"
        },
        {
          "level": 3,
          "text": "Shared decisions"
        },
        {
          "level": 3,
          "text": "Still open"
        },
        {
          "level": 3,
          "text": "Making tasks: decided for the mockup"
        },
        {
          "level": 3,
          "text": "Making tasks: still open"
        }
      ]
    }
  ]
};
