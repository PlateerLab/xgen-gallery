import { redirect } from "next/navigation";
import { HACKATHON_EVENT } from "@/lib/events";

export default function HackathonPage() {
    redirect(HACKATHON_EVENT.href);
}
