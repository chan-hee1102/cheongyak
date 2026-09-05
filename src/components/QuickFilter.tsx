"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { REGIONS } from "@/lib/regions";
import { BRACKETS, bracketLabel } from "@/lib/income";
import { profileFromQuery } from "@/lib/profile";
import { saveGuestProfile } from "@/lib/guest";
import { startOfToday } from "@/lib/format";
import { Button, Field, Select } from "./ui";

const thisYear = startOfToday().getFullYear();
const YEARS = Array.from({ length: thisYear - 1950 - 18 }, (_, i) => thisYear - 19 - i);

export function QuickFilter({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [region, setRegion] = useState("서울");
  const [birthYear, setBirthYear] = useState("1994");
  const [income, setIncome] = useState("100");
  const [marital, setMarital] = useState("single");
  const [housing, setHousing] = useState("none");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ region, birthYear, income, marital, housing });
    saveGuestProfile(profileFromQuery(q));
    router.push(`/announcements?${q.toString()}`);
  };

  return (
    <form onSubmit={submit} className="grid gap-4" aria-label="빠른 조건 필터">
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-5"}>
        <Field label="거주 지역" htmlFor="qf-region">
          <Select id="qf-region" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
        </Field>
        <Field label="출생 연도" htmlFor="qf-year">
          <Select id="qf-year" value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            {YEARS.map((y) => <option key={y} value={y}>{y}년</option>)}
          </Select>
        </Field>
        <Field
          label="소득 구간"
          htmlFor="qf-income"
          hint={<Link href="/tools/income" className="font-semibold text-brand">모르겠다면 건강보험료로 계산하기</Link>}
        >
          <Select id="qf-income" value={income} onChange={(e) => setIncome(e.target.value)}>
            {BRACKETS.map((b) => <option key={b} value={b}>{bracketLabel(b)}</option>)}
          </Select>
        </Field>
        <Field label="혼인 상태" htmlFor="qf-marital">
          <Select id="qf-marital" value={marital} onChange={(e) => setMarital(e.target.value)}>
            <option value="single">미혼</option>
            <option value="married">기혼</option>
            <option value="engaged">예비 신혼부부</option>
          </Select>
        </Field>
        <Field label="주택 소유" htmlFor="qf-housing">
          <Select id="qf-housing" value={housing} onChange={(e) => setHousing(e.target.value)}>
            <option value="none">무주택</option>
            <option value="owner">유주택</option>
          </Select>
        </Field>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-3">입력한 조건은 서버에 저장되지 않아요. 이 브라우저 탭에서만 써요.</p>
        <Button type="submit" size="lg" className="sm:w-auto">
          내 조건으로 공고 보기
          <ArrowRight size={18} strokeWidth={2.4} />
        </Button>
      </div>
    </form>
  );
}
