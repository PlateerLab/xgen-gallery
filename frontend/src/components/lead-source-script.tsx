"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { LEAD_SRC_FIELDS, readLeadSource } from "@/lib/lead-attribution";

/**
 * 유입 경로 저장 스크립트 — 솔루션마케팅팀 UTM 설정 가이드 3장 코드 그대로.
 * 모든 페이지 공통(site-shell <head>)에 한 번 렌더된다. 광고 링크로 처음 들어온
 * 페이지에서 UTM·검색키워드·광고 클릭 ID를 30일 저장하고, 새 광고 링크로 다시
 * 들어오면 그 경로로 바꾼다. 같은 화면에 숨김 input이 있으면 채운다.
 */
const LEAD_SRC_JS = `(function () {
  var KEY = 'plt_lead_src', TTL = 30 * 24 * 60 * 60 * 1000;
  var q = new URLSearchParams(location.search);
  var CLICK_KEYS = ['gclid', 'fbclid', 'li_fat_id', 'n_ad'];
  var isAd = ['utm_source', 'n_keyword'].concat(CLICK_KEYS).some(function (k) { return q.get(k); });
  var cur = null;
  try { cur = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (!cur || Date.now() - cur.t > TTL || isAd) {
    var ref = '';
    try { if (document.referrer && new URL(document.referrer).hostname !== location.hostname) ref = document.referrer; } catch (e) {}
    cur = { t: Date.now(), v: {
      utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || '', utm_term: q.get('utm_term') || '',
      utm_content: q.get('utm_content') || '',
      search_keyword: q.get('n_keyword') || q.get('utm_term') || '',
      landing_page: location.href, referrer: ref,
      click_id: CLICK_KEYS.filter(function (k) { return q.get(k); }).map(function (k) { return k + '=' + q.get(k); }).join('&')
    } };
    try { localStorage.setItem(KEY, JSON.stringify(cur)); } catch (e) {}
  }
  function fill() {
    Object.keys(cur.v).forEach(function (n) {
      document.querySelectorAll('input[type=hidden][name="' + n + '"]').forEach(function (el) { el.value = String(cur.v[n]).slice(0, 500); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();`;

export function LeadSourceScript() {
    return (
        <Script id="lead-source" strategy="afterInteractive">
            {LEAD_SRC_JS}
        </Script>
    );
}

/**
 * 문의폼 숨김 항목 9개(가이드 2장). React 폼은 나중에 그려지므로 마운트 후
 * 저장값으로 다시 채운다(가이드: 「폼이 화면에 나타난 뒤 fill()을 한 번 더」).
 * 실제 전송값은 각 폼이 제출 직전 readLeadAttribution()으로 다시 읽는다.
 */
export function LeadSourceFields() {
    const [v, setV] = useState<Record<string, string>>({});
    useEffect(() => {
        setV(readLeadSource());
    }, []);
    return (
        <>
            {LEAD_SRC_FIELDS.map((n) => (
                <input key={n} type="hidden" name={n} value={v[n] ?? ""} readOnly />
            ))}
        </>
    );
}
