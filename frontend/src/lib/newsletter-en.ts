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
    "vol-3": {
        summary:
            "Automatic collection indexing for external APIs, upload version control, multi-model GPU loading — the fortnight in review",
        intro: [
            "Hello from the AI Solutions Lab. Here is what was added to XGEN over the past two weeks, along with the AI news worth your attention.",
            "This issue opens a path for attaching external APIs to knowledge collections. We start with what finished development and reached verification or beyond: of the 293 merge requests landed since 27 July, 52 went all the way to the verification and production lines. What is in development and research follows, along with technology news, reading, and papers.",
        ],
        releases: [
            {
                title: "API data sources — automatic collection indexing",
                body: "External API responses are indexed into a knowledge collection automatically. Pick an API you registered as a tool, check the response with a connection test, set how often to fetch, and you are done — manual, or every 5 minutes, 30 minutes, 1 hour, 6 hours, or 24 hours. Fetched responses become Markdown documents and go through exactly the same security and indexing path as an upload, and rather than reloading everything each time only what is new is added. APIs that need authentication get their own credential profile so tokens do not mix with collection settings, and APIs with a repeating parameter are called several times from a list of values. XML responses are converted as well as JSON. (on stage)",
            },
            {
                title: "Upload version control and conflict review",
                body: "When you upload a file under a name that already exists, you choose what happens. Overwriting does not remove the previous file — versions stack up, and [Version history] on each file shows past versions alongside the original hash (SHA-256). Uploading a whole folder shows the conflicts file by file first, to be resolved individually or all at once; the options are unified to overwrite, skip, and rename, and the server makes the call. We also fixed a cancelled upload showing as 'complete' and skipped files being uploaded anyway. (on stage)",
            },
            {
                title: "Model serving — observability and multi-model GPU loading",
                body: "vLLM engine metrics are exported to Prometheus and wired into dashboards and alerts. Which model is taking how many requests, and where the queue is backing up, is visible straight from the operations screen. Loading is now permitted against free GPU memory, so several models can share a single GPU, and the administrator status screen refreshes live without a reload button. The llama.cpp build was fixed so it is not tied to one machine, and now supports the Blackwell generation. (in production)",
            },
            {
                title: "Administration and provider coverage",
                body: "Execution history for a shared workflow now records both who ran it and whose it is. Agent lists and failure logs download as Excel from the administrator screen, and the administrator SQL console accepts the full query syntax (only deletion and privilege statements are blocked). DeepSeek can be registered as an LLM provider. (in production)",
            },
            {
                title: "Stability fixes",
                body: "A document that exceeds the embedding input limit now retries with an automatically reduced chunk size, so fewer failed documents have to be hunted down and re-uploaded by hand, and an error that killed the entire upload was closed by hotfix. We fixed a gateway path returning 502 because five perfectly healthy modules were missing from the whitelist, and a proxy problem that resurrected # and ? in filenames as URL delimiters. A 403 on remote access from notebook sessions, and an empty chat list that made it impossible to start a conversation in a newly created trial zone, were resolved as well. (in production)",
            },
        ],
        inProgress: [
            {
                title: "XGeny — the tools an agent makes now persist",
                body: "We are making the tools an agent builds mid-task usable in the next session too. The tool specification and its runtime live in the database, so they survive a pod restart, and the pinned dependency versions are written into the spec. Code execution moved to a separate runner, away from the workflow core, and the [Tools] view shows the actual code and a three-stage status with a test you can run right there. What we called Geny through the last issue becomes XGeny (internal identifiers are unchanged).",
            },
            {
                title: "Audio file transcription",
                body: "We are building the path where a meeting recording uploaded straight into a knowledge collection is transcribed and then indexed. The speech-to-text workflow node, the live transcription receive and output nodes, and the error codes that separate the causes of failure all reached verification. Uploading audio in the development environment still fails at the transcription step, though — catching that error is what remains.",
            },
            {
                title: "Personal cloud storage",
                body: "We are connecting your PC or laptop to XGEN so an agent can read and write the files on it directly. It is switched on and off per person from [Cloud] on My Page, which also lists connected devices and their change history. Folders are pinned so paths hold even when a device is renamed, and file access is verified by the server in two stages.",
            },
            {
                title: "Documentation build automation",
                body: "A pipeline that finds, on its own, the manual chapters a code change touches and rewrites them. It watches develop, queues only the affected chapter when a merge request changes on-screen wording, and raises the rewritten result as a documentation MR — with the originating code MR recorded in it, so the reason the document changed is right there. It ran eleven times over the past two weeks and more than twenty chapters were brought up to date this way. On 6 August the final step landed: a dated record of what changed that day and why. That step uses no LLM — it only assembles the change list and the originating MRs. Compile code and you get an executable; from the same code, the documentation compiles out too. It is called living documentation.",
            },
            {
                title: "Agent harness v2",
                body: "Continuing from the last issue, we are attaching memory and state logic. We are rewriting the executor and tool logic to build a harness agent on top of XGEN agents, and running an experiment on agents that remember per-person context.",
            },
            {
                title: "AI avatars",
                body: "Per-user avatar storage, serving, and deletion (Live2D, Spine) reached production since the last issue. The upload confirmation and naming flow are tidied up, so what remains is a single piece: actually drawing the avatar into the chat screen.",
            },
            {
                title: "Ontology v3",
                body: "We are still researching build logic that does not lean on an LLM. Search speed and accuracy on Fuseki and Postgres and the dynamic top-K retrieval logic are being reworked, and we are benchmarking whether build quality holds with local models alone.",
            },
        ],
        news: [
            {
                title: "The standard for attaching tools dropped sessions",
                body: "The new specification of MCP — the standard for attaching tools and data to agents — was finalized on 28 July. The biggest change is that the protocol became stateless: session IDs and the handshake are gone, so servers can run several deep behind an ordinary load balancer. MCP Apps, where the server draws the UI, and Tasks, for long-running work, were promoted to formal features, and OAuth 2.0 and OpenID Connect compatibility plus a deprecation policy settled into place. Dropping sessions is ultimately an operations story. This issue is about attaching external APIs to collections — this document is about how the industry is standardizing that same act of attaching. If you plan to scale out MCP servers, start by checking whether you can drop session affinity.",
            },
            {
                title: "What an agent does not know is not the code — it is the organization",
                body: "Spotify published Xirp, its internal AI coding environment. The diagnosis stands out: agents decide fast and confidently, but cause production incidents because they do not know organizational context. Who owns this service, what it depends on, why it was designed that way — none of that is in the code; it is in Slack threads and in people's heads. Xirp pulls that context from the developer portal into every session, and pushes knowledge that surfaced in a session back out into documentation. That return loop is what we do not have — our documentation automation leaves a record every day, but only up to why the code changed. What was decided in a meeting, and why we chose that direction, is still written down nowhere.",
            },
            {
                title: "A third of the price, twice the spend",
                body: "The average price per million tokens fell from $18.40 in Q1 last year to $6.07 in Q1 this year, and sits at $1.16–1.18 in early August. Yet over the same period enterprise AI spending more than doubled, from $3.5bn to $8.4bn — cheaper simply means more use. The leaks are quite specific. One agent stuck in a loop burned $47,000 over eleven days; sending work a small model could handle to a top-tier model costs up to 50× more, and not caching repeated input up to 90% more. Filter with cheap models first, cache the part that does not change, and stop resending the whole conversation each turn — stack all three and reported savings run 60–80%. To choose where to start you have to see where it leaks, and our admin screen currently stops at per-user totals.",
            },
        ],
        reading: [
            {
                title: "Control the ideas, not the code",
                body: "antirez, who built Redis, wrote up how he works now. Writing code and hunting bugs go to the model; idea design, QA, optimization strategy, and design documents he writes himself. You cannot say 'implement it' and expect the result to work, he notes — instructions only hold if you understand the design and the performance. His conclusion: if you hold the idea of the software, reading the code itself is mostly pointless. The uncomfortable part is not his argument but us — the people who say you must read the code do not read it either. antirez decided not to look and took hold of the design instead; we say we look, and do not. He is the honest one.",
            },
            {
                title: "When code gets cheap, where does the bottleneck go",
                body: "Google published a piece arguing Go suits AI-assisted development, but the diagnosis before the language argument is what stays. How fast a person writes code hardly matters now; what matters is reviewing, verifying, and maintaining code already written — the bottleneck moved wholesale from generation to verification. First generation is 95% correct, but repeat the same task and errors accumulate as context degrades, so accuracy falls while token cost rises. Two hundred and ninety-three merge requests landed on internal branches in the past two weeks, and this issue's documentation build automation is aimed exactly here. It is also a structure that answers a problem caused by cheap generation with more generation, though — who reads an automatically written document, and what confirms it is right?",
            },
            {
                title: "Rewrite all the code, all the time",
                body: "If producing code keeps getting cheaper until reimplementing an entire codebase costs about what a SaaS subscription does, what then? The proposal: keep the requirements specification in the repository instead of the code, and when a policy or a performance target changes, edit the spec and regenerate everything. Code becomes a disposable by-product of the artifact that actually lasts. The author is firm that generation alone is not enough — you must be able to verify the generated code against the requirements, which means writing the specification in a language whose meaning does not drift. We are building the opposite: code as the original, documentation following behind. Ask it this way and it sharpens — what in your repository must never be lost? For the record, 125 of those 293 merge requests, 43%, fixed something.",
            },
        ],
        papers: [
            {
                body: "A paper on the waste of an agent regenerating the same procedural code on every request (9 July). Compiling repeated business procedures into pre-verified, versioned tools cut latency by up to 42% in a live service and improved the error rate by 53%, while making it easier to trace what was used when. The same ground XGeny stands on in this issue.",
            },
            {
                body: "The same structure seen from the other side (22 June). Once an agent builds its own tools and accumulates memory, a bad influence that got in once is not erased — it carries into the next generation. Splitting the attack surface into 25 areas, 17 were exposed, and the more evolution-centric the design, the more the surface grew — by 3.5×. The point: attacks that used to vanish with the session now survive along the lineage.",
            },
        ],
        upcoming: [
            {
                title: "XGEN DeX — coming soon",
                body: "An execution layer that carries enterprise AI all the way to the desktop. The AI agent runs on the server and you work with it from your own desktop — central control stays as it is, and how you work does not change. Attach an MCP server running on your PC and the agent can reach tools inside the corporate network or programs that exist only on that machine, using server and local resources together. More in the next issue.",
            },
            {
                title: "Plateer Labs YouTube channel",
                body: "The team YouTube channel for XGEN demos and technical sessions is open. Videos go up as they are ready — subscribe and you will see each new one as it lands.",
            },
        ],
    },
};
