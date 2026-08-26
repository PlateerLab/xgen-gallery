/**
 * GitHub Organization 을 프로젝트 단위로 묶는다 — /members 화면이 쓴다.
 *
 * 사람에서 GitHub 로 가는 길(김OO → 개인 계정)을 없앤 자리를 이것이 대신한다.
 * 개인 계정·활동 이력이 이름과 함께 노출되면 그 조합이 채용 타깃 명단이 되지만,
 * 저장소는 조직이 공개하기로 한 결과물이라 그런 문제가 없다.
 *
 * 저장소 이름과 설명은 TOOLS 를 id 로 참조한다 — 여기에 다시 적으면 라이브러리
 * 갤러리와 어긋나는 순간이 온다. 없는 id 를 적으면 빌드가 아니라 화면에서 조용히
 * 빠지므로, assertProjectTools() 로 개발 중에 걸리게 해 둔다.
 */
import { TOOLS, type Tool } from "@/lib/tools";
import { SITE } from "@/lib/site";

export interface LabProject {
    id: string;
    title: string;
    titleEn: string;
    /** 이 묶음이 무엇을 푸는 문제인지 — 저장소 나열만으로는 읽히지 않는다 */
    desc: string;
    descEn: string;
    /** TOOLS 의 id. 순서가 화면 순서다. */
    toolIds: string[];
}

export const LAB_PROJECTS: LabProject[] = [
    {
        id: "xgen",
        title: "XGEN 플랫폼",
        titleEn: "XGEN Platform",
        desc: "에이전트를 실제 업무에 태우는 실행 계층. 런타임과 실행 하네스, 백엔드 SDK를 오픈소스로 공개합니다.",
        descEn:
            "The execution layer that puts agents to work — runtime, execution harness, and backend SDK, all open source.",
        toolIds: ["xgen-agent-runtime", "xgen-harness", "xgen-sdk", "xgen-an-web"],
    },
    {
        id: "ontology",
        title: "온톨로지 · 지식 엔진",
        titleEn: "Ontology & Knowledge Engine",
        desc: "기업의 문서와 데이터를 검색 가능한 지식 구조로 바꾸는 연구. 지식 그래프와 GraphRAG, 에이전트 기억을 다룹니다.",
        descEn:
            "Turning enterprise documents and data into knowledge an agent can reason over — knowledge graphs, GraphRAG, and agent memory.",
        toolIds: ["knowtology", "synaptic-memory", "omnifuse", "xgen-agent-memory"],
    },
    {
        id: "ingestion",
        title: "문서 · 데이터 인제스천",
        titleEn: "Document & Data Ingestion",
        desc: "현장에 실제로 쌓여 있는 형식들을 AI가 읽고 쓸 수 있게 만듭니다. 80여 종 문서 파싱과 청킹, 오피스 문서 편집까지.",
        descEn:
            "Making the formats enterprises actually have readable and writable by AI — 80+ document parsers, chunking, and Office document editing.",
        toolIds: [
            "contextifier",
            "doc2chunk",
            "document-adapter",
            "xgen-edit2docs",
            "f2a",
        ],
    },
    {
        id: "agent-tooling",
        title: "에이전트 도구",
        titleEn: "Agent Tooling",
        desc: "에이전트가 바깥 세계와 닿는 지점을 다듬는 도구들. 검색과 브라우저 조작, 도구 정의 검증을 맡습니다.",
        descEn:
            "The tools where agents meet the outside world — search, browser control, and tool-definition linting.",
        toolIds: ["googer", "toolint", "playleft"],
    },
];

/** 조직 저장소 주소 — tool-card.tsx 와 같은 규칙이다. */
export function repoUrl(tool: Tool): string {
    return `${SITE.github}/${tool.repo}`;
}

/** 트랙에 묶인 도구들. id 가 TOOLS 에 없으면 조용히 빠진다. */
export function toolsFor(project: LabProject): Tool[] {
    return project.toolIds
        .map((id) => TOOLS.find((t) => t.id === id))
        .filter((t): t is Tool => Boolean(t));
}

/**
 * 개발 중에만 도는 확인 — 오타 난 id 와, 어느 트랙에도 안 묶인 도구를 알린다.
 * 라이브러리가 늘어날 때 이 파일을 같이 고치는 걸 잊지 않게 하려는 목적이다.
 */
export function assertProjectTools(): void {
    if (process.env.NODE_ENV === "production") return;
    const used = new Set<string>();
    for (const p of LAB_PROJECTS) {
        for (const id of p.toolIds) {
            if (!TOOLS.some((t) => t.id === id)) {
                console.warn(`[lab-projects] '${p.id}' 가 없는 도구를 가리킨다: ${id}`);
            }
            used.add(id);
        }
    }
    const orphans = TOOLS.filter((t) => !used.has(t.id)).map((t) => t.id);
    if (orphans.length) {
        console.warn(`[lab-projects] 어느 트랙에도 없는 도구: ${orphans.join(", ")}`);
    }
}
