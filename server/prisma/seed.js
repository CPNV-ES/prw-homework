import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.create({
      data: { name: 'Mathematics' }
    }),
    prisma.subject.create({
      data: { name: 'Physics' }
    }),
    prisma.subject.create({
      data: { name: 'Chemistry' }
    }),
    prisma.subject.create({
      data: { name: 'Biology' }
    }),
    prisma.subject.create({
      data: { name: 'Computer Science' }
    }),
    prisma.subject.create({
      data: { name: 'Literature' }
    })
  ]);

  // Create states
  const states = await Promise.all([
    prisma.state.create({
      data: {
        name: 'Not Started',
        color: '#FF0000',
        icon: '⏳'
      }
    }),
    prisma.state.create({
      data: {
        name: 'In Progress',
        color: '#FFA500',
        icon: '🔄'
      }
    }),
    prisma.state.create({
      data: {
        name: 'Completed',
        color: '#00FF00',
        icon: '✅'
      }
    }),
    prisma.state.create({
      data: {
        name: 'Overdue',
        color: '#800000',
        icon: '⚠️'
      }
    })
  ]);

  // Calculate dates
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  // Create homeworks
  const homeworks = [
    // Past assignments
    {
      title: 'Algebra Assignment',
      description: 'Solve quadratic equations',
      deadline: new Date(twoWeeksAgo.getTime() + 2 * 24 * 60 * 60 * 1000),
      subjectId: subjects[0].id
    },
    {
      title: 'Cell Biology Report',
      description: 'Write a detailed report on cell division',
      deadline: new Date(twoWeeksAgo.getTime() + 5 * 24 * 60 * 60 * 1000),
      subjectId: subjects[3].id
    },
    {
      title: 'Shakespeare Analysis',
      description: 'Analyze Hamlet\'s soliloquy',
      deadline: new Date(twoWeeksAgo.getTime() + 7 * 24 * 60 * 60 * 1000),
      subjectId: subjects[5].id
    },
    
    // Current assignments
    {
      title: 'Newton\'s Laws',
      description: 'Study and apply Newton\'s three laws of motion',
      deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      subjectId: subjects[1].id
    },
    {
      title: 'Chemical Reactions',
      description: 'Balance chemical equations',
      deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      subjectId: subjects[2].id
    },
    {
      title: 'Data Structures Project',
      description: 'Implement a binary search tree',
      deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      subjectId: subjects[4].id
    },
    {
      title: 'Differential Equations',
      description: 'Solve first-order differential equations',
      deadline: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
      subjectId: subjects[0].id
    },
    
    // Future assignments
    {
      title: 'Geometry Problems',
      description: 'Solve triangle congruence problems',
      deadline: new Date(twoWeeksFromNow.getTime() - 2 * 24 * 60 * 60 * 1000),
      subjectId: subjects[0].id
    },
    {
      title: 'Thermodynamics',
      description: 'Study heat transfer mechanisms',
      deadline: new Date(twoWeeksFromNow.getTime() - 1 * 24 * 60 * 60 * 1000),
      subjectId: subjects[1].id
    },
    {
      title: 'Organic Chemistry',
      description: 'Study hydrocarbon reactions',
      deadline: new Date(twoWeeksFromNow.getTime() - 3 * 24 * 60 * 60 * 1000),
      subjectId: subjects[2].id
    },
    {
      title: 'Ecosystem Analysis',
      description: 'Research local ecosystem',
      deadline: new Date(twoWeeksFromNow.getTime() - 4 * 24 * 60 * 60 * 1000),
      subjectId: subjects[3].id
    },
    {
      title: 'Web Development Project',
      description: 'Create a responsive website',
      deadline: new Date(twoWeeksFromNow.getTime() - 5 * 24 * 60 * 60 * 1000),
      subjectId: subjects[4].id
    },
    {
      title: 'Poetry Analysis',
      description: 'Analyze modern poetry',
      deadline: new Date(twoWeeksFromNow.getTime() - 6 * 24 * 60 * 60 * 1000),
      subjectId: subjects[5].id
    }
  ];

  await Promise.all(
    homeworks.map(homework => prisma.homework.create({ data: homework }))
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
