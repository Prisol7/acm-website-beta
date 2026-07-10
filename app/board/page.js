import { getLeaders } from '@/lib/board';
import BoardClient from './BoardClient';

export default async function BoardPage() {
  const leaders = await getLeaders();

  const sections = [
    {
      id: 'board',
      label: 'Board',
      title: 'Executive Board',
      blurb: 'The elected students who lead ACM and keep everything running.',
      members: leaders.board,
    },
    {
      id: 'officers',
      label: 'Officers',
      title: 'Officers',
      blurb: 'Officers who support the board and help operations run smoothly.',
      members: leaders.officers,
    },
    {
      id: 'committees',
      label: 'Committees',
      title: 'Committees',
      blurb: 'Member driven teams focused on events, workshops, and outreach.',
      members: leaders.committee,
    },
    {
      id: 'advisors',
      label: 'Advisors',
      title: 'Faculty Advisors',
      blurb: 'Faculty who mentor the chapter and connect us with the department.',
      members: leaders.advisors,
    },
  ];

  return <BoardClient sections={sections} />;
}
