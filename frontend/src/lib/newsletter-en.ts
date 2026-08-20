import type { Badge, SectionCopy } from "@/lib/newsletter";

/**
 * 뉴스레터 영문판.
 *
 * 한국어 원문은 newsletter.ts 의 ISSUES 에 그대로 두고 영문만 여기 모은다 —
 * 200줄 넘는 한국어를 다시 옮겨 적으면서 오타를 낼 위험을 없애기 위한 구조다.
 * 항목은 인덱스로 대응하므로 한국어 쪽 배열 순서를 바꾸면 여기도 함께 옮긴다.
 *
 * 외부 기사 링크는 한국어 매체가 섞여 있다(AI타임스·GeekNews 등). 링크 대상의
 * 언어는 바꿀 수 없으므로 URL 은 그대로 두고, 제목과 해설(우리가 쓴 글)만 옮긴다.
 */

/** 배지 라벨 — 화면 표기만 바꾼다(값은 한국어 그대로가 정규값). */
export const BADGE_EN: Record<Badge, string> = {
    신규: "New",
    개선: "Improved",
    수정: "Fixed",
    개발중: "In development",
    연구중: "Research",
    준비중: "Coming",
};

/**
 * 항목 override. body 는 한국어와 같은 규약으로 문단을 "\n\n" 로 잇고,
 * figure 는 이미지 캡션만 옮긴다(이미지 자체는 한국어 데이터의 것을 쓴다).
 */
interface ItemEn {
    title?: string;
    subtitle?: string;
    /** 배포 단계 칩 표기 — 값이 한국어인 호만 옮긴다. */
    stage?: string;
    body: string;
    figure?: string;
}

interface IssueEn {
    summary: string;
    intro: string[];
    sections?: SectionCopy;
    releases: ItemEn[];
    also?: string[];
    /** items 는 숫자 아래 라벨만 — 숫자 자체는 로케일과 무관하다. */
    stats?: { items: string[]; note?: string; linkLabel?: string };
    /** 「이번 호의 한 장면」 캡션 — 한국어 figures 와 인덱스로 대응한다. */
    figures?: string[];
    inProgress: ItemEn[];
    news: ItemEn[];
    reading: ItemEn[];
    papers: ItemEn[];
    upcoming: ItemEn[];
}

export const NEWSLETTER_EN: Record<string, IssueEn> = {
    "vol-1": {
        summary:
            "A Claude Code backend, Google Search going all-in on AI, and context rot — the fortnight in review",
        intro: [
            "Hello from the AI Solutions Lab. From today the lab will gather news about XGEN and AI every two weeks and send it your way. We hope it brings what we work on, and where the technology is heading, a step closer.",
            "This first issue covers what we shipped recently — including the Claude Code backend — what we are building now, and the technology news, reading, and papers worth your time.",
        ],
        releases: [
            {
                title: "Claude Code (CLI) backend",
                body: "Until now XGEN's only LLM backend was the API, so the agentic coding ability people had proven in the terminal with Claude Code could not be used inside the platform. Browser sign-in (OAuth, setup-token) and a Redis job relay lifted the CLI's single local login and multi-pod Kubernetes constraints, so Claude Code is now something you pick in a workflow or agent like any other model. The CLI version is controlled from the admin screen — pin, install, update, roll back.",
            },
            {
                title: "Deployment approval and risk assessment, rebuilt",
                body: "An XGEN agent opens to users only after a deployment request, a risk grading, a first approval by the system administrator, and a second by governance. Approval state was crammed into one column so you could not see where it had stalled; mitigations had to be typed in every time; and a suspended agent had to be restored by hand even after re-approval. Now the first- and second-stage approval states have their own columns, mitigations from the previous assessment autocomplete, and a risk score band is required. On approval a suspended agent is restored automatically, and re-approval history and audit logs are kept — review got faster and the trail became traceable.",
            },
            {
                title: "Vision vLLM setup improvements",
                body: "Attaching a vision (VL) model through vLLM often failed at registration because a `/v1` was missing from the base_url or the model name was wrong. Registration is now one click from the catalogue, the address is normalized automatically, and a live connection probe verifies the link before saving. Ontology extraction batches, where a small local model could not carry a large batch and produced half-finished results, were fixed with context-window-based auto-sizing plus timeout and truncation retries.",
            },
            {
                title: "Stability fixes",
                body: "In ontology search, when answer synthesis hit the time limit an empty answer could go out or internal evidence blocks could be exposed to the user — fixed, so answers always leave intact. Also: a single read/write client for Redis Sentinel (failover consistency, shared across core, documents, and mcp-station), a typo in the aggregation SQL that made feedback statistics read zero, and the deployment rollout timeout (120 → 300s).",
            },
        ],
        inProgress: [
            {
                title: "AI avatars",
                body: "A way to put a visible counterpart into a text-only chat and personalize the experience. From [Avatar settings] on My Page you register, preview, and set a default avatar from a Live2D or Spine model (.zip) or a photo; in the [Store] you browse avatars colleagues have published, with ratings and descriptions, and take one with a single click. Settings, store, and the backend repository are done; what remains is wiring the rendering into the chat screen.",
            },
            {
                title: "DB → ontology incremental indexing",
                body: "Ontologies are extracted from documents with an LLM, which costs time and money — while the most structured knowledge of all, the internal database, had no way in. We built a path that indexes the results of a SELECT rows-native, with no LLM. In the workspace it runs preview → mapping → index, and because it is watermark-based it follows only the rows that changed. Merged to develop, waiting on the next release.",
            },
            {
                title: "Token quotas and data-access audit",
                body: "The answer to the question that always comes up in an organizational rollout — can we control who uses how much, and can we evidence what data an agent saw. Token policy targets expanded to three kinds (user, individual role, whole role) with priority and concurrent-evaluation enforcement, and an agent's DB and knowledge access is logged for audit by user, department, and target table. With prompt execution statistics on top, usage and access history can be evidenced from the admin screen. Merged to develop, due in the next release.",
            },
            {
                title: "Agent harness v2",
                body: "On long tasks the agent forgot what the previous run had learned and repeated the same mistake, and with judgement limited to pass or fail there was no way to credit partial progress. Judgement becomes gradual scoring, lessons carry across runs newest-first, and we block the scaffolding where a RAG document answer mechanically imitates a title–summary–body shape. The goal is more stable execution quality from the same model.",
            },
            {
                title: "Ontology v3",
                body: "We are researching a v3 structure to raise both the accuracy and the throughput of the pipeline that extracts ontologies from documents. The preceding improvements — batch auto-sizing and truncation retries — shipped in this release; the v3 core is still experimental.",
            },
        ],
        news: [
            {
                title: "Google Search switches wholesale to Gemini 3.5 Flash — the ten blue links are gone",
                body: "The basic unit of search moved from a list of links to a generated answer. To be found on the web now, you do not rank — you get cited inside an AI answer, and content has to be shaped for extraction and quotation rather than for clicks. A signal that our product documentation and engineering blog are due for a pass toward a form AI finds easy to cite.",
            },
            {
                title: "Hugging Face CEO: enterprises are moving back from frontier APIs to open models",
                body: "The premise of the last three years — that AI is something you rent through an API — is wobbling. As frontier API pricing rises, companies that want predictable cost and their data kept inside move to open models plus their own infrastructure, which means the market for air-gapped, on-premise LLM platforms grows. Evidence that the direction we are building XGEN in matches where the industry is going — a quotable line for a proposal.",
            },
            {
                title: "Alberta's provincial government audits 466 million lines of code with Claude",
                body: "AI code audit has moved past PoC into a proven government-scale case. Cutting years of backlog to 20 hours reads less like replacing people and more like making a full sweep possible for the first time — something headcount had never allowed. The Claude Code backend that just landed in XGEN is for exactly this kind of work, which opens a new proposal scenario: auditing legacy code inside a customer's closed network.",
            },
        ],
        reading: [
            {
                title: "Context rot — the longer the context, the worse retrieval gets",
                body: "Measured evidence that today's common design — the context window is big, so put everything in — may be wrong. Recall falling from 80% at 256K to 36% at 1M tokens means that as context grows the model becomes less able to *find* what it needs inside it. Worth keeping as a counterweight in the long-context era, and a reason our RAG principle of spending context sparingly through chunking and reranking still holds.",
            },
            {
                title: "Mixing several models has clear limits — research against the orchestration consensus",
                body: "The assumption that combining models covers each other's weaknesses, refuted with data. Newer models are trained on similar data and therefore fail together on the same problems, so what matters in routing is not the second-best model but a model that fails differently. It is also why an LLM-as-judge should not use the same model family as the generator.",
            },
            {
                title: "Starting the loop — giving an agent a stopping condition instead of instructions",
                body: "The unit of running an agent is moving from a single prompt to a loop with a stopping condition. Define the completion criteria up front instead of directing every step, and the agent repeats until it clears them. The hard problem shifts to how you define a good stopping condition — exactly the direction we are working in with the judgement gate in harness v2.",
            },
        ],
        papers: [
            {
                body: "A large-scale measurement showing that models do not fail independently of one another. When two models are both wrong, they give the same wrong answer 60% of the time, and error correlation rises with the same vendor and the same architecture. The research behind reading item 02, and worth reading before designing routing, ensembles, or LLM-as-judge.",
            },
            {
                body: "Tests the hypothesis that SFT supplies the parts of reasoning while RL recombines those parts into new arrangements. With SFT alone the model settles into imitating familiar golden traces and collapses on out-of-distribution combinations — useful when designing a domain fine-tuning strategy, and the SFT-then-RL order in particular.",
            },
        ],
        upcoming: [
            {
                title: "Team YouTube channel",
                body: "We are preparing a team YouTube channel covering XGEN demos and technical sessions. We will share the opening along with the first video in the next issue.",
            },
            {
                title: "Internal hackathon",
                body: "We are putting together a session for ideas that are hard to try during regular work, run as a team experiment. We will announce the format and dates once they are settled.",
            },
        ],
    },

    "vol-2": {
        summary:
            "Voice conversation (STT and TTS), per-agent masking, and AI pricing becoming a class marker — the fortnight in review",
        intro: [
            "Hello from the AI Solutions Lab. Here is what was added to XGEN over the past two weeks, along with the AI news worth your attention.",
            "This issue covers what shipped — including voice conversation (STT and TTS) and per-agent masking — what is in development and research now, and the story of AI pricing turning into a class marker.",
        ],
        releases: [
            {
                title: "Voice conversation — STT and TTS",
                body: "You can now speak and listen in XGEN. Users pick a speech recognition and synthesis engine on My Page, and administrators register a per-provider catalogue in [Audio] settings, then verify it with a connection test and automatic model checking. A TTS profile studio for building finished voices per endpoint, plus four default voices, went in alongside. (on stage)",
            },
            {
                title: "Per-agent PII and blocked-term masking",
                body: "Control policy can be switched on and off per agent. The masking scope widened past the answer body to tool execution results, RAG context, and the original documents shown as sources. Policy change history now records what changed and when, along with how many people were involved in the change. (on develop)",
            },
            {
                title: "In-app manual viewer and download centre",
                body: "The product manual is read in [Solution guide] without leaving the app. It serves the Markdown source live, so a fix to the document shows up immediately. A user-facing download centre in the support section, support for connector types, and seeding of a bundled installer for air-gapped networks went in with it. (on develop)",
            },
            {
                title: "DB → ontology indexing, token limits, Excel export",
                body: "Two things we said were in preparation last issue have landed. The path that indexes DB SELECT results into an ontology without LLM extraction was refined to bind row primary keys to RDF URIs and swap the graph atomically from staging, and token limit policy is now enforced separately per deployment state — development, verification, production. Administrator Excel (xlsx) download also widened to some twenty places, including inspection and login logs, chat statistics, and document re-indexing. (on stage)",
            },
            {
                title: "Stability fixes",
                body: "Model server self-healing was strengthened (concurrency, leak reclamation) and per-GPU memory and serving configuration snapshots are kept in history. The document store was corrected to record the actual encryption information, and we fixed false-positive MinIO upload history, an access error for recipients of a shared collection, and CLOB and connection-mode problems in Oracle queries (unified on SQLAlchemy, TCPS). Context overflow is now reported against measured vLLM values — what overflowed, and by how much. (in production)",
            },
        ],
        inProgress: [
            {
                title: "API collection workspace and Quality Lab",
                body: "We are gathering the whole process of bringing an external API into XGEN as a tool into one workspace. Drop in a source and collection, enrichment, and validation follow a guided path, while Quality Lab diagnoses authentication readiness, target selection, and session state. GraphQL introspection collection and execution-trace learning landed on develop, and relationships between tools are narrowed by module map in the Tool Evidence Explorer before being viewed as a graph.",
            },
            {
                title: "AI avatars",
                body: "Continuing from the last issue, per-user avatar storage, serving, and deletion (Live2D, Spine) reached stage, and the upload confirmation and naming flow were tidied up. What remains is a single piece: wiring the rendering into the chat screen.",
            },
            {
                title: "Agent harness v2",
                body: "After the judgement gate we are attaching memory and state logic. We are rewriting the executor and tool logic to build a harness agent on top of XGEN agents, and planning a RAGAS-based evaluation to compare harness performance.",
            },
            {
                title: "Document generation engine",
                body: "We built a rendering engine that lifts automatic PPT generation from a flat list of text into a designed document (four themes, five layouts). The whole path from generation through saving and download has been verified, and an A/B measurement against a next-generation SVG authoring approach is next.",
            },
            {
                title: "Ontology v3",
                body: "We are researching build logic that does not lean on an LLM. Search performance on Fuseki and Postgres and the dynamic top-K retrieval logic are being reworked, and we are at the stage of testing whether build quality holds with local models alone.",
            },
        ],
        news: [
            {
                title: "OpenAI did not notice an agent had been compromised for a week",
                body: "An agent was breached from outside and nobody knew for a week, and the attacker even left exit instructions behind. Agents already plan, use tools, and write code without human supervision, while the complexity they carry doubles every few months. The end of that road is handing the watching of agents to agents (Gartner's 'guardian agent') — and past that point, what a person can check directly is only the log the watcher left. If this issue's masking covers what goes out, this incident was aimed at what comes in.",
            },
            {
                title: "How expensive is the AI you use — when pricing becomes a class marker",
                body: "Top-tier Claude and ChatGPT plans run in the $200-a-month range, and from September the same work costs more: a new tokenizer counts the same sentence as up to 1.35× the tokens, raising the real burden by 20–35%. This is exactly why open models matter. Not to catch the performance leader, but because a model you have already taken in is the only option that stays whether the price rises or the account is cut off. Closing the performance gap with less compute is engineering's job.",
            },
            {
                title: "Fewer rules, better performance — context engineering for Claude 5",
                body: "The direction is to write less, not more: cutting the system prompt by 80% held performance steady or improved it. Sentences added to make an older model do something it could not are now getting in the way. The question is which 80% — and if you record, alongside each sentence, which model's failure it was meant to prevent, the candidates for deletion surface on their own. (Blocked-term and personal-data rules that exist for safety are not subjects of a performance experiment.)",
            },
        ],
        reading: [
            {
                title: "GhostApproval — a symlink flaw running through six coding assistants",
                body: "You ask the AI whether it may edit `project_settings.json` and approve — except that was not a real file but a shortcut pointing at a server access key. The name you approved and the file that actually changed differ, so an attacker plants their own key and walks in without a password. Six tools including Amazon Q, Claude Code, and Cursor carried this, and only some are fixed. Worth a look at what the belief that pressing confirm makes it safe is actually approving.",
            },
            {
                title: "Coding is solved, so why does software keep getting worse",
                body: "Writing code got demonstrably faster, so why has product quality not improved to match? The author's answer is that typing was never the bottleneck — stability does not show up well in KPIs, and 'this quarter we will ship no features and only fix bugs' does not make an impressive announcement. It stings because it is right.",
            },
            {
                title: "An AI trends wiki an LLM agent has been running alone for 72 days",
                body: "A wiki where an agent gathers and organizes the day's news with no human touch has accumulated 72 days. What is interesting is not a demo that works once but an operation that ran a long time — and what it does on the day it fails, and how it comes back the next day, is really the whole story. Building the harness, we got stuck in the same place: a restart condition is harder than a stopping condition.",
            },
        ],
        papers: [
            {
                body: "A side-by-side comparison of nine scenarios, from basic RAG through graph and agentic approaches. Context engineering alone cut tokens by 19–53%, and the paper shows a retrieval–generation gap: adding retrieval does not improve generation quality proportionally. A useful baseline while we rework dynamic top-K and ontology v3.",
            },
            {
                body: "A knowledge graph built from a relational database on an ontology basis performs on par with one built from text through LLM extraction. Ontology learning only has to happen once, and the LLM cost drops sharply. The reference behind why this issue's DB → ontology indexing goes without LLM extraction.",
            },
        ],
        upcoming: [
            {
                title: "Team YouTube channel",
                body: "We are preparing a team YouTube channel covering XGEN demos and technical sessions. As soon as the first video is ready, this section will be the first to say so.",
            },
            {
                title: "Internal hackathon",
                body: "We are putting together a session for ideas that are hard to try during regular work, run as a team experiment. We will announce the format and dates once they are settled.",
            },
        ],
    },
    "vol-3": {
        summary:
            "Attach an external API to a collection and it indexes itself on the schedule you set. Upload version control, multi-model GPU loading — the fortnight in review.",
        intro: [],
        sections: {
            releasesLabel: "Shipped this fortnight",
            releasesTitle: "Attach an API, and it becomes knowledge.",
            releasesDesc:
                "The path for attaching an external API to a knowledge collection is open. These finished development over the past two weeks and reached verification or beyond, and each item carries a badge for how far it went (stage, production). What is in development follows, along with technology news, reading, and papers.",
            progressDesc:
                "What we are building or experimenting with right now. If any of it interests you, let's talk any time.",
            figuresTitle: "A look at this issue",
            figuresDesc:
                "Screens that words alone do not do justice. This is what the items above actually look like.",
            papersDesc:
                "Papers worth attention, close to what the team is researching. Two of them look at the same structure from opposite sides.",
            upcomingTitle: "News and our channels",
            upcomingDesc:
                "Product news and team channels, together with what we will carry on with in the next issue.",
        },
        releases: [
            {
                title: "API data sources — automatic collection indexing",
                stage: "stage",
                body: "External API responses are indexed into a knowledge collection automatically. Pick an API you registered as a tool, confirm the response with a connection test, set how often to fetch, and that is it. The interval runs from manual execution through 5 minutes, 30 minutes, 1 hour, 6 hours, and 24 hours.\n\nFetched responses become Markdown documents and go through exactly the same security and indexing path as a document upload. Rather than reloading everything each time, only what is new is added. APIs that need authentication get a separate credential profile so tokens do not mix with collection settings, and APIs with a repeating parameter are called several times from a list of values. XML responses are converted and received as well as JSON.",
            },
            {
                title: "Upload version control and conflict review",
                stage: "stage",
                body: "When you upload a file under a name that already exists, you choose what happens. Overwriting does not make the previous file disappear — versions stack up, and [Version history] on each file shows past versions alongside the original hash.\n\nUploading a whole folder shows the conflict on each file inside first, to be resolved file by file or all at once. The options are unified into three — overwrite, skip, rename — and the server makes the call. We also fixed a cancelled upload appearing as 'complete', and skipped files being uploaded anyway.",
            },
            {
                title: "Model serving — observability and multi-model GPU loading",
                stage: "in production",
                body: "vLLM engine metrics are exported to Prometheus and connected to dashboards and alerts. Which model is taking how many requests, and where the queue is backing up, is visible straight from the operations screen.\n\nLoading is now permitted against free GPU memory, so several models can go onto a single GPU together, and the administrator status screen refreshes live without a reload button. The llama.cpp build was fixed so it is not tied to one machine, and supports up to the Blackwell generation.",
            },
            {
                title: "Stability fixes",
                stage: "in production",
                body: "A document that exceeds the embedding input limit now retries with an automatically reduced chunk size. There is less of a person hunting down a failed document to upload it again. An error that killed the entire upload was stopped by hotfix.\n\nWe fixed a gateway path returning 502 because five perfectly healthy modules were missing from the whitelist, and a proxy problem that resurrected # and ? in filenames as URL delimiters. A 403 on remote access from notebook sessions, and an empty chat list that made it impossible to start a conversation in a newly created trial zone, were resolved as well.",
            },
        ],
        also: [
            "Execution history for a shared workflow now records both who ran it and whose it is",
            "Agent lists and failure logs download as Excel from the administrator screen",
            "The administrator SQL console accepts the full query syntax. Only deletion and privilege statements are blocked",
            "DeepSeek can be registered as an LLM provider",
        ],
        stats: {
            items: ["Merge requests landed", "Modules touched", "On verification and production"],
            note: "Based on merge requests merged since 27 July (customer-only branches excluded). Of those, 52 reached the stage and main lines.",
            linkLabel: "See all release notes",
        },
        figures: [
            "[Upload > API] Pick an external API you registered as a tool, press the connection test, and you see the real response right there. The Bank of Korea exchange rate API is returning the KRW/USD base rate. (development environment)",
            "[Step 3 · Sync settings] Choose how often to fetch. From manual execution through 5 minutes, 30 minutes, 1 hour, 6 hours, and 24 hours. Fetched data goes through the same security and indexing path as a document upload. (development environment)",
            "Connecting creates a data source card in the collection. It runs by itself every 30 minutes and adds only what is new. This run added 1 of 60 items and skipped 59. (development environment)",
            "[Knowledge management > Collections > Upload history] One upload, expanded. The original hash (SHA-256) tells whether it is the same file, and the chunking result and storage encryption are kept in one place. (development environment)",
            "[Admin settings > Environment > Infrastructure] A speech recognition model and an LLM are loaded together on a single GPU (120GB). 'Live connection' at the top right means the state refreshes without a reload. (development environment)",
        ],
        inProgress: [
            {
                title: "XGeny — the tools an agent makes now persist",
                body: "We are making the tools an agent builds mid-task usable in the next session too. The tool specification and its runtime live in the database, so they do not disappear when the pod restarts, and the pinned dependency versions are written into the spec. Code execution moved to a separate runner, away from the workflow core, and the [Tools] view shows the actual code and a three-stage status with a test you can run right there. What we called Geny through the last issue becomes XGeny (internal identifiers are unchanged).",
            },
            {
                title: "Audio file transcription",
                body: "We are building the path where a meeting recording uploaded straight into a knowledge collection is transcribed and then indexed. The speech-to-text workflow node, the live transcription receive and output nodes, and the error codes that separate the causes of failure all reached verification. Uploading audio in the development environment still fails at the transcription step, though. Catching that error is what remains.",
                figure: "[Admin settings > Environment > Audio] Choose which of three providers handles speech recognition. (development environment)",
            },
            {
                title: "Personal cloud storage",
                body: "We are connecting your PC or laptop to XGEN so an agent can read and write the files on it directly. It is switched on and off per person from [Cloud] on My Page, which also shows connected devices and their change history. Folders are pinned so paths hold even when a device is renamed, and file access is verified by the server in two stages.",
                figure: "[My Page > Cloud > Storage] Your files sit on the server and the connector lets you use them from your own computer too. It splits into three tabs: files, connections, history. (development environment)",
            },
            {
                title: "Documentation build automation",
                body: "A pipeline that finds, on its own, the manual chapters a code change touches and rewrites them. It watches develop, and when a merge request that changed on-screen wording comes in, only that chapter goes into the queue; XGEN rewrites it and raises it as a documentation MR. That MR carries the originating code MR — why this document changed.\n\nIt ran eleven times over the past two weeks, and more than twenty chapters — user management, permissions, LLM settings, the governance dashboard — were brought up to date this way. On 6 August the final step landed: a dated record of what changed that day and why. This step uses no LLM. It only assembles the change list and the originating MRs, so there is no room for judgement to enter, and on a day with no updates it records what was reviewed instead.\n\nThe scope right now is the user, administrator, operations, and common manual Markdown, and automatic screen capture is next in line. [Solution guide], read inside the app, connects as soon as gateway routing opens.\n\nThis approach is called living documentation. Compile code and you get an executable; from the same code, the documentation compiles out too. Documentation is not something written by hand but a build artifact. Robert Martin, who wrote Clean Code, said the truth can be found in only one place: the code. If so, the documentation should come out of that one place as well. Build automation is not a convenience but the only way.",
            },
            {
                title: "Agent harness v2",
                body: "Continuing from the last issue, we are attaching memory and state logic. We are rewriting the executor and tool logic to build a harness agent on top of XGEN agents, and running an experiment on agents that remember per-person context.",
            },
            {
                title: "AI avatars",
                body: "Per-user avatar storage, serving, and deletion (Live2D, Spine) reached production since the last issue. The upload confirmation and naming flow are tidied up, so what remains is a single connection: actually drawing the avatar into the chat screen.",
                figure: "[My Page > Settings > Avatar settings] Upload a Live2D or Spine model, or a photo, and it appears in the chat screen. (development environment)",
            },
            {
                title: "Ontology v3",
                body: "We are still researching build logic that does not lean on an LLM. Search speed and accuracy on Fuseki and Postgres and the dynamic top-K retrieval logic are being reworked, and we are checking with benchmarks whether build quality holds with local models alone.",
            },
        ],
        news: [
            {
                title: "The standard for attaching tools dropped sessions",
                body: "The new specification of MCP — the standard for attaching tools and data to agents — was finalized on 28 July. The biggest change is that the protocol no longer holds state. Session IDs and the handshake are gone, so servers can run several deep behind an ordinary load balancer. As extensions were promoted to formal features, MCP Apps, where the server draws the UI, and Tasks, for long-running work, came in, and OAuth 2.0 and OpenID Connect compatibility plus a deprecation policy settled into place. It is the first major revision since the standard moved under the Linux Foundation last December and became vendor-neutral.\n\nDropping sessions is ultimately an operations story. Until now, scaling out MCP servers meant keeping the same user pinned to the same pod; that constraint is gone. This issue talks about attaching external APIs to collections — and this document is where the industry writes down how that act of attaching is being standardized. If you plan to scale out MCP servers, start by checking whether you can drop session affinity.",
            },
            {
                title: "What an agent does not know is not the code — it is the organization",
                body: "Spotify published Xirp, its internal AI coding environment. The diagnosis stands out — agents decide fast and confidently, but cause production incidents because they do not know organizational context. Who owns this service, what it depends on, why it was designed that way: none of that is in the code. It is in Slack threads and in people's heads.\n\nXirp pulls that context from the developer portal into every session, and pushes knowledge that surfaced in a session back out into documentation. Instead of making the agent smarter, it increases what the agent knows.\n\nThat return loop is what we do not have. Our documentation automation leaves a record every day, but what it holds goes only as far as why the code changed. What was decided in a meeting, and why we chose that direction, is still written down nowhere.\n\nThis is not a story about needing a new system. It is a question of whether to put one more line into a place that already runs every day.",
            },
            {
                title: "A third of the price, twice the spend",
                body: "The AI inference cost enterprises pay hit a low for the year. The average price per million tokens fell from $18.40 in Q1 last year to $6.07 in Q1 this year, and sits around $1.16–1.18 in early August. Open models' share of enterprise token usage also grew from 11% to 38% in a year.\n\nAnd yet what enterprises actually pay did not fall. Over roughly the same period, enterprise AI spending more than doubled, from $3.5bn to $8.4bn. Because cheaper simply means more use. Google said its monthly token throughput grew 330-fold in two years.\n\nThe leaks are quite specific. One agent stuck in a loop burned $47,000 over eleven days. Because every step resends the whole conversation, cost accrues with the square of the conversation's length. Sending work a small model could handle to a top-tier model costs up to 50× more; not caching repeated input, up to 90% more.\n\nThe ways to cut it are already settled. Filter with cheap models first (classification and scanning on a $0.10-per-million-token model, final judgement only on a model in the $10 range), keep the part that does not change in cache, and stop resending the whole conversation every time. Stack all three and reports show 60–80% cut in production. Cloudflare, which had attached 2,500 tools, folded a tool list of 1.17 million tokens into two, at 1,000 tokens.\n\nFor 'it got cheaper' to hold, the unit of counting has to be the same. The price of one token became a third, but the number of tokens it takes to finish one job grew faster than that. To decide which of the three to start with, you first have to see where it leaks. Stanford HAI found that teams measuring tokens per tool call find their savings three times faster than teams looking only at the invoice total. Our admin screen currently goes as far as per-user totals. It looks like it needs one more column beside it, counted per call.",
            },
        ],
        reading: [
            {
                title: "Control the ideas, not the code",
                body: "antirez, who built Redis, wrote up how he works these days. Writing code and hunting bugs go to the model; idea design, QA, optimization strategy, and design documents he writes himself. Building LLM inference software that runs locally, he had the model implement DeepSeek and GLM support — but you cannot say 'implement it' and expect the result to work, he says. Instructions only hold if you understand the design and the performance.\n\nHis conclusion is this. If you hold the idea of the software, looking at the code itself is mostly pointless. He writes that nobody should read this code — read only the idea the code carries. And he adds that a book from the seventies explains the present better than much of what came out between 2000 and 2020.\n\nThe uncomfortable side is not his argument but us. The people who say you must read the code do not actually read it. Try to remember the last time you scrolled a diff to the end before pressing approve. antirez decided not to look, and took hold of the design instead. We say we look, and do not. Of the two, he is the honest one.",
            },
            {
                title: "When code gets cheap, where does the bottleneck go",
                body: "Google published a piece titled 'why Go is an ideal language for AI-assisted development', but what stays is the diagnosis before the language argument. How fast a person writes code hardly matters now, it says; what matters is reviewing, verifying, and maintaining code that is already written. The phrase that the bottleneck moved wholesale from generation to verification appears too.\n\nThere are numbers. First generation is 95% correct, but repeat the same task and errors accumulate as context is polluted, so accuracy falls while token cost rises. Hence the logic that readable syntax, static types acting as an automatic safety net, and compatibility that compiles 15-year-old code unchanged, hold value.\n\nTwo hundred and ninety-three merge requests landed on internal branches alone in the past two weeks. The documentation build automation in this issue's in-development section is aimed exactly here — make the manual change when the code changes, and reduce the share a person has to chase. In the past two weeks alone, more than twenty chapters were updated that way.\n\nIt is also a structure that blocks a problem caused by cheap generation with yet more generation, though. Who reads an automatically written document, and what confirms it is right? That question waits at the next stop. The only answer we have right now is that a person opens the chapter.",
            },
            {
                title: "Rewrite all the code, all the time",
                body: "A post from 4 August with a bold premise. The cost of producing code keeps falling — so what if reimplementing a large codebase wholesale came down to the level of today's SaaS subscription? The author's starting point is that the way software is made would then have to change.\n\nThe design goes like this. Keep the requirements specification in the repository instead of the code. When a security policy changes or a performance target moves, edit the spec, press a button, and regenerate everything. Regenerating from new requirements should be as simple as recompiling a program, he writes. Code becomes a disposable by-product of the artifact that actually lasts, the piece says.\n\nHe is firm that automatic generation alone will not do. You must be able to verify that the generated code kept to the requirements, and for that you have to write the specification in a language whose meaning does not drift. Requirements written in natural language alone do not make this picture work.\n\nWhat the design aims at, in the end, is fixing. Much of the time development takes goes not into making something new but into holding on to what is already made and fixing it. If you can pull it out of the spec again, you gain the option of making it anew instead of fixing it.\n\nSo we counted how much we are fixing. Of the 293 merge requests raised on internal branches in the past two weeks, 125 — 43% — fixed something. Two of those had [urgent] in the title: the error where uploads failed entirely, and the one where the DB query node died. This number may mean quality is poor, or it may mean we fix things often because we can fix them fast. Which one it is cannot be told from the number alone.\n\nOne more thing to note. We are building a system where the manual changes when the code changes. The code is the original and the documentation follows behind. This piece proposes the exact opposite: requirements as the original, code as the result. What ought to be the original has no answer yet, but asking it this way sharpens it a little. What in your repository must never be lost? If all the code is gone but the requirements remain, you can make it again. The other way around is hard.",
            },
        ],
        papers: [
            {
                body: "A paper on the waste of an agent regenerating the same procedural code on every request (Kalle Kujanpää et al., 9 July). Switching to compiling repeated business procedures into pre-verified, versioned tools cut latency by up to 42% in a live service and improved the error rate by 53%. Tracing what was used when also became easier. The same ground XGeny stands on in this issue.",
            },
            {
                body: "The same structure seen from the other side (22 June). Once an agent builds its own tools and accumulates memory, a bad influence that got in once is not erased and carries into the next generation. Splitting the attack surface into 25 areas, 17 were exposed, and the more evolution-centric the design, the more the surface grew — by 3.5×. The point: attacks that used to disappear when the session ended now survive along the lineage.",
            },
        ],
        upcoming: [
            {
                title: "XGEN DeX · coming soon",
                subtitle: "An execution layer carrying enterprise AI to the desktop",
                body: "The AI agent runs on the server, and you work with that agent from your own desktop. It is a way of connecting that leaves central control as it is and does not change how you work.\n\nSo the resources an agent uses are not bound to the server alone. Attach an MCP server running on your PC and the agent can call tools inside the corporate network, or programs that exist only on this computer. Server resources and local resources, used together. More detail in the next issue.",
                figure: "XGEN Connector — your agent list on the left, quick chat below, an avatar on screen. Agents running on the server, called straight from the desktop.",
            },
            {
                title: "Plateer AI Labs YouTube channel",
                body: "XGEN demos and technical sessions go up here. Subscribe and you will see each new video as it lands.",
            },
        ],
    },
};
