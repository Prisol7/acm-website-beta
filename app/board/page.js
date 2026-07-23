import { getLeaders } from '@/lib/board';
import BoardClient from './BoardClient';

export default async function BoardPage() {
  const leaders = await getLeaders();

  const sections = [
    {
      id: 'executive',
      label: 'Executive Board',
      title: 'Executive Board',
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

  return <BoardClient sections={sections} />;
}
