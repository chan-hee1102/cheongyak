import Link from "next/link";
import { ArrowRight, Bell, ClipboardCheck, Database, ListChecks } from "lucide-react";
import { ANNOUNCEMENTS } from "@/lib/mock/announcements";
import { daysLeft } from "@/lib/format";
import { QuickFilter } from "@/components/QuickFilter";
import { AnnouncementRow } from "@/components/AnnouncementRow";
import { ButtonLink, Card, Container } from "@/components/ui";

const STEPS = [
  {
    Icon: Database,
    title: "공고를 매일 모아요",
    body: "마이홈포털·LH·청약홈 공공데이터에서 새 공고를 하루 여러 번 가져와요. 기관 사이트를 돌아다닐 필요가 없어요.",
  },
  {
    Icon: ClipboardCheck,
    title: "조건을 사람 말로 정리해요",
    body: "수십 쪽짜리 공고문에서 자격 요건과 배점표를 뽑아 구조화하고, 운영자가 검수해요. 원문은 링크로 남겨요.",
  },
  {
    Icon: ListChecks,
    title: "내 조건과 대조해요",
    body: "신청 가능·조건 미달·확인 필요로 나누고, 가능한 공고는 예상 순위와 가점까지 보여드려요. 미달이면 어떤 항목인지 알려줘요.",
  },
];

export default function LandingPage() {
  const upcoming = ANNOUNCEMENTS.filter((a) => a.status === "published" && daysLeft(a.applyEnd) >= 0)
    .sort((a, b) => daysLeft(a.applyEnd) - daysLeft(b.applyEnd))
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-[30px] font-extrabold leading-[1.2] text-ink md:text-[42px]">
              흩어진 공공주택 공고,
              <br />
              내 조건 하나로 한 번에 봐요.
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2 md:text-[17px]">
              국민임대·행복주택·매입임대·청년안심주택 공고를 매일 모아서, 신청할 수 있는지와 몇 순위인지 계산해
              드려요. 마감 전에는 알림을 보내요.
            </p>
          </div>

          <Card id="quick" className="mt-8 scroll-mt-24">
            <p className="text-lg font-bold text-ink">가입 없이 바로 확인해 보세요</p>
            <p className="mb-5 mt-1 text-sm text-ink-3">다섯 가지만 고르면 지금 올라온 공고마다 판정이 붙어요.</p>
            <QuickFilter />
          </Card>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <h2 className="text-xl font-bold text-ink md:text-2xl">이렇게 동작해요</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon size={20} strokeWidth={2.2} />
                </span>
                <span className="text-sm font-bold text-ink-3 tnum">{i + 1}단계</span>
              </div>
              <p className="mt-3 text-[17px] font-bold text-ink">{title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <section className="bg-surface border-y border-line">
        <Container className="py-12 md:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink md:text-2xl">마감이 가까운 공고</h2>
              <p className="mt-1 text-ink-3">조건을 입력하면 각 공고에 판정이 붙어요.</p>
            </div>
            <Link href="/announcements" className="inline-flex items-center gap-1 text-[15px] font-semibold text-brand">
              전체 보기 <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            {upcoming.map((a) => (
              <li key={a.id}>
                <AnnouncementRow a={a} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-[17px] font-bold text-ink">소득 구간, 건강보험료 하나로 계산해요</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
              공고는 「도시근로자 월평균소득의 100% 이하」처럼 적혀 있어서 내 소득이 어디인지 알기 어려워요. 월
              건강보험료만 넣으면 구간을 계산해 드려요. 금액은 저장하지 않아요.
            </p>
            <ButtonLink href="/tools/income" variant="secondary" className="mt-4">
              소득 구간 계산하기
            </ButtonLink>
          </Card>
          <div className="rounded-xl bg-brand p-5 text-white shadow-card md:p-6">
            <div className="flex items-center gap-2">
              <Bell size={20} />
              <p className="text-[17px] font-bold">가입하면 이렇게 달라져요</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-white/90">
              <li>조건을 한 번만 입력하면 새 공고가 올라올 때마다 자동으로 판정돼요.</li>
              <li>신청 가능한 공고가 마감 3일 전, 1일 전이면 알림을 보내요.</li>
              <li>관심 공고를 모아두고 순위·가점 내역을 언제든 다시 봐요.</li>
            </ul>
            <ButtonLink href="/signup" variant="inverse" className="mt-4">
              카카오로 3초 만에 시작
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
