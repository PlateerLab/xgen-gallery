import { LAB_MEMBERS, LAB_GROUPS } from "@/lib/lab-members";
import GovernanceAdmin from "./view";
export default function Page() {
    return <GovernanceAdmin members={LAB_MEMBERS.map(m => ({ id: m.slug, name: m.name, team: LAB_GROUPS[m.group].ko }))} />;
}
