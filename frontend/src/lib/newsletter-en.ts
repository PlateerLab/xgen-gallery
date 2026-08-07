import type { Badge } from "@/lib/newsletter";

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

interface IssueEn {
    summary: string;
    intro: string[];
    releases: { title: string; body: string }[];
    inProgress: { title: string; body: string }[];
    news: { title: string; body: string }[];
    reading: { title: string; body: string }[];
    papers: { body: string }[];
    upcoming: { title: string; body: string }[];
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
};
