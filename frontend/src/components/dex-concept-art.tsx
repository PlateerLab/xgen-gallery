import type { Locale } from "@/lib/i18n";

/**
 * XGEN DeX 개념도.
 *
 * 네 가지를 정확히 그린다.
 *
 * 하나, 커넥터는 **잇는 역할**이다. 플랫폼과 데스크톱을 연결하는 통로이지
 * 일을 하는 주체가 아니라, 선 위의 배지로 둔다.
 *
 * 둘, Agent 는 **여럿**이다. 업무마다 데이터·도구·권한이 달라 하나의 범용
 * Agent 에 몰지 않는다. 그래서 플랫폼에도 데스크톱에도 여러 개로 그린다.
 *
 * 셋, 일하는 자리는 **사용자 PC 안**이다. 모니터 틀 안에 넣어야 "내 컴퓨터에서
 * 벌어지는 일" 로 읽힌다. 상자만 그리면 또 하나의 서버처럼 보인다.
 *
 * 넷, DeX 의 아바타는 **바탕화면에 상주한다**. 창을 열어야 만나는 것이 아니라
 * 화면 한쪽에 서서 말을 건다. 그래서 아바타는 상자 안이 아니라 화면 오른쪽
 * 바탕화면 자리에 세워 둔다 — 실제 제품에서 보이는 그대로다.
 *
 * 움직이는 요소는 두지 않는다 — 개념도는 가만히 있어야 읽힌다.
 */
const FONT =
    "Pretendard,'Pretendard Variable','Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

const T: Record<Locale, {
    platform: string;
    platformNote: string;
    agents: string[];
    connector: string;
    desktop: string;
    officeLabel: string;
    office: string[];
    localLabel: string;
    local: string[];
    more: string;
    avatarLabel: string;
    avatarNote: string[];
    footer: string;
    aria: string;
}> = {
    ko: {
        platform: "XGEN 플랫폼",
        platformNote: "업무별 Agent 를 만들고 권한을 부여합니다",
        agents: ["제안서 작성", "매출 정산", "보고서 정리"],
        connector: "커넥터",
        desktop: "사용자 데스크톱 · XGEN DeX",
        officeLabel: "오피스 워크",
        office: ["엑셀", "워드", "PPT"],
        localLabel: "로컬 자원",
        local: ["파일", "브라우저", "PowerShell", "MCP", "Skill", "그 외"],
        more: "그 외",
        avatarLabel: "아바타",
        avatarNote: ["Agent가 바탕화면에서", "함께 일합니다"],
        footer: "허용된 범위 안에서 Agent 가 직접 다룹니다",
        aria: "XGEN 플랫폼에서 업무별로 만든 Agent 가 커넥터를 통해 사용자 PC 로 호출되어, 엑셀·워드·PPT 같은 오피스 작업과 파일·브라우저·PowerShell·MCP·Skill 을 직접 다루고, 아바타는 바탕화면에 상주하는 구조",
    },
    en: {
        platform: "XGEN platform",
        platformNote: "Agents built per task, with permissions granted",
        agents: ["Proposals", "Revenue recon", "Reporting"],
        connector: "Connector",
        desktop: "User desktop · XGEN DeX",
        officeLabel: "Office work",
        office: ["Excel", "Word", "PPT"],
        localLabel: "Local resources",
        local: ["Files", "Browser", "PowerShell", "MCP", "Skill", "and more"],
        more: "and more",
        avatarLabel: "Avatar",
        avatarNote: ["The agent works with you", "on the desktop"],
        footer: "The agent handles these directly, within the scope you allow",
        aria: "Agents built per task on the XGEN platform are called into the desktop through the connector, where they handle Excel, Word, and PowerPoint work along with files, browser, PowerShell, MCP, and skills, while the avatar lives on the desktop itself",
    },
};

/*
  오피스 제품 색 — 각사의 공식 로고 아트를 쓰지 않고, 문서 모양에 브랜드
  색과 머리글자만 얹는다. 무엇을 다루는지는 드러나되 상표를 복제하지 않는다.
*/
const OFFICE_COLORS = ["#217346", "#2b579a", "#d24726"];
const OFFICE_INITIALS = ["X", "W", "P"];

/** 플랫폼·데스크톱 양쪽에서 같은 x 를 쓰는 Agent 칩 자리 */
const AG_W = 160;
const AG_X = [264, 430, 596];

/*
  Agent 아바타 — XGEN 에서는 Agent 를 만들 때 아바타를 골라 붙인다. 개념도에도
  같은 결로 넣어야 「범용 AI 하나」가 아니라 「업무마다 다른 담당자」로 읽힌다.

  얼굴은 그리지 않는다. 사람처럼 보이면 안 되고, 그렇다고 똑같은 로봇 아이콘
  셋이면 위아래 칩이 다 같아 보인다 — 실루엣은 하나로 두고 색과 액세서리만
  다르게 준다. 같은 아바타가 플랫폼 칩과 데스크톱 칩에 함께 나와야 "그 Agent 가
  내려온 것" 으로 읽힌다.
*/
const AVATARS = [
    { from: "#38c3f5", to: "#185aea", ink: "#1447c4" },
    { from: "#a58bff", to: "#5b2ee0", ink: "#4a24c0" },
    { from: "#4fd8c0", to: "#0d8f88", ink: "#0b7f79" },
];

/** 24 단위로 그리고 반지름에 맞춰 줄인다 — 칩 크기가 달라도 같은 그림이 나온다 */
function AgentAvatar({ i, cx, cy, r }: { i: number; cx: number; cy: number; r: number }) {
    const ink = AVATARS[i].ink;
    return (
        <g transform={`translate(${cx - r} ${cy - r}) scale(${r / 12})`}>
            <circle cx="12" cy="12" r="12" fill={`url(#dx-av${i})`} />
            {/* 어깨와 머리 — 윤곽만 흰색으로 남긴다 */}
            <path
                d="M2.6 20.4A9.9 9.9 0 0 1 12 14a9.9 9.9 0 0 1 9.4 6.4A11.95 11.95 0 0 1 12 24a11.95 11.95 0 0 1-9.4-3.6z"
                fill="#ffffff"
            />
            <circle cx="12" cy="9" r="4.6" fill="#ffffff" />
            {/*
              눈은 셋 다 같은 자리에 두고, 구분은 머리 위 액세서리로만 준다.
              눈높이에 무언가를 걸치면 이 크기에서는 복면처럼 읽힌다.
            */}
            <circle cx="10.2" cy="10" r="0.9" fill={ink} />
            <circle cx="13.8" cy="10" r="0.9" fill={ink} />
            {i === 0 && (
                <g fill={ink}>
                    <path d="M6.4 9a5.6 5.6 0 0 1 11.2 0h-1.9a3.7 3.7 0 0 0-7.4 0z" />
                    <rect x="5.2" y="8.6" width="2.4" height="3.4" rx="1.2" />
                    <rect x="16.4" y="8.6" width="2.4" height="3.4" rx="1.2" />
                </g>
            )}
            {i === 1 && <path d="M7.6 8.2a4.4 4.4 0 0 1 8.8 0z" fill={ink} />}
            {i === 2 && (
                <>
                    <rect x="11.4" y="2.8" width="1.2" height="2.4" rx="0.6" fill="#ffffff" />
                    <circle cx="12" cy="2.2" r="1.5" fill="#ffffff" />
                </>
            )}
        </g>
    );
}

/**
 * 바탕화면에 상주하는 DeX 아바타.
 *
 * 칩 안의 작은 아바타와 달리 이쪽은 반신 인물로 그린다 — 화면 한쪽에 사람이
 * 서 있는 그 모습 자체가 DeX 아바타 기능의 전부이기 때문이다. 작게 줄이면
 * 그냥 또 하나의 아이콘이 되어 버린다.
 */
function DesktopAvatar({ x, y, label, note }: { x: number; y: number; label: string; note: string[] }) {
    const W = 140;
    const H = 156;
    const cx = x + W / 2;
    /* 머리를 몸보다 크게 잡는다 — 비율이 이래야 위압적이지 않고 친근하게 읽힌다 */
    const hy = y + 96;
    return (
        <g>
            {/* 바탕화면 — 창이 아니라 배경 위에 서 있다는 것을 이 판이 말한다 */}
            <clipPath id="dx-wallclip">
                <rect x={x} y={y} width={W} height={H} rx="14" />
            </clipPath>
            <rect x={x} y={y} width={W} height={H} rx="14" fill="url(#dx-wall)" />

            {/* 제목은 옆의 두 상자와 같은 자리·같은 크기 — 세 칸이 한 줄로 읽힌다 */}
            <text x={cx} y={y + 28} textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#1f4fa8">
                {label}
            </text>
            {note.map((line, i) => (
                <text key={line} x={cx} y={y + 45 + i * 14} textAnchor="middle" fontSize="10.5" fill="#8b95a6">
                    {line}
                </text>
            ))}

            <g clipPath="url(#dx-wallclip)">
                {/* 어깨는 판 아래까지 이어지고 잘린다 — 그래야 「서 있다」로 읽힌다 */}
                <path
                    d={`M${cx - 44} ${y + 176} C ${cx - 44} ${y + 138} ${cx - 24} ${y + 128} ${cx} ${y + 128} C ${cx + 24} ${y + 128} ${cx + 44} ${y + 138} ${cx + 44} ${y + 176} z`}
                    fill="#ffffff"
                    stroke="#dbe4f6"
                    strokeWidth="1.5"
                />
                <path
                    d={`M${cx - 12} ${y + 129} l12 11 12 -11`}
                    fill="none"
                    stroke="#dbe4f6"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
                {/* 목 */}
                <rect x={cx - 7} y={hy + 16} width="14" height="14" rx="5" fill="#eec9ac" />

                {/* 귀 → 머리 → 얼굴 순으로 겹친다 */}
                <circle cx={cx - 26} cy={hy + 2} r="4.5" fill="#f7dfcb" />
                <circle cx={cx + 26} cy={hy + 2} r="4.5" fill="#f7dfcb" />
                <ellipse cx={cx} cy={hy - 4} rx="28" ry="27" fill="#3a4a7a" />
                <ellipse cx={cx} cy={hy + 1} rx="25" ry="24" fill="#f7dfcb" />
                {/* 앞머리 — 한쪽으로 흐르게 두면 표정이 부드러워진다 */}
                <path
                    d={`M${cx - 25} ${hy - 6} C ${cx - 22} ${hy - 24} ${cx + 20} ${hy - 26} ${cx + 25} ${hy - 6} C ${cx + 18} ${hy - 16} ${cx - 6} ${hy - 12} ${cx - 25} ${hy - 6} z`}
                    fill="#3a4a7a"
                />
                {/* 볼 — 친근함은 이 두 점에서 나온다 */}
                <circle cx={cx - 16} cy={hy + 9} r="4.2" fill="#f6a48f" opacity="0.55" />
                <circle cx={cx + 16} cy={hy + 9} r="4.2" fill="#f6a48f" opacity="0.55" />
                {/* 둥근 안경 — 각진 안경보다 인상이 부드럽다 */}
                <g fill="none" stroke="#3a4a7a" strokeWidth="1.9">
                    <circle cx={cx - 9} cy={hy + 1} r="7.6" />
                    <circle cx={cx + 9} cy={hy + 1} r="7.6" />
                    <path d={`M${cx - 1.4} ${hy + 1} h2.8`} />
                </g>
                <circle cx={cx - 9} cy={hy + 2} r="2.4" fill="#33406b" />
                <circle cx={cx + 9} cy={hy + 2} r="2.4" fill="#33406b" />
                {/* 웃는 입 */}
                <path
                    d={`M${cx - 7} ${hy + 12} q7 7 14 0`}
                    fill="none"
                    stroke="#c98f6a"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </g>

            <rect x={x} y={y} width={W} height={H} rx="14" fill="none" stroke="#cfe0ff" />
        </g>
    );
}

export function DexConceptArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <svg
            viewBox="0 0 1020 668"
            className="dx-art block h-auto w-full"
            role="img"
            aria-label={L.aria}
            fontFamily={FONT}
        >
            <defs>
                <linearGradient id="dx-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
                <linearGradient id="dx-screen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#f2f7fe" />
                </linearGradient>
                {/* 바탕화면 — 창 안이 아니라 배경이라는 것이 색으로 구분돼야 한다 */}
                <linearGradient id="dx-wall" x1="0" y1="0" x2="0.6" y2="1">
                    <stop offset="0" stopColor="#e4edfd" />
                    <stop offset="1" stopColor="#f4f8ff" />
                </linearGradient>
                {/* 모니터 테두리 — 단색 남색은 둔하다. 위에서 아래로 밝기를 준다 */}
                <linearGradient id="dx-bezel" x1="0" y1="0" x2="0.35" y2="1">
                    <stop offset="0" stopColor="#5c86d6" />
                    <stop offset="0.45" stopColor="#2f4d8f" />
                    <stop offset="1" stopColor="#16224a" />
                </linearGradient>
                <linearGradient id="dx-stand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#33528f" />
                    <stop offset="1" stopColor="#16224a" />
                </linearGradient>
                {AVATARS.map((a, i) => (
                    <linearGradient key={a.to} id={`dx-av${i}`} x1="0" y1="0" x2="0.4" y2="1">
                        <stop offset="0" stopColor={a.from} />
                        <stop offset="1" stopColor={a.to} />
                    </linearGradient>
                ))}
                <filter id="dx-shadow" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="7" stdDeviation="10" floodColor="#1e3a68" floodOpacity="0.14" />
                </filter>
            </defs>

            <style>{`
                /*
                  선은 움직이지 않는다. 흐르는 점선을 넣어 봤는데 시선을 뺏기만 하고
                  무엇을 뜻하는지도 읽히지 않았다 — 개념도는 가만히 있어야 읽힌다.
                */
                .dx-fan { stroke: #bcd0f5; stroke-width: 2; fill: none; stroke-linecap: round; }
            `}</style>

            {/* ── 플랫폼 — 업무별 Agent 를 만드는 곳 ── */}
            <g filter="url(#dx-shadow)">
                <rect x="240" y="12" width="540" height="116" rx="18" fill="#ffffff" />
            </g>
            <rect x="240" y="12" width="540" height="116" rx="18" fill="none" stroke="#dbe4f6" />
            <rect x="266" y="30" width="18" height="18" rx="5" fill="url(#dx-brand)" />
            <text x="294" y="45" fontSize="15.5" fontWeight="800" fill="#1f4fa8">{L.platform}</text>
            <text x="294" y="65" fontSize="12" fill="#6b7280">{L.platformNote}</text>
            {L.agents.map((a, i) => (
                <g key={a}>
                    <rect x={AG_X[i]} y="80" width={AG_W} height="34" rx="17" fill="#eef4fd" stroke="#cfe0ff" />
                    <AgentAvatar i={i} cx={AG_X[i] + 21} cy={97} r={12} />
                    <text
                        x={AG_X[i] + 21 + (AG_W - 21) / 2}
                        y="101"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#2461d8"
                    >
                        {a} Agent
                    </text>
                </g>
            ))}

            {/* 커넥터 — 잇는 역할이라 선 위의 배지로 둔다 */}
            <path d="M510 128 V 196" stroke="#dbe4f6" strokeWidth="2.5" fill="none" />
            <path d="M504 188 l6 8 6 -8" stroke="#8fb4ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="462" y="146" width="96" height="28" rx="14" fill="#ffffff" stroke="#bcd0f5" />
            <text x="510" y="165" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#2461d8">
                {L.connector}
            </text>

            {/* ── 사용자 PC — 모니터 틀 안이 곧 DeX 다 ── */}
            <g filter="url(#dx-shadow)">
                <rect x="34" y="196" width="952" height="392" rx="20" fill="url(#dx-bezel)" />
            </g>
            {/* 테두리 안쪽 하이라이트 — 두께가 얇아 보이게 한다 */}
            <rect
                x="35.5" y="197.5" width="949" height="389" rx="19"
                fill="none" stroke="#ffffff" strokeOpacity="0.28"
            />
            <rect x="43" y="205" width="934" height="374" rx="13" fill="url(#dx-screen)" />
            {/* 받침대 */}
            <path d="M474 588 h72 l12 36 h-96z" fill="url(#dx-stand)" />
            <rect x="396" y="624" width="228" height="13" rx="6.5" fill="url(#dx-stand)" />

            <rect x="70" y="228" width="270" height="32" rx="16" fill="url(#dx-brand)" />
            <text x="205" y="249" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">
                {L.desktop}
            </text>

            {/* 호출된 Agent 들 — 같은 x, 같은 아바타라 옮겨 온 것으로 읽힌다 */}
            {L.agents.map((a, i) => (
                <g key={a}>
                    <rect
                        x={AG_X[i]}
                        y="284"
                        width={AG_W}
                        height="46"
                        rx="14"
                        fill="#ffffff"
                        stroke="#bcd0f5"
                        strokeWidth="1.6"
                    />
                    <AgentAvatar i={i} cx={AG_X[i] + 28} cy={307} r={16} />
                    <text
                        x={AG_X[i] + 28 + (AG_W - 28) / 2}
                        y="312"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#1f4fa8"
                    >
                        {a} Agent
                    </text>
                </g>
            ))}

            {/* Agent → 두 갈래 자원 */}
            <path className="dx-fan" d="M344 330 C 344 372 250 366 250 396" />
            <path className="dx-fan" d="M510 330 C 510 372 250 366 250 396" />
            <path className="dx-fan" d="M510 330 C 510 372 590 366 590 396" />
            <path className="dx-fan" d="M676 330 C 676 372 590 366 590 396" />

            {/* 오피스 워크 */}
            <rect x="90" y="396" width="320" height="156" rx="14" fill="#ffffff" stroke="#dbe4f6" />
            <text x="250" y="424" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#1f4fa8">
                {L.officeLabel}
            </text>
            {L.office.map((o, i) => {
                const x = 110 + i * 76;
                return (
                    <g key={o}>
                        <rect x={x} y="442" width="66" height="76" rx="12" fill="#f8fafc" stroke="#e3e9f2" />
                        {/* 문서 모양 + 머리글자 — 각 제품의 브랜드 색을 쓴다 */}
                        <path
                            d={`M${x + 20} 456 h18 l10 10 v22 a3 3 0 0 1 -3 3 h-25 a3 3 0 0 1 -3 -3 v-29 a3 3 0 0 1 3 -3z`}
                            fill={OFFICE_COLORS[i]}
                        />
                        <path d={`M${x + 38} 456 v10 h10z`} fill="#ffffff" fillOpacity="0.45" />
                        <text
                            x={x + 33}
                            y="484"
                            textAnchor="middle"
                            fontSize="13"
                            fontWeight="800"
                            fill="#ffffff"
                        >
                            {OFFICE_INITIALS[i]}
                        </text>
                        <text
                            x={x + 33}
                            y="507"
                            textAnchor="middle"
                            fontSize="11.5"
                            fontWeight="700"
                            fill="#374151"
                        >
                            {o}
                        </text>
                    </g>
                );
            })}
            {/* 이 셋이 전부가 아니라는 표시 */}
            <rect x="338" y="456" width="52" height="48" rx="12" fill="#f3f7ff" stroke="#cfe0ff" strokeDasharray="4 4" />
            <text x="364" y="486" textAnchor="middle" fontSize="15" fontWeight="800" fill="#8fb4ff">
                ···
            </text>
            <text x="364" y="522" textAnchor="middle" fontSize="10.5" fill="#8b95a6">
                {L.more}
            </text>

            {/* 로컬 자원 */}
            <rect x="430" y="396" width="320" height="156" rx="14" fill="#ffffff" stroke="#dbe4f6" />
            <text x="590" y="424" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#1f4fa8">
                {L.localLabel}
            </text>
            {L.local.map((r, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const x = 448 + col * 100;
                const y = 442 + row * 40;
                return (
                    <g key={r}>
                        <rect x={x} y={y} width="92" height="30" rx="15" fill="#f3f7ff" stroke="#cfe0ff" />
                        <circle cx={x + 16} cy={y + 15} r="4" fill="#2f7bff" />
                        <text x={x + 28} y={y + 20} fontSize="11.5" fontWeight="700" fill="#374151">
                            {r}
                        </text>
                    </g>
                );
            })}

            {/* 바탕화면에 상주하는 아바타 — 두 상자와 같은 줄, 화면 오른쪽 끝 */}
            <DesktopAvatar x={790} y={396} label={L.avatarLabel} note={L.avatarNote} />

            <text x="510" y="664" textAnchor="middle" fontSize="12.5" fill="#8b95a6">
                {L.footer}
            </text>
        </svg>
    );
}
