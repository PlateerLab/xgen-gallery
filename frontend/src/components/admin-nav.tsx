type AdminSection = "blog" | "governance" | "newsletter" | "guides" | "signature";

const ITEMS: { id: AdminSection; href: string; label: string }[] = [
  { id: "blog", href: "/admin", label: "블로그" },
  { id: "governance", href: "/admin/governance", label: "거버넌스" },
  { id: "newsletter", href: "/admin/newsletter", label: "뉴스레터" },
  { id: "guides", href: "/admin/guides", label: "운영 가이드" },
  { id: "signature", href: "/admin/signature", label: "이메일 서명" },
];

export default function AdminNav({ current }: { current: AdminSection }) {
  return (
    <aside className="admin-gnb" aria-label="관리자 메뉴">
      <strong>Plateer AI Labs</strong>
      <nav>
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={current === item.id ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
