import { getLeaders, getBoardYears, DEFAULT_BOARD_DOC_ID } from '@/lib/board';
import BoardClient from './BoardClient';

export default async function BoardPage({ searchParams }) {
  const params = await searchParams;
  const boardId = params?.board || DEFAULT_BOARD_DOC_ID;

  const [leaders, years] = await Promise.all([
    getLeaders(boardId),
    getBoardYears(),
  ]);

  const currentYear = years.find((y) => y.id === boardId);

  const sections = [
    {
      id: 'executive',
      label: 'ACM Board',
      title: 'ACM Board',
      blurb: 'The elected students who lead ACM and keep everything running.',
      members: leaders.executive,
    },
    {
      id: 'project-team',
      label: 'Project Team',
      title: 'Project Team',
      blurb: 'The team behind our project workshops, from planning to execution.',
      members: leaders.projectTeam,
    },
    {
      id: 'web-team',
      label: 'Web Team',
      title: 'Web Team',
      blurb: 'The team who builds and maintains everything you see on this site.',
      members: leaders.webTeam,
    },
    {
      id: 'coordinating',
      label: 'Coordinating',
      title: 'Coordinating Officers',
      blurb: 'Officers who keep events, logistics, and communication running smoothly.',
      members: leaders.coordinating,
    },
    {
      id: 'administrative',
      label: 'Administrative',
      title: 'Administrative Officers',
      blurb: 'Officers who handle the chapter’s day-to-day administration.',
      members: leaders.administrative,
    },
    {
      id: 'executive-officers',
      label: 'Executive',
      title: 'Executive Officers',
      blurb: 'Officers supporting the exec board across the chapter’s operations.',
      members: leaders.executiveOfficers,
    },
    {
      id: 'finance',
      label: 'Finance',
      title: 'Finance Officers',
      blurb: 'Officers who manage the chapter’s budget and finances.',
      members: leaders.finance,
    },
    {
      id: 'advisors',
      label: 'Advisors',
      title: 'Faculty Advisors',
      blurb: 'Faculty who mentor the chapter and connect us with the department.',
      members: leaders.advisors,
    },
  ].filter((section) => section.members.length > 0);

  return (
    <BoardClient
      sections={sections}
      years={years}
      currentBoardId={boardId}
      currentSchoolyear={currentYear?.schoolyear}
    />
  );
}
