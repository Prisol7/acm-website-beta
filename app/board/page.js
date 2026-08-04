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
      id: 'advisors',
      label: 'Advisors',
      title: 'Faculty Advisors',
      blurb: 'Faculty who mentor the chapter and connect us with the department.',
      members: leaders.advisors,
    },
  ];

  return (
    <BoardClient
      sections={sections}
      years={years}
      currentBoardId={boardId}
      currentSchoolyear={currentYear?.schoolyear}
    />
  );
}
