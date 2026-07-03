import React, { useEffect, useMemo, useState } from 'react';
import {
  Users,
  LayoutDashboard,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Globe,
  Search,
  ArrowUpRight,
  ChevronRight,
  Bell,
  BookOpen,
  Sliders,
  FileSpreadsheet,
  CheckCircle2,
  Send,
  Download,
} from 'lucide-react';

const SCALE_TOTAL = 5000;

function getCurrentDateWeekLabel() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor((today - startOfYear) / 86400000);
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);

  return `${formattedDate} · Week ${weekNumber}`;
}

function getCurrentTimeLabel() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const INITIAL_STUDENTS = [
  {
    id: 'DA26030239',
    initials: 'FL',
    name: 'Francisca Lawson',
    email: 'f.lawson@university.edu.ng',
    status: 'At-Risk',
    region: 'Region 04',
    age: 22,
    progress: 41,
    engagement: 51,
    inactiveDays: 11,
    forumPosts: 0,
    overdueTasks: 3,
    riskScore: 0.68,
    nudgeStatus: 'Pending',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 45, completed: 4, total: 8 },
      { id: 'c2', name: 'Python for Data Science', progress: 22, completed: 2, total: 9 },
      { id: 'c3', name: 'Statistics & Probability', progress: 56, completed: 5, total: 9 },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Module 4 Assignment — Data Analytics Fundamentals',
        due: 'Overdue by 3 days',
        impact: 8,
        completed: false,
      },
      {
        id: 't2',
        title: 'Python Practice Exercise 2',
        due: 'Overdue by 5 days',
        impact: 6,
        completed: false,
      },
      {
        id: 't3',
        title: 'Forum Reply — Statistics Week 4 Discussion',
        due: 'No reply posted yet',
        impact: 4,
        completed: false,
      },
    ],
    notifications: [
      {
        id: 1,
        from: 'Ngozi Lawson',
        title: 'Message from your instructor, Ngozi Lawson',
        message:
          'Hi Francisca! I noticed you haven’t been active in a while. You’re doing great in Statistics — I’d love to see you keep that momentum going. Is there anything I can help with? 😊',
        time: 'Today at 9:14 AM',
        read: false,
      },
    ],
    activity: [
      'Nudge received from Ngozi Lawson — “We miss you in class!”',
      'Logged in to platform',
      'Submitted Assignment 3 — Data Analytics Fundamentals',
      'Posted in Forum: “Help with Week 4 materials”',
      'Logged in to platform · Viewed Course 2 materials',
    ],
  },
  {
    id: 'DA26030329',
    initials: 'CO',
    name: 'Christina Ogbeide',
    email: 'c.ogbeide@university.edu.ng',
    status: 'Dropped',
    region: 'Region 02',
    age: 24,
    progress: 12,
    engagement: 18,
    inactiveDays: 34,
    forumPosts: 2,
    overdueTasks: 8,
    riskScore: 0.87,
    nudgeStatus: 'Pending',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 12, completed: 1, total: 8 },
      { id: 'c2', name: 'Python for Data Science', progress: 10, completed: 1, total: 9 },
      { id: 'c3', name: 'Statistics & Probability', progress: 14, completed: 1, total: 9 },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Module 2 Analytics Assignment',
        due: 'Overdue by 20 days',
        impact: 8,
        completed: false,
      },
      {
        id: 't2',
        title: 'Python Practical Exercise',
        due: 'Overdue by 18 days',
        impact: 6,
        completed: false,
      },
      {
        id: 't3',
        title: 'Forum Introduction Post',
        due: 'Not submitted',
        impact: 4,
        completed: false,
      },
    ],
    notifications: [],
    activity: ['Account inactive since mid-May', 'Missed Assignment 2 deadline'],
  },
  {
    id: 'DA26000722',
    initials: 'EA',
    name: 'Emmanuel Ayuba',
    email: 'e.ayuba@university.edu.ng',
    status: 'At-Risk',
    region: 'Region 03',
    age: 21,
    progress: 53,
    engagement: 56,
    inactiveDays: 8,
    forumPosts: 5,
    overdueTasks: 2,
    riskScore: 0.55,
    nudgeStatus: 'Sent',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 53, completed: 5, total: 9 },
      { id: 'c2', name: 'Python for Data Science', progress: 49, completed: 4, total: 8 },
      { id: 'c3', name: 'Statistics & Probability', progress: 58, completed: 5, total: 9 },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Statistics Assignment 4',
        due: 'Overdue by 2 days',
        impact: 5,
        completed: false,
      },
      {
        id: 't2',
        title: 'Python Mini Project',
        due: 'Due tomorrow',
        impact: 7,
        completed: false,
      },
    ],
    notifications: [],
    activity: ['Logged in 8 days ago', 'Completed Week 3 quiz'],
  },
  {
    id: 'DA26030323',
    initials: 'GL',
    name: 'Gabriel Lawson',
    email: 'g.lawson@university.edu.ng',
    status: 'At-Risk',
    region: 'Region 04',
    age: 23,
    progress: 41,
    engagement: 51,
    inactiveDays: 11,
    forumPosts: 2,
    overdueTasks: 3,
    riskScore: 0.68,
    nudgeStatus: 'Pending',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 45, completed: 4, total: 8 },
      { id: 'c2', name: 'Python for Data Science', progress: 22, completed: 2, total: 9 },
      { id: 'c3', name: 'Statistics & Probability', progress: 56, completed: 5, total: 9 },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Module 4 Assignment — Data Analytics Fundamentals',
        due: 'Overdue by 3 days',
        impact: 8,
        completed: false,
      },
      {
        id: 't2',
        title: 'Python Practice Exercise 2',
        due: 'Overdue by 5 days',
        impact: 6,
        completed: false,
      },
      {
        id: 't3',
        title: 'Forum Reply — Statistics Week 4 Discussion',
        due: 'No reply posted yet',
        impact: 4,
        completed: false,
      },
    ],
    notifications: [
      {
        id: 1,
        from: 'Ngozi Lawson',
        title: 'Message from your instructor, Ngozi Lawson',
        message:
          'Hi Gabriel! I noticed you haven’t been active in a while. You’re doing great in Statistics — I’d love to see you keep that momentum going. Is there anything I can help with? 😊',
        time: 'Today at 9:14 AM',
        read: false,
      },
    ],
    activity: [
      'Nudge received from Ngozi Lawson — “We miss you in class!”',
      'Logged in to platform',
      'Submitted Assignment 3 — Data Analytics Fundamentals',
      'Posted in Forum: “Help with Week 4 materials”',
      'Logged in to platform · Viewed Course 2 materials',
    ],
  },
  {
    id: 'DA26030488',
    initials: 'BA',
    name: 'Blessing Ahwe',
    email: 'b.ahwe@university.edu.ng',
    status: 'At-Risk',
    region: 'Region 05',
    age: 25,
    progress: 62,
    engagement: 63,
    inactiveDays: 6,
    forumPosts: 8,
    overdueTasks: 1,
    riskScore: 0.43,
    nudgeStatus: 'Sent',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 62, completed: 6, total: 9 },
      { id: 'c2', name: 'Python for Data Science', progress: 60, completed: 5, total: 8 },
      { id: 'c3', name: 'Statistics & Probability', progress: 65, completed: 6, total: 9 },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Forum Reflection Post',
        due: 'Due today',
        impact: 4,
        completed: false,
      },
    ],
    notifications: [],
    activity: ['Logged in 6 days ago', 'Opened instructor feedback'],
  },
  {
    id: 'DA26030576',
    initials: 'AT',
    name: 'Tina Adebayo',
    email: 't.adebayo@university.edu.ng',
    status: 'Active',
    region: 'Region 07',
    age: 20,
    progress: 82,
    engagement: 84,
    inactiveDays: 2,
    forumPosts: 14,
    overdueTasks: 0,
    riskScore: 0.22,
    nudgeStatus: 'None',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 82, completed: 7, total: 8 },
      { id: 'c2', name: 'Python for Data Science', progress: 78, completed: 7, total: 9 },
      { id: 'c3', name: 'Statistics & Probability', progress: 88, completed: 8, total: 9 },
    ],
    tasks: [],
    notifications: [],
    activity: ['Submitted current assignment', 'Posted in forum'],
  },
  {
    id: 'DA26030690',
    initials: 'NF',
    name: 'Fredrick Namugabo',
    email: 'f.namugabo@university.edu.ng',
    status: 'Active',
    region: 'Region 01',
    age: 26,
    progress: 91,
    engagement: 88,
    inactiveDays: 1,
    forumPosts: 21,
    overdueTasks: 0,
    riskScore: 0.12,
    nudgeStatus: 'None',
    courses: [
      { id: 'c1', name: 'Data Analytics', progress: 91, completed: 8, total: 8 },
      { id: 'c2', name: 'Python for Data Science', progress: 90, completed: 8, total: 9 },
      { id: 'c3', name: 'Statistics & Probability', progress: 92, completed: 9, total: 9 },
    ],
    tasks: [],
    notifications: [],
    activity: ['Logged in today', 'Completed all assignments'],
  },
];

function LearnPulseLogo({ onClick, dark = false }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <div className="h-8 w-8 rounded-xl bg-[#3f63f2] flex items-center justify-center shadow-lg shadow-blue-600/30">
        <div className="h-4 w-4 rounded-full border-2 border-white flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
        </div>
      </div>

      <span className={`font-black tracking-tight text-sm ${dark ? 'text-slate-900' : 'text-white'}`}>
        Learn<span className={dark ? 'text-[#3f63f2]' : 'text-[#6aa2ff]'}>Pulse</span>
      </span>
    </button>
  );
}

function StatCard({ title, value, note, color = 'text-slate-900', highlight = false }) {
  return (
    <div
      className={`group ${
        highlight ? 'bg-[#fffbea] border-[#fde68a]' : 'bg-white border-slate-200'
      } border rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 hover:scale-[1.015] hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40`}
    >
      <p className="text-xs uppercase font-black text-slate-500 transition-colors group-hover:text-[#3f63f2]">
        {title}
      </p>

      <p className={`text-3xl sm:text-4xl font-black mt-5 ${color} transition-transform duration-300 group-hover:scale-105`}>
        {value}
      </p>

      <p className="text-sm text-slate-500 font-bold mt-1 transition-colors group-hover:text-slate-700">
        {note}
      </p>
    </div>
  );
}

function FeatureCard({ type, title, body, points }) {
  const styles = {
    blue: {
      iconBg: 'bg-blue-100',
      iconText: 'text-[#2f6df6]',
      dot: 'text-[#2f6df6]',
      icon: (
        <div className="h-6 w-6 rounded-full border-2 border-[#2f6df6] flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-[#2f6df6]"></div>
        </div>
      ),
    },
    amber: {
      iconBg: 'bg-amber-100',
      iconText: 'text-[#d88900]',
      dot: 'text-[#d88900]',
      icon: <MessageSquare className="h-6 w-6" />,
    },
    green: {
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-600',
      dot: 'text-emerald-600',
      icon: <BarChart3 className="h-6 w-6" />,
    },
  };

  const s = styles[type];

  return (
    <div className="bg-[#eaf5ff] rounded-3xl p-8 lg:p-9 shadow-sm border border-blue-50">
      <div className={`h-12 w-12 rounded-2xl ${s.iconBg} ${s.iconText} flex items-center justify-center mb-10`}>
        {s.icon}
      </div>
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-5 text-sm text-slate-600 leading-7">{body}</p>
      <ul className="mt-7 space-y-3 text-sm text-slate-700">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className={`${s.dot} font-black`}>•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricPanel({ value, label, note, color, border }) {
  return (
    <div className={`bg-[#e5f4ff] border-l-4 ${border} rounded-2xl p-6`}>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
      <p className="text-sm font-black mt-2">{label}</p>
      <p className="text-xs text-slate-500 mt-1">{note}</p>
    </div>
  );
}

function InputDisplay({ label, value, active = false }) {
  return (
    <div>
      <label className="text-sm font-black text-slate-700">{label}</label>
      <div
        className={`mt-2 bg-white ${
          active ? 'border-[#3f63f2]' : 'border-slate-200'
        } border rounded-xl px-4 py-3 text-sm text-slate-700 shadow-sm`}
      >
        {value}
      </div>
    </div>
  );
}

function LoginMetric({ icon, value, text }) {
  return (
    <div className="bg-white/10 border border-white/15 rounded-xl p-4 flex items-center gap-4">
      <span className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">{icon}</span>
      <div>
        <p className="font-black">{value}</p>
        <p className="text-sm text-blue-100">{text}</p>
      </div>
    </div>
  );
}

function getStudentHeaderContent(activeMenu) {
  if (activeMenu === 'myProgress') {
    return {
      title: 'My Learning Progress 👋',
      subtitle: 'Here’s how your engagement is looking — let’s get back on track!',
    };
  }

  if (activeMenu === 'studentAssignments') {
    return {
      title: 'My Assignments 📝',
      subtitle: 'View published assignments, upload completed work, and track your grades.',
    };
  }

  if (activeMenu === 'myCourses') {
    return {
      title: 'My Courses 📚',
      subtitle: 'See the courses you are registered for and monitor your learning progress.',
    };
  }

  if (activeMenu === 'notifications') {
    return {
      title: 'My Notifications 🔔',
      subtitle: 'Read assignment alerts, grade updates, and important platform messages.',
    };
  }

  if (activeMenu === 'studentMessages') {
    return {
      title: 'My Messages 💬',
      subtitle: 'Read messages from educators/admins and send support requests.',
    };
  }

  if (activeMenu === 'studentTutorials') {
    return {
      title: 'Student Tutorials 📘',
      subtitle: 'Learn how to use your progress, assignments, courses, notifications, and messages pages.',
    };
  }

  return {
    title: 'My Learning Progress 👋',
    subtitle: 'Here’s how your engagement is looking — let’s get back on track!',
  };
}

export default function App() {
  const [appRole, setAppRole] = useState('landing');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedLoginRole, setSelectedLoginRole] = useState(null);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState('DA26030323');
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkRecipientIds, setBulkRecipientIds] = useState([]);
  const [nudgeText, setNudgeText] = useState(
    "Hi Gabriel 👋\n\nI noticed you haven’t been active on LearnPulse for the past 11 days. I just wanted to check in and see how you’re doing.\n\nYou were making really good progress in Statistics & Probability — it would be great to see you continue that momentum. If there’s anything making it hard to stay on track, please let me know."
  );
  const [lastSentNudgePreview, setLastSentNudgePreview] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [educatorNotifications, setEducatorNotifications] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [studentMessageForm, setStudentMessageForm] = useState({
    recipient: 'educator',
    subject: '',
    message: '',
  });
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    course: 'Data Analytics',
    due: '',
    impact: 5,
    assignedTo: 'all',
    materialName: '',
  });

  const currentDateWeekLabel = getCurrentDateWeekLabel();

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === selectedStudentId) || students[0],
    [students, selectedStudentId]
  );

  const activeStudents = students.filter((student) => student.status === 'Active');
  const atRiskStudents = students.filter((student) => student.status === 'At-Risk');
  const droppedStudents = students.filter((student) => student.status === 'Dropped');
  const atRiskRows = students.filter((student) => student.status === 'At-Risk' || student.status === 'Dropped');

  const activeRate = ((activeStudents.length / students.length) * 100).toFixed(1);
  const atRiskRate = ((atRiskStudents.length / students.length) * 100).toFixed(1);
  const droppedRate = ((droppedStudents.length / students.length) * 100).toFixed(1);
  const scaledCount = (count) => Math.round((count / students.length) * SCALE_TOTAL);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const regionAnalytics = useMemo(() => {
    const regions = [
      'Region 01',
      'Region 02',
      'Region 03',
      'Region 04',
      'Region 05',
      'Region 06',
      'Region 07',
      'Region 08',
      'Region 09',
      'Region 10',
    ];

    return regions.map((region) => {
      const regionStudents = students.filter((student) => student.region === region);
      const safeTotal = regionStudents.length || 1;

      if (regionStudents.length === 0) {
        return {
          region,
          active: region === 'Region 07' ? 45 : 35,
          atRisk: region === 'Region 07' ? 33 : 32,
          dropped: region === 'Region 07' ? 22 : region === 'Region 04' ? 41.2 : 33,
        };
      }

      return {
        region,
        active: Number(((regionStudents.filter((student) => student.status === 'Active').length / safeTotal) * 100).toFixed(1)),
        atRisk: Number(((regionStudents.filter((student) => student.status === 'At-Risk').length / safeTotal) * 100).toFixed(1)),
        dropped: Number(((regionStudents.filter((student) => student.status === 'Dropped').length / safeTotal) * 100).toFixed(1)),
      };
    });
  }, [students]);

  const openRole = (role) => {
    if (role === 'landing') {
      setAppRole('landing');
      setSelectedLoginRole(null);
      return;
    }

    if (role === 'login') {
      setAppRole('login');
      setSelectedLoginRole(null);
      return;
    }

    setAppRole(role);

    if (role === 'educator') setActiveMenu('dashboard');
    if (role === 'student') setActiveMenu('myProgress');
    if (role === 'admin') setActiveMenu('adminOverview');
  };

  const goToRoleLogin = (role) => {
    setAppRole('login');
    setSelectedLoginRole(role);
  };

  const openStudentProfile = (studentId) => {
    setSelectedStudentId(studentId);
    setActiveMenu('studentProfile');
  };

  const openNudgeComposer = (studentId) => {
    const student = students.find((item) => item.id === studentId);
    setSelectedStudentId(studentId);
    setBulkRecipientIds([]);
    setNudgeText(
      `Hi ${student?.name.split(' ')[0] || 'there'} 👋\n\nI noticed you haven’t been active on LearnPulse for the past ${
        student?.inactiveDays || 0
      } days. I just wanted to check in and see how you’re doing.\n\nYou were making good progress, and it would be great to see you continue that momentum. If there’s anything making it hard to stay on track, please let me know.`
    );
    setActiveMenu('messages');
  };

  const openBulkNudgeComposer = (recipientIds) => {
    if (!recipientIds.length) return;

    const firstRecipientId = recipientIds[0];

    setSelectedStudentId(firstRecipientId);
    setBulkRecipientIds(recipientIds);

    setNudgeText(
      `Hi everyone 👋

I noticed that some of you have been inactive or falling behind on LearnPulse. I wanted to check in and encourage you to return to your learning activities.

Please review your pending assignments, course materials, and forum tasks. Completing these activities will help improve your progress and move you closer to Active status.

If you are facing any challenge, please let me know so I can support you.`
    );

    setActiveMenu('messages');
  };

  const sendNudge = (recipientIds = [selectedStudentId]) => {
    const finalMessage = nudgeText.trim();
    const sentTime = getCurrentTimeLabel();

    if (!finalMessage || recipientIds.length === 0) return;

    setLastSentNudgePreview(finalMessage);

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        recipientIds.includes(student.id)
          ? {
              ...student,
              nudgeStatus: 'Sent',
              notifications: [
                {
                  id: Date.now() + Math.random(),
                  from: 'Ngozi Lawson',
                  title: 'Message from your instructor, Ngozi Lawson',
                  message: finalMessage,
                  time: sentTime,
                  read: false,
                },
                ...student.notifications,
              ],
            }
          : student
      )
    );

    setBulkRecipientIds([]);
    setActiveMenu('atRisk');
  };

  const completeTask = (taskId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== selectedStudentId) return student;

        const completedTask = student.tasks.find((task) => task.id === taskId);
        const impact = completedTask?.impact || 5;

        const updatedTasks = student.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true, due: 'Completed just now' } : task
        );

        const newEngagement = Math.min(100, student.engagement + impact);
        const newProgress = Math.min(100, student.progress + impact);
        const newRisk = Math.max(0.1, student.riskScore - 0.08);

        return {
          ...student,
          tasks: updatedTasks,
          engagement: newEngagement,
          progress: newProgress,
          overdueTasks: updatedTasks.filter((task) => !task.completed).length,
          riskScore: Number(newRisk.toFixed(2)),
          inactiveDays: 0,
          status: newEngagement >= 65 ? 'Active' : student.status,
          activity: [`Completed task: ${completedTask?.title || 'Assignment'}`, ...student.activity],
        };
      })
    );
  };

  const createAssignment = () => {
    if (!assignmentForm.title.trim()) return;

    const targetStudents =
      assignmentForm.assignedTo === 'all'
        ? students
        : students.filter((student) => student.status === assignmentForm.assignedTo);

    const assignmentId = `assignment-${Date.now()}`;
    const alertTime = getCurrentTimeLabel();

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        const isTarget = targetStudents.some((target) => target.id === student.id);
        if (!isTarget) return student;

        return {
          ...student,
          overdueTasks: student.overdueTasks + 1,
          tasks: [
            {
              id: assignmentId,
              title: assignmentForm.title.trim(),
              due: assignmentForm.due ? `Due on ${assignmentForm.due}` : 'New assignment added',
              impact: Number(assignmentForm.impact),
              completed: false,
              course: assignmentForm.course,
              materialName: assignmentForm.materialName || 'No material attached',
            },
            ...student.tasks,
          ],
          notifications: [
            {
              id: Date.now() + Math.random(),
              from: 'Ngozi Lawson',
              title: 'New assignment uploaded',
              message: `A new assignment has been uploaded for ${assignmentForm.course}: ${assignmentForm.title.trim()}. Please open it from your progress page and complete it on time.`,
              time: alertTime,
              read: false,
            },
            ...student.notifications,
          ],
        };
      })
    );

    setAssignmentForm({
      title: '',
      course: 'Data Analytics',
      due: '',
      impact: 5,
      assignedTo: 'all',
      materialName: '',
    });

    setActiveMenu('assignments');
  };


  const submitStudentAssignment = (taskId, submissionFileName) => {
    let submittedAssignmentInfo = null;
    const submittedTime = getCurrentTimeLabel();

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== selectedStudentId) return student;

        const targetTask = student.tasks.find((task) => task.id === taskId);

        submittedAssignmentInfo = {
          studentId: student.id,
          studentName: student.name,
          studentInitials: student.initials,
          taskId,
          title: targetTask?.title || 'Assignment',
          course: targetTask?.course || 'General Course',
          submissionFileName,
          submittedAt: submittedTime,
        };

        const updatedTasks = student.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                submitted: true,
                submittedAt: submittedTime,
                submissionFileName,
                grade: task.grade || 'Pending',
                feedback: task.feedback || 'Awaiting educator review',
              }
            : task
        );

        return {
          ...student,
          tasks: updatedTasks,
          activity: [`Submitted assignment: ${targetTask?.title || 'Assignment'}`, ...student.activity],
          notifications: [
            {
              id: Date.now() + Math.random(),
              from: 'LearnPulse',
              title: 'Assignment submitted',
              message: 'Your assignment has been submitted successfully. Your grade will appear once it is reviewed.',
              time: submittedTime,
              read: false,
            },
            ...student.notifications,
          ],
        };
      })
    );

    if (submittedAssignmentInfo) {
      setEducatorNotifications((prev) => [
        {
          id: Date.now() + Math.random(),
          type: 'submission',
          title: 'New assignment submission',
          message: `${submittedAssignmentInfo.studentName} submitted ${submittedAssignmentInfo.title}.`,
          time: submittedAssignmentInfo.submittedAt,
          read: false,
          graded: false,
          ...submittedAssignmentInfo,
        },
        ...prev,
      ]);
    }
  };

  const gradeStudentAssignment = ({ studentId, taskId, grade, feedback }) => {
    if (!grade.trim()) return;

    const gradedTime = getCurrentTimeLabel();

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;

        const gradedTask = student.tasks.find((task) => task.id === taskId);

        return {
          ...student,
          tasks: student.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  grade,
                  feedback: feedback || 'Reviewed by educator',
                  gradedAt: gradedTime,
                  completed: true,
                }
              : task
          ),
          notifications: [
            {
              id: Date.now() + Math.random(),
              from: 'Ngozi Lawson',
              title: 'Assignment graded',
              message: `Your assignment "${gradedTask?.title || 'Assignment'}" has been graded. Grade: ${grade}.${feedback ? ` Feedback: ${feedback}` : ''}`,
              time: gradedTime,
              read: false,
            },
            ...student.notifications,
          ],
        };
      })
    );

    setEducatorNotifications((prev) =>
      prev.map((notification) =>
        notification.studentId === studentId && notification.taskId === taskId
          ? { ...notification, read: true, graded: true }
          : notification
      )
    );
  };

  const sendStudentMessage = () => {
    if (!studentMessageForm.subject.trim() || !studentMessageForm.message.trim()) return;

    const isAdminMessage = studentMessageForm.recipient === 'admin';
    const recipientName = isAdminMessage ? 'Administrator' : 'Ngozi Lawson';
    const sentTime = getCurrentTimeLabel();

    const messageNotice = {
      id: Date.now() + Math.random(),
      type: 'student-message',
      title: 'New student message',
      message: `${selectedStudent.name} sent a message: ${studentMessageForm.subject}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      studentInitials: selectedStudent.initials,
      subject: studentMessageForm.subject,
      body: studentMessageForm.message,
      time: sentTime,
      read: false,
    };

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== selectedStudentId) return student;

        return {
          ...student,
          notifications: [
            {
              id: Date.now() + Math.random(),
              from: selectedStudent.name,
              to: recipientName,
              title: studentMessageForm.subject,
              message: studentMessageForm.message,
              time: sentTime,
              read: true,
              direction: 'sent',
            },
            ...student.notifications,
          ],
          activity: [`Sent message to ${recipientName}: ${studentMessageForm.subject}`, ...student.activity],
        };
      })
    );

    if (isAdminMessage) {
      setAdminNotifications((prev) => [messageNotice, ...prev]);
    } else {
      setEducatorNotifications((prev) => [messageNotice, ...prev]);
    }

    setStudentMessageForm({
      recipient: 'educator',
      subject: '',
      message: '',
    });
  };

  const markStudentNotificationRead = (notificationId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== selectedStudentId) return student;

        return {
          ...student,
          notifications: student.notifications.map((notification) =>
            notification.id === notificationId ? { ...notification, read: true } : notification
          ),
        };
      })
    );
  };

  const exportRegionalReport = () => {
    const rows = [
      ['Region', 'Active %', 'At-Risk %', 'Dropped %'],
      ...regionAnalytics.map((item) => [item.region, item.active, item.atRisk, item.dropped]),
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'learnpulse-regional-report.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  const DashboardSidebar = ({ role }) => {
    const isAdmin = role === 'admin';
    const isStudent = role === 'student';

    const mainItems = isStudent
      ? [
          { id: 'myProgress', label: 'My Progress', icon: <BarChart3 className="h-4 w-4" /> },
          { id: 'studentAssignments', label: 'Assignments', icon: <BookOpen className="h-4 w-4" /> },
          { id: 'myCourses', label: 'My Courses', icon: <BookOpen className="h-4 w-4" /> },
          {
            id: 'notifications',
            label: 'Notifications',
            icon: <Bell className="h-4 w-4" />,
            badge: selectedStudent.notifications.filter((item) => !item.read).length,
          },
          { id: 'studentMessages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
        ]
      : isAdmin
      ? [
          { id: 'adminOverview', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
          {
            id: 'adminAtRisk',
            label: 'At-Risk',
            icon: <AlertCircle className="h-4 w-4" />,
            badge: atRiskRows.length,
          },
          {
            id: 'adminMessages',
            label: 'Messages',
            icon: <MessageSquare className="h-4 w-4" />,
            badge: adminNotifications.filter((item) => !item.read && item.type === 'student-message').length,
            badgeColor: 'bg-[#f59e0b]',
          },
        ]
      : [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
          { id: 'students', label: 'Students', icon: <Users className="h-4 w-4" /> },
          {
            id: 'atRisk',
            label: 'At-Risk',
            icon: <AlertCircle className="h-4 w-4" />,
            badge: atRiskRows.length,
          },
          {
            id: 'messages',
            label: 'Messages',
            icon: <MessageSquare className="h-4 w-4" />,
            badge: educatorNotifications.filter((item) => !item.read && item.type === 'student-message').length,
            badgeColor: 'bg-[#f59e0b]',
          },
          {
            id: 'assignments',
            label: 'Assignments',
            icon: <BookOpen className="h-4 w-4" />,
            badge: educatorNotifications.filter((item) => !item.read).length,
            badgeColor: 'bg-[#f59e0b]',
          },
        ];

    const analyticsItems = isStudent
      ? [{ id: 'studentTutorials', label: 'Tutorials', icon: <BookOpen className="h-4 w-4" /> }]
      : isAdmin
      ? [
          { id: 'platformAnalytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
          { id: 'regionalView', label: 'Regional View', icon: <Globe className="h-4 w-4" /> },
          { id: 'adminTutorials', label: 'Tutorials', icon: <BookOpen className="h-4 w-4" /> },
        ]
      : [
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
          { id: 'regionalView', label: 'Regional View', icon: <Globe className="h-4 w-4" /> },
          { id: 'tutorials', label: 'Tutorials', icon: <BookOpen className="h-4 w-4" /> },
        ];

    const activeColor = isStudent ? 'bg-emerald-500' : 'bg-[#3f63f2]';
    const userInitials = isStudent ? selectedStudent.initials : isAdmin ? 'FA' : 'NL';
    const userName = isStudent ? selectedStudent.name : isAdmin ? 'Fatima Al-Hassan' : 'Ngozi Lawson';
    const userRole = isStudent ? 'Student · 3 courses' : isAdmin ? 'Administrator' : 'Educator';

    return (
      <aside className="w-full lg:w-[250px] bg-[#101522] text-white lg:min-h-screen flex lg:flex-col border-r border-slate-800 shrink-0">
        <div className="hidden lg:flex flex-col w-full min-h-screen">
          <div className="p-6 border-b border-slate-800">
            <LearnPulseLogo onClick={() => openRole('landing')} />
          </div>

          <div className="flex-1 p-5 space-y-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
                {isStudent ? 'Learning' : 'Main'}
              </p>

              <div className="space-y-2">
                {mainItems.map((item) => (
                  <button
                    key={item.id}
                    data-student-assignments-link={item.id === 'studentAssignments' ? true : undefined}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeMenu === item.id
                        ? `${activeColor} text-white shadow-lg shadow-blue-900/30`
                        : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>

                    {item.badge > 0 && (
                      <span
                        className={`${
                          item.badgeColor || 'bg-rose-500'
                        } text-white text-[10px] h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center font-black`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3">
                {isStudent ? 'Account' : 'Analytics'}
              </p>

              <div className="space-y-2">
                {analyticsItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeMenu === item.id
                        ? `${activeColor} text-white shadow-lg shadow-blue-900/30`
                        : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3 bg-slate-800/80 rounded-xl p-3">
              <div
                className={`h-10 w-10 rounded-full ${
                  isStudent ? 'bg-emerald-500' : 'bg-[#3f63f2]'
                } flex items-center justify-center text-white text-sm font-black`}
              >
                {userInitials}
              </div>
              <div>
                <p className="text-sm font-black text-white">{userName}</p>
                <p className="text-xs text-slate-400">{userRole}</p>
              </div>
            </div>

            <button
              onClick={() => openRole('landing')}
              className="w-full flex items-center gap-3 bg-[#26231f] hover:bg-[#302a24] text-white rounded-xl p-3 text-sm font-bold"
            >
              <span className="text-rose-500 text-lg">↪</span>
              <span>
                Logout
                <span className="block text-xs text-slate-500 font-medium">
                  {isAdmin ? 'Administrator' : isStudent ? 'Student' : 'Educator'}
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="lg:hidden w-full p-4 flex items-center justify-between">
          <LearnPulseLogo onClick={() => openRole('landing')} />
          <select
            value={activeMenu}
            onChange={(event) => setActiveMenu(event.target.value)}
            className="bg-slate-800 text-white text-sm rounded-xl px-3 py-2 outline-none"
          >
            {[...mainItems, ...analyticsItems].map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </aside>
    );
  };

  if (appRole === 'landing') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <style>
          {`
            @keyframes learnpulseFloat {
              0% { transform: translateY(0) rotate(-3deg); }
              18% { transform: translateY(22px) rotate(-3deg); }
              28% { transform: translateY(14px) rotate(-3deg); }
              42% { transform: translateY(24px) rotate(-3deg); }
              60% { transform: translateY(0) rotate(-3deg); }
              100% { transform: translateY(0) rotate(-3deg); }
            }

            .learnpulse-float-card {
              animation: learnpulseFloat 2.4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
              will-change: transform;
            }

            @media (max-width: 1023px) {
              @keyframes learnpulseFloat {
                0% { transform: translateY(0) rotate(0deg); }
                18% { transform: translateY(16px) rotate(0deg); }
                28% { transform: translateY(10px) rotate(0deg); }
                42% { transform: translateY(18px) rotate(0deg); }
                60% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(0) rotate(0deg); }
              }
            }
          `}
        </style>

        <header className="bg-[#02061f] border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <LearnPulseLogo onClick={() => openRole('landing')} />

            <nav className="hidden md:flex items-center gap-10 text-xs font-bold text-slate-300">
              <a href="#features" className="hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white">
                How it works
              </a>
              <a href="#teams" className="hover:text-white">
                For Teams
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openRole('login')}
                className="hidden sm:inline-flex text-xs font-bold text-slate-300 hover:text-white"
              >
                Log in
              </button>

              <button
                onClick={() => openRole('login')}
                className="text-xs font-black text-white px-4 py-2.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 transition-all hover:ring-4 hover:ring-white/10 active:scale-95"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#02061f] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(47,109,246,0.25),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(47,109,246,0.18),transparent_25%)]"></div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-[11px] font-bold text-slate-300">
                <span className="h-2 w-2 rounded-full bg-[#f59e0b]"></span>
                EdTech Platform · DeTechified Advanced Programme
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98] max-w-xl">
                See who&apos;s at risk before they <span className="text-[#f59e0b]">drop out.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                LearnPulse monitors real-time engagement signals across your entire student cohort, giving educators the insight to intervene at exactly the right moment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openRole('login')}
                  className="bg-[#2f6df6] hover:bg-[#245bdd] text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:ring-4 hover:ring-blue-400/20 active:scale-95"
                >
                  Request a Demo →
                </button>

                <a
                  href="#how-it-works"
                  className="bg-transparent hover:bg-white/10 text-white font-black text-sm px-6 py-3.5 rounded-xl border border-white/10 text-center transition-all hover:-translate-y-0.5 hover:ring-4 hover:ring-white/10"
                >
                  See how it works
                </a>
              </div>

              <p className="text-xs text-slate-500">
                — Built on real data from 5,000 students across 10 regions
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>

              <div className="relative bg-[#dcecff] rounded-2xl p-3 sm:p-4 shadow-2xl shadow-blue-950/60 border border-blue-200/40 learnpulse-float-card">
                <div className="bg-[#10203a] rounded-t-xl px-4 py-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                  <span className="ml-3 text-[10px] text-slate-400 font-bold">
                    LearnPulse · Educator Dashboard
                  </span>
                </div>

                <div className="bg-white rounded-b-xl p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Active</p>
                      <p className="text-xl font-black text-emerald-600">{activeRate}%</p>
                      <p className="text-[10px] text-emerald-500 font-bold">↑ Stable</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase">At-Risk</p>
                      <p className="text-xl font-black text-[#c47b00]">{atRiskRate}%</p>
                      <p className="text-[10px] text-[#c47b00] font-bold">⚠ Monitor</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Dropped</p>
                      <p className="text-xl font-black text-rose-600">{droppedRate}%</p>
                      <p className="text-[10px] text-rose-600 font-bold">◆ Critical</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-black text-slate-900 uppercase">At-risk alerts</p>
                      <span className="text-[10px] font-black text-rose-600">
                        {atRiskRows.length} urgent
                      </span>
                    </div>

                    {atRiskRows.slice(0, 3).map((student) => (
                      <div key={student.id} className="grid grid-cols-[1fr_80px_42px] gap-3 items-center py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              student.status === 'Dropped' ? 'bg-rose-600' : 'bg-[#c47b00]'
                            }`}
                          ></span>
                          <span className="text-[11px] font-bold text-slate-700">
                            {student.name}
                          </span>
                        </div>

                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`${
                              student.status === 'Dropped' ? 'bg-rose-600' : 'bg-[#c47b00]'
                            } h-full`}
                            style={{ width: `${student.riskScore * 100}%` }}
                          ></div>
                        </div>

                        <button
                          onClick={() => openNudgeComposer(student.id)}
                          className="bg-[#2f6df6] text-white text-[9px] font-black px-2 py-1 rounded-md"
                        >
                          Nudge
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white text-slate-900">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="text-center py-9 px-6">
                <p className="text-4xl font-black text-emerald-600">{activeRate}%</p>
                <p className="text-sm font-black mt-2">Actively Engaged Students</p>
                <p className="text-xs text-slate-500 mt-1">
                  Those who log in, submit work, and participate
                </p>
              </div>

              <div className="text-center py-9 px-6">
                <p className="text-4xl font-black text-[#c47b00]">{atRiskRate}%</p>
                <p className="text-sm font-black mt-2">At-Risk Right Now</p>
                <p className="text-xs text-slate-500 mt-1">
                  Showing clear disengagement signals today
                </p>
              </div>

              <div className="text-center py-9 px-6">
                <p className="text-4xl font-black text-rose-600">{droppedRate}%</p>
                <p className="text-sm font-black mt-2">Have Already Dropped Out</p>
                <p className="text-xs text-slate-500 mt-1">
                  Nearly 1 in 3 are gone without a single intervention
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex text-[11px] font-black text-[#2f6df6] bg-blue-50 px-4 py-1.5 rounded-full">
                Platform Features
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-6 text-slate-950 leading-tight">
                Everything educators need to
                <br className="hidden sm:block" /> act early
              </h2>

              <p className="mt-5 text-base text-slate-500 leading-relaxed">
                Designed around clarity, actionability, and empathy — the three principles that matter most in EdTech.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <FeatureCard
                type="blue"
                title="Early Warning Signals"
                body="Tracks login frequency, assignment completion, and forum participation to flag students before they disengage not after."
                points={[
                  'Real-time risk score per student',
                  'Colour-coded status badges (Active / At-Risk / Dropped)',
                  'Configurable alert thresholds',
                ]}
              />

              <FeatureCard
                type="amber"
                title="One-Click Nudges"
                body="Send personalised re-engagement messages to individual students or entire at-risk cohorts with intelligent templates built right into the dashboard."
                points={[
                  'Personalised message templates',
                  'Individual or group delivery',
                  'In-app + email notification channels',
                ]}
              />

              <FeatureCard
                type="green"
                title="Regional Analytics"
                body="Monitor retention patterns across cohorts, courses, and all 10 regions from a single institutional view. Identify where help is most urgently needed."
                points={[
                  '10-region performance breakdown',
                  'Filterable by course, cohort, and date',
                  'Exportable PDF/PNG reports for leadership',
                ]}
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#eef7ff] py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex text-[11px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              How it Works
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-5">
              From data to action in three steps
            </h2>

            <div className="relative mt-16 grid md:grid-cols-3 gap-10">
              <div className="hidden md:block absolute top-8 left-[17%] right-[17%] h-0.5 bg-gradient-to-r from-[#2f6df6] via-teal-500 to-green-600"></div>

              {[
                {
                  number: '1',
                  title: 'Connect your LMS',
                  body: 'LearnPulse integrates with your existing learning management system, syncing student engagement data automatically and securely.',
                  color: 'bg-[#2f6df6]',
                },
                {
                  number: '2',
                  title: 'Monitor at a glance',
                  body: 'Your educator dashboard surfaces who is slipping in real time, sorted by risk score, with the most urgent cases always at the top.',
                  color: 'bg-teal-600',
                },
                {
                  number: '3',
                  title: 'Act with precision',
                  body: 'Send targeted nudges to individual students in minutes, or run course and track-level interventions directly from your dashboard.',
                  color: 'bg-green-600',
                },
              ].map((step) => (
                <div key={step.number} className="relative text-center">
                  <div
                    className={`relative z-10 mx-auto h-16 w-16 rounded-full ${step.color} text-white flex items-center justify-center text-lg font-black shadow-xl`}
                  >
                    {step.number}
                  </div>
                  <h3 className="mt-8 text-sm font-black">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="teams" className="bg-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex text-[11px] font-black text-[#c47b00] bg-amber-50 px-3 py-1 rounded-full">
                For Every Role
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-5">
                Built for everyone in the learning chain
              </h2>

              <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-slate-100 p-1.5 shadow-sm">
                <button
                  onClick={() => goToRoleLogin('educator')}
                  className="bg-[#2f6df6] text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30 hover:ring-4 hover:ring-blue-100"
                >
                  Educators
                </button>

                <button
                  onClick={() => goToRoleLogin('student')}
                  className="bg-[#e9f3ff] text-slate-700 text-xs font-black px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#2f6df6] hover:shadow-xl hover:ring-4 hover:ring-blue-100"
                >
                  Students
                </button>

                <button
                  onClick={() => goToRoleLogin('admin')}
                  className="bg-[#e9f3ff] text-slate-700 text-xs font-black px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#2f6df6] hover:shadow-xl hover:ring-4 hover:ring-blue-100"
                >
                  Administrators
                </button>
              </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex text-[10px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-md uppercase">
                  For Educators
                </span>

                <h3 className="text-2xl sm:text-3xl font-black mt-5">
                  Your at-risk list, before it becomes a dropout list.
                </h3>

                <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-xl">
                  Monitor every student&apos;s engagement at a glance. Filter by risk score, view detailed individual profiles, and send personalised nudges all without switching tools.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    'Real-time dashboard with per-student risk scores and engagement trends',
                    'One click nudges to re-engage disengaging learners before they disappear',
                    'Sort students by engagement metric, risk level, or region',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                        ✓
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => goToRoleLogin('educator')}
                  className="mt-8 bg-[#2f6df6] hover:bg-[#245bdd] text-white text-sm font-black px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:ring-4 hover:ring-blue-100"
                >
                  Request Educator Demo →
                </button>
              </div>

              <div className="space-y-4">
                <MetricPanel
                  value="6.67×"
                  label="Average weekly logins active"
                  note="vs 0.58× for dropped-out students"
                  color="text-[#2f6df6]"
                  border="border-[#2f6df6]"
                />

                <MetricPanel
                  value="10.2"
                  label="Assignments completed active avg."
                  note="Dropped students average just 1.7"
                  color="text-[#f59e0b]"
                  border="border-[#f59e0b]"
                />

                <MetricPanel
                  value="7.98"
                  label="Forum posts per active student"
                  note="At-risk students average just 3.26"
                  color="text-green-600"
                  border="border-green-600"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2f5fd7] text-white py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Start protecting your students today.
            </h2>

            <p className="mt-5 text-blue-100 leading-relaxed">
              Join the institutions using LearnPulse to close the gap between insight and intervention. Request a Demo and see the platform in action.
            </p>

            <div className="mt-9 flex flex-col lg:flex-row gap-3 max-w-3xl mx-auto">
              <input
                type="email"
                placeholder="Your work email address"
                className="flex-1 rounded-xl border border-white/20 bg-white text-slate-900 px-5 py-3.5 text-sm font-medium outline-none transition-all hover:shadow-xl hover:shadow-blue-900/20 focus:ring-4 focus:ring-white/20 focus:-translate-y-0.5"
              />

              <button
                onClick={() => {
                  window.location.href =
                    'mailto:support@learnpulse.com?subject=LearnPulse Request a Demo&body=Hello LearnPulse Team,%0D%0A%0D%0AI would like to request a Demo of the LearnPulse platform.%0D%0A%0D%0AThank you.';
                }}
                className="bg-white/15 hover:bg-white/25 text-white font-black text-sm px-7 py-3.5 rounded-xl border border-white/25 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:ring-4 hover:ring-white/20 active:scale-95"
              >
                Send Message
              </button>

              <button
                onClick={() => openRole('login')}
                className="bg-[#02061f] hover:bg-[#050b2d] text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-950/40 hover:ring-4 hover:ring-white/20 active:scale-95"
              >
                Request a Demo
              </button>
            </div>

            <p className="text-xs text-blue-100/70 mt-4">
              No commitment. We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        </section>

        <footer className="bg-[#02061f] text-slate-400 py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <LearnPulseLogo onClick={() => openRole('landing')} />
              <p className="text-sm leading-relaxed mt-5 max-w-xs">
                AI-risk prevention, student engagement, and retention platform, helping educators act before it&apos;s too late.
              </p>
            </div>

            {[
              ['Platform', ['Features', 'How it works', 'For Schools', 'Dashboard', 'Settings']],
              ['Company', ['About', 'Research', 'Contact']],
              ['Legal', ['Privacy Policy', 'Terms of Service', 'Data Policy']],
            ].map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                  {title}
                </h4>
                <div className="space-y-3 text-sm">
                  {links.map((link) => (
                    <button
                      key={link}
                      onClick={() => {
                        if (link === 'Dashboard') openRole('login');
                        if (link === 'Settings') setShowSettings(true);
                      }}
                      className="block hover:text-white"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </footer>

        {showSettings && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Settings</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Manage your LearnPulse preferences and access options.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black transition-all"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="font-black text-slate-800">Account Access</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Use the dashboard login to access educator, student, or administrator tools.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="font-black text-slate-800">Notifications</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Assignment alerts, student messages, grading updates, and risk notices are managed inside the dashboard.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="font-black text-slate-800">Data Privacy</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Student progress data is shown based on user role and dashboard access level.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSettings(false);
                  openRole('login');
                }}
                className="mt-6 w-full bg-[#3f63f2] hover:bg-[#2f55de] text-white font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                Go to Dashboard Settings →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (appRole === 'login') {
    const roleOptions = [
      {
        id: 'educator',
        title: 'Educator',
        subtitle: 'Monitor & support your students',
        icon: '👩‍🏫',
        email: 'ngozi.lawson@university.edu.ng',
        badge: 'Educator Login',
      },
      {
        id: 'student',
        title: 'Student',
        subtitle: 'Track your learning progress',
        icon: '🎓',
        email: selectedStudent.email,
        badge: 'Student Login',
      },
      {
        id: 'admin',
        title: 'Admin',
        subtitle: 'Manage platform & reporting',
        icon: '🏛️',
        email: 'admin01@university.edu.ng',
        badge: 'Admin Login',
      },
    ];

    const selectedRoleData = roleOptions.find((role) => role.id === selectedLoginRole);

    return (
      <div className="min-h-screen bg-[#f5f7fb] grid lg:grid-cols-[46%_54%] font-sans">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#273a86] via-[#3455dd] to-[#3f63f2] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[420px] lg:min-h-screen">
          <div className="absolute top-[-90px] right-[-60px] h-80 w-80 rounded-full bg-white/8"></div>
          <div className="absolute bottom-[-130px] left-[-80px] h-72 w-72 rounded-full bg-white/8"></div>

          <div className="relative z-10">
            <LearnPulseLogo onClick={() => openRole('landing')} />

            <div className="mt-20 lg:mt-32 max-w-md">
              <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                Track engagement. <br />
                Prevent dropout. <br />
                Help students thrive.
              </h1>

              <p className="mt-6 text-blue-100 leading-relaxed">
                LearnPulse gives educators real-time insight into student engagement — so you can reach at-risk learners before they fall behind.
              </p>

              {selectedLoginRole ? (
                <div className="mt-10 bg-white/10 border border-white/15 rounded-2xl p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-100 mb-4">
                    What educators get
                  </p>

                  <div className="space-y-3 text-sm text-blue-50">
                    <p>✓ At-risk student alerts before dropout occurs</p>
                    <p>✓ One-click personalised nudge messaging</p>
                    <p>✓ Unified engagement dashboard for all students</p>
                    <p>✓ Weekly engagement digest reports</p>
                  </div>
                </div>
              ) : (
                <div className="mt-10 space-y-4">
                  <LoginMetric
                    icon="📈"
                    value="34.1%"
                    text="Actively engaged students — maintained with early alerts"
                  />
                  <LoginMetric
                    icon="⚠️"
                    value="1,663 students"
                    text="Currently at risk — identifiable before dropout occurs"
                  />
                  <LoginMetric
                    icon="🔔"
                    value="11 days avg."
                    text="Inactivity threshold before a student is classified at-risk"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f7fb] min-h-screen flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-xl">
            {!selectedLoginRole ? (
              <div>
                <h2 className="text-3xl font-black text-slate-950 text-center">
                  Welcome to LearnPulse
                </h2>

                <p className="text-sm text-slate-500 text-center mt-2">
                  Select your role to continue to your personalised dashboard.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mt-8">
                  {roleOptions.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedLoginRole(role.id)}
                      className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-[#3f63f2] rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-xl hover:ring-4 hover:ring-blue-100"
                    >
                      <div className="text-2xl">{role.icon}</div>
                      <p className="font-black text-slate-900 mt-4">{role.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{role.subtitle}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <InputDisplay label="Email Address" value="✉️ ngozi@university.edu.ng" />
                  <InputDisplay label="Password" value="🔒 ••••••••••" />

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" defaultChecked className="accent-[#3f63f2]" />
                      Keep me signed in
                    </label>

                    <button className="text-[#3f63f2] font-bold">Forgot password?</button>
                  </div>

                  <button
                    onClick={() => setSelectedLoginRole('educator')}
                    className="w-full bg-[#3f63f2] hover:bg-[#2f55de] text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:ring-4 hover:ring-blue-100"
                  >
                    Sign In to Dashboard →
                  </button>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    or sign in with
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  <button className="w-full bg-white border border-slate-200 text-slate-700 font-black py-3.5 rounded-xl hover:shadow-lg transition-all">
                    G&nbsp;&nbsp; Sign in with Google (SSO)
                  </button>

                  <p className="text-sm text-center text-slate-500">
                    Don’t have an account?{' '}
                    <button className="text-[#3f63f2] font-bold underline">
                      Request access from your institution
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <span className="inline-flex bg-blue-50 text-[#3f63f2] px-4 py-2 rounded-full text-xs font-black">
                    {selectedRoleData.badge}
                  </span>

                  <h2 className="text-3xl font-black text-slate-950 mt-5">
                    Sign in to your dashboard
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Access your student engagement insights and at-risk alerts.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <InputDisplay
                    label="Institutional Email"
                    value={`✉️ ${selectedRoleData.email}`}
                    active
                  />

                  <InputDisplay label="Password" value="🔒 ••••••••••" />

                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-4 py-3 text-sm font-bold">
                    ✓ Account verified · {selectedRoleData.title} role confirmed
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" defaultChecked className="accent-[#3f63f2]" />
                      Stay signed in for 30 days
                    </label>

                    <button className="text-[#3f63f2] font-bold">Forgot password?</button>
                  </div>

                  <button
                    onClick={() => openRole(selectedLoginRole)}
                    className="w-full bg-[#3f63f2] hover:bg-[#2f55de] text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:ring-4 hover:ring-blue-100"
                  >
                    Sign In to Dashboard →
                  </button>

                  <button
                    onClick={() => setSelectedLoginRole(null)}
                    className="w-full text-sm text-slate-500 font-bold py-2 hover:text-[#3f63f2]"
                  >
                    ← Back to role selection
                  </button>

                  <div className="pt-5 border-t border-slate-200">
                    <p className="text-xs text-center text-slate-400 leading-relaxed">
                      By signing in you agree to LearnPulse’s{' '}
                      <span className="text-[#3f63f2] underline">Terms of Service</span> and{' '}
                      <span className="text-[#3f63f2] underline">Privacy Policy</span>. <br />
                      Student data is encrypted and FERPA-compliant.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (appRole === 'educator') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans flex flex-col lg:flex-row">
        <DashboardSidebar role="educator" />

        <main className="flex-1 min-w-0">
          <TopBar
            title={
              activeMenu === 'atRisk'
                ? '⚠ At-Risk Students Panel'
                : activeMenu === 'studentProfile'
                ? `Dashboard › Students › ${selectedStudent.name}`
                : activeMenu === 'messages'
                ? `Dashboard › At-Risk › ${selectedStudent.name} › Send Nudge`
                : activeMenu === 'staffMessages'
                ? 'Student Message Notices'
                : activeMenu === 'assignments'
                ? 'Assignments Portal'
                : activeMenu === 'analytics'
                ? 'Global Performance Analytics'
                : activeMenu === 'regionalView'
                ? 'Regional Performance Analytics'
                : activeMenu === 'alertThresholds'
                ? 'Alert Thresholds'
                : activeMenu === 'tutorials'
                ? 'Educator Tutorials'
                : activeMenu === 'students'
                ? 'All Students'
                : 'Good morning, Ngozi 👋'
            }
            subtitle={
              activeMenu === 'atRisk'
                ? 'Students below engagement thresholds · Sorted by urgency score · Requires immediate attention'
                : activeMenu === 'studentProfile'
                ? 'Login, assignments, forum history, and dropout risk overview'
                : activeMenu === 'messages'
                ? `Send a personalised, supportive message to re-engage ${selectedStudent.name}`
                : activeMenu === 'staffMessages'
                ? 'Messages sent by students to the educator dashboard'
                : activeMenu === 'assignments'
                ? 'Create assignments and send alerts directly to selected students'
                : activeMenu === 'analytics'
                ? 'Quick access to global performance, engagement, completion, and risk insights'
                : activeMenu === 'regionalView'
                ? 'Dropout and engagement breakdown across all 10 regions'
                : activeMenu === 'alertThresholds'
                ? 'Configure when at-risk and critical alerts should trigger'
                : activeMenu === 'tutorials'
                ? 'Learn how each section of the educator dashboard works'
                : 'Here’s your student engagement overview'
            }
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentDateWeekLabel={currentDateWeekLabel}
          />

          {activeMenu === 'dashboard' && (
            <EducatorDashboard
              students={students}
              filteredStudents={filteredStudents}
              atRiskRows={atRiskRows}
              activeRate={activeRate}
              atRiskRate={atRiskRate}
              droppedRate={droppedRate}
              activeStudents={activeStudents}
              atRiskStudents={atRiskStudents}
              droppedStudents={droppedStudents}
              scaledCount={scaledCount}
              setActiveMenu={setActiveMenu}
              openStudentProfile={openStudentProfile}
              openNudgeComposer={openNudgeComposer}
              educatorNotifications={educatorNotifications}
            />
          )}

          {activeMenu === 'students' && (
            <div className="p-5 sm:p-8">
              <StudentAttentionList
                rows={filteredStudents}
                openStudentProfile={openStudentProfile}
                openNudgeComposer={openNudgeComposer}
                showAll
              />
            </div>
          )}

          {activeMenu === 'atRisk' && (
            <AtRiskPanel
              rows={atRiskRows}
              openNudgeComposer={openNudgeComposer}
              openStudentProfile={openStudentProfile}
              openBulkNudgeComposer={openBulkNudgeComposer}
            />
          )}

          {activeMenu === 'studentProfile' && (
            <StudentProfile student={selectedStudent} openNudgeComposer={openNudgeComposer} />
          )}

          {activeMenu === 'messages' && (
            <NudgeComposer
              student={selectedStudent}
              students={students}
              nudgeText={nudgeText}
              setNudgeText={setNudgeText}
              sendNudge={sendNudge}
              lastSentNudgePreview={lastSentNudgePreview}
              initialRecipientIds={bulkRecipientIds}
            />
          )}

          {activeMenu === 'staffMessages' && (
            <StaffMessageNoticePage
              notifications={educatorNotifications}
              role="Educator"
            />
          )}

          {activeMenu === 'assignments' && (
            <AssignmentsPortal
              students={students}
              assignmentForm={assignmentForm}
              setAssignmentForm={setAssignmentForm}
              createAssignment={createAssignment}
              educatorNotifications={educatorNotifications}
              gradeStudentAssignment={gradeStudentAssignment}
            />
          )}

          {activeMenu === 'analytics' && (
            <EducatorAnalytics
              students={students}
              activeRate={activeRate}
              atRiskRate={atRiskRate}
              droppedRate={droppedRate}
              activeStudents={activeStudents}
              atRiskStudents={atRiskStudents}
              droppedStudents={droppedStudents}
              scaledCount={scaledCount}
              openStudentProfile={openStudentProfile}
              openNudgeComposer={openNudgeComposer}
            />
          )}

          {activeMenu === 'tutorials' && <EducatorTutorials setActiveMenu={setActiveMenu} />}

          {activeMenu === 'alertThresholds' && (
            <AlertThresholds setActiveMenu={setActiveMenu} />
          )}

          {activeMenu === 'regionalView' && (
            <div className="p-5 sm:p-8">
              <RegionalAnalytics regionAnalytics={regionAnalytics} exportRegionalReport={exportRegionalReport} />
            </div>
          )}
        </main>
      </div>
    );
  }

  if (appRole === 'student') {
    const studentHeader = getStudentHeaderContent(activeMenu);

    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans flex flex-col lg:flex-row">
        <DashboardSidebar role="student" />

        <main className="flex-1 min-w-0">
          <header className="h-auto lg:h-20 bg-white border-b border-slate-200 px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4">
            <div>
              <h1 className="text-xl font-black tracking-tight">{studentHeader.title}</h1>
              <p className="text-sm text-slate-500 mt-1">{studentHeader.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 relative">
                <Bell className="h-5 w-5" />
                {selectedStudent.notifications.filter((item) => !item.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#f59e0b] text-white text-[9px] font-black flex items-center justify-center">
                    {selectedStudent.notifications.filter((item) => !item.read).length}
                  </span>
                )}
              </button>

              <button className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                <Users className="h-5 w-5" />
              </button>
            </div>
          </header>

          {activeMenu === 'myProgress' && (
            <StudentDashboard
              student={selectedStudent}
              completeTask={completeTask}
              markStudentNotificationRead={markStudentNotificationRead}
              setActiveMenu={setActiveMenu}
            />
          )}

          {activeMenu === 'studentAssignments' && (
            <StudentAssignmentsPortal
              student={selectedStudent}
              submitStudentAssignment={submitStudentAssignment}
              completeTask={completeTask}
            />
          )}

          {activeMenu === 'myCourses' && (
            <StudentMyCoursesPage student={selectedStudent} />
          )}

          {activeMenu === 'notifications' && (
            <StudentNotifications student={selectedStudent} />
          )}

          {activeMenu === 'studentMessages' && (
            <StudentMessagesPage
              student={selectedStudent}
              studentMessageForm={studentMessageForm}
              setStudentMessageForm={setStudentMessageForm}
              sendStudentMessage={sendStudentMessage}
            />
          )}

          {activeMenu === 'studentTutorials' && (
            <StudentTutorials setActiveMenu={setActiveMenu} />
          )}
        </main>
      </div>
    );
  }

  if (appRole === 'admin') {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans flex flex-col lg:flex-row">
        <DashboardSidebar role="admin" />

        <main className="flex-1 min-w-0">
          <TopBar
            title={
              activeMenu === 'adminAtRisk'
                ? '⚠ At-Risk Students Panel'
                : activeMenu === 'studentProfile'
                ? `Dashboard › Students › ${selectedStudent.name}`
                : activeMenu === 'messages'
                ? `Dashboard › At-Risk › ${selectedStudent.name} › Send Nudge`
                : activeMenu === 'adminMessages'
                ? 'Student Message Notices'
                : activeMenu === 'platformAnalytics'
                ? 'Global Performance Analytics'
                : activeMenu === 'regionalView'
                ? 'Regional Performance Analytics'
                : activeMenu === 'adminTutorials'
                ? 'Administrator Tutorials'
                : 'Good morning, Fatima 👋'
            }
            subtitle={
              activeMenu === 'adminAtRisk'
                ? 'Students below engagement thresholds · Sorted by urgency score · Requires immediate attention'
                : activeMenu === 'studentProfile'
                ? 'Login, assignments, forum history, and dropout risk overview'
                : activeMenu === 'messages'
                ? `Send a personalised, supportive message to re-engage ${selectedStudent.name}`
                : activeMenu === 'adminMessages'
                ? 'Messages sent by students to the administrator dashboard'
                : activeMenu === 'platformAnalytics'
                ? 'Quick access to global performance, engagement, completion, and risk insights'
                : activeMenu === 'regionalView'
                ? 'Dropout and engagement breakdown across all 10 regions'
                : activeMenu === 'adminTutorials'
                ? 'Learn how each section of the administrator dashboard works'
                : 'Here’s your platform engagement overview'
            }
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentDateWeekLabel={currentDateWeekLabel}
          />

          {activeMenu === 'adminOverview' && (
            <EducatorDashboard
              students={students}
              filteredStudents={filteredStudents}
              atRiskRows={atRiskRows}
              activeRate={activeRate}
              atRiskRate={atRiskRate}
              droppedRate={droppedRate}
              activeStudents={activeStudents}
              atRiskStudents={atRiskStudents}
              droppedStudents={droppedStudents}
              scaledCount={scaledCount}
              setActiveMenu={setActiveMenu}
              openStudentProfile={openStudentProfile}
              openNudgeComposer={openNudgeComposer}
              educatorNotifications={adminNotifications}
              atRiskMenuId="adminAtRisk"
              messageNoticeMenuId="adminMessages"
            />
          )}

          {activeMenu === 'adminAtRisk' && (
            <AtRiskPanel
              rows={atRiskRows}
              openNudgeComposer={openNudgeComposer}
              openStudentProfile={openStudentProfile}
              openBulkNudgeComposer={openBulkNudgeComposer}
            />
          )}

          {activeMenu === 'studentProfile' && (
            <StudentProfile student={selectedStudent} openNudgeComposer={openNudgeComposer} />
          )}

          {activeMenu === 'messages' && (
            <NudgeComposer
              student={selectedStudent}
              students={students}
              nudgeText={nudgeText}
              setNudgeText={setNudgeText}
              sendNudge={sendNudge}
              lastSentNudgePreview={lastSentNudgePreview}
              initialRecipientIds={bulkRecipientIds}
            />
          )}

          {activeMenu === 'adminMessages' && (
            <StaffMessageNoticePage
              notifications={adminNotifications}
              role="Administrator"
            />
          )}

          {activeMenu === 'platformAnalytics' && (
            <EducatorAnalytics
              students={students}
              activeRate={activeRate}
              atRiskRate={atRiskRate}
              droppedRate={droppedRate}
              activeStudents={activeStudents}
              atRiskStudents={atRiskStudents}
              droppedStudents={droppedStudents}
              scaledCount={scaledCount}
              openStudentProfile={openStudentProfile}
              openNudgeComposer={openNudgeComposer}
            />
          )}

          {activeMenu === 'regionalView' && (
            <div className="p-5 sm:p-8">
              <RegionalAnalytics regionAnalytics={regionAnalytics} exportRegionalReport={exportRegionalReport} showFlow />
            </div>
          )}

          {activeMenu === 'adminTutorials' && <AdminTutorials setActiveMenu={setActiveMenu} />}
        </main>
      </div>
    );
  }

  return null;
}

function TopBar({ title, subtitle, searchQuery, setSearchQuery, currentDateWeekLabel }) {
  return (
    <header className="h-auto lg:h-20 bg-white border-b border-slate-200 px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4">
      <div>
        <h1 className="text-xl font-black tracking-tight">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search students..."
            className="w-full sm:w-72 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#3f63f2] focus:bg-white"
          />
        </div>

        <span className="text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          {currentDateWeekLabel}
        </span>

        <button className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function EducatorDashboard({
  students,
  filteredStudents,
  atRiskRows,
  activeRate,
  atRiskRate,
  droppedRate,
  activeStudents,
  atRiskStudents,
  droppedStudents,
  scaledCount,
  setActiveMenu,
  openStudentProfile,
  openNudgeComposer,
  educatorNotifications = [],
  atRiskMenuId = 'atRisk',
  messageNoticeMenuId = 'staffMessages',
}) {
  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-[#fff7d6] border border-[#fde68a] rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10 hover:border-[#f59e0b]">
        <div className="flex gap-3">
          <AlertCircle className="h-6 w-6 text-[#92400e] shrink-0" />
          <div>
            <p className="font-black text-[#92400e]">
              {atRiskRows.length} students are at-risk this week —{' '}
              {students.filter((student) => student.inactiveDays >= 14).length} have been inactive for over 14 days
            </p>
            <p className="text-sm text-[#b45309] mt-1">
              Recommended: Send nudge messages before more students fall to “Dropped” status.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveMenu(atRiskMenuId)}
          className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm font-black px-5 py-3 rounded-xl"
        >
          Review At-Risk Students →
        </button>
      </div>

      {educatorNotifications.filter((item) => !item.read && item.type === 'student-message').length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <div className="flex gap-3">
            <MessageSquare className="h-6 w-6 text-[#3f63f2] shrink-0" />

            <div>
              <p className="font-black text-[#3f63f2]">New student message received</p>
              <p className="text-sm text-slate-600 mt-1">
                {educatorNotifications.find((item) => !item.read && item.type === 'student-message')?.message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveMenu(messageNoticeMenuId)}
            className="bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            View Notice →
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Students" value={SCALE_TOTAL.toLocaleString()} note="Across 10 regions" />
        <StatCard title="Active" value={`${activeRate}%`} note="↑ 2.3% vs last month" color="text-emerald-600" />
        <StatCard title="At-Risk" value={`${atRiskRate}%`} note="↑ needs attention" color="text-[#d88900]" highlight />
        <StatCard title="Dropped" value={`${droppedRate}%`} note="↓ improving" color="text-rose-600" />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-lg">Engagement Trend</h3>
              <p className="text-sm text-slate-500">
                Login frequency by student status · Last 8 weeks
              </p>
            </div>

            <div className="hidden sm:flex gap-3 text-xs font-bold">
              <span className="text-[#3f63f2]">● Active</span>
              <span className="text-[#f59e0b]">● At-Risk</span>
              <span className="text-rose-600">● Dropped</span>
            </div>
          </div>

          <div className="h-72 mt-8 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
            <svg className="absolute inset-0 h-full w-full p-8" preserveAspectRatio="none">
              <path
                d="M 0 180 C 120 130, 200 150, 300 90 S 470 80, 620 45"
                fill="none"
                stroke="#3f63f2"
                strokeWidth="4"
              />
              <path
                d="M 0 210 C 150 180, 250 175, 360 150 S 490 165, 620 145"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="7,7"
              />
              <path
                d="M 0 235 C 150 225, 300 220, 450 210 S 540 215, 620 210"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
                strokeDasharray="5,6"
              />
            </svg>

            <div className="absolute bottom-5 left-8 right-8 flex justify-between text-xs font-bold text-slate-400">
              {['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6', 'Wk7', 'Wk8'].map((week) => (
                <span key={week}>{week}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h3 className="font-black text-lg">Student Status Distribution</h3>
          <p className="text-sm text-slate-500">
            Current cohort breakdown · {SCALE_TOTAL.toLocaleString()} total
          </p>

          <div className="mt-8 grid sm:grid-cols-[190px_1fr] gap-8 items-center">
            <div className="h-44 w-44 mx-auto rounded-full border-[32px] border-emerald-500 border-r-[#f59e0b] border-b-rose-600 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-black">{SCALE_TOTAL.toLocaleString()}</p>
                <p className="text-xs text-slate-500">students</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                ['Active', `${scaledCount(activeStudents.length)} students`, `${activeRate}%`, 'bg-emerald-500'],
                ['At-Risk', `${scaledCount(atRiskStudents.length)} students`, `${atRiskRate}%`, 'bg-[#f59e0b]'],
                ['Dropped', `${scaledCount(droppedStudents.length)} students`, `${droppedRate}%`, 'bg-rose-600'],
              ].map(([label, count, percent, color]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-black mb-1">
                    <span>{label}</span>
                    <span>{percent}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full ${color}`} style={{ width: percent }}></div>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StudentAttentionList
        rows={filteredStudents.slice(0, 5)}
        openStudentProfile={openStudentProfile}
        openNudgeComposer={openNudgeComposer}
        setActiveMenu={setActiveMenu}
      />
    </div>
  );
}



function StudentAttentionList({
  rows,
  openStudentProfile,
  openNudgeComposer,
  setActiveMenu,
  showAll = false,
}) {
  return (
    <div className="grid xl:grid-cols-[1fr_360px] gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-black text-lg">{showAll ? 'Student Roster' : 'Students Requiring Attention'}</h3>
          <div className="flex flex-wrap gap-2 text-xs font-black">
            <button className="bg-[#fff3c4] text-[#92400e] px-3 py-2 rounded-lg">All At-Risk</button>
            <button className="border border-slate-200 px-3 py-2 rounded-lg">Critical</button>
            <button className="border border-slate-200 px-3 py-2 rounded-lg">Monitored</button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map((student) => (
            <div
              key={student.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:z-10 relative ${
                student.status === 'Dropped'
                  ? 'bg-rose-50'
                  : student.status === 'At-Risk'
                  ? 'bg-[#fffbea]'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-black ${
                    student.status === 'Dropped'
                      ? 'bg-rose-100 text-rose-700'
                      : student.status === 'At-Risk'
                      ? 'bg-[#fff3c4] text-[#92400e]'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {student.initials}
                </div>
                <div>
                  <button onClick={() => openStudentProfile(student.id)} className="font-black hover:text-[#3f63f2]">
                    {student.name}
                  </button>
                  <p className="text-sm text-slate-500">
                    Last active: {student.inactiveDays} days ago · {student.overdueTasks} overdue tasks · Forum posts: {student.forumPosts}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    student.status === 'Dropped'
                      ? 'bg-rose-100 text-rose-700'
                      : student.status === 'At-Risk'
                      ? 'bg-[#fff3c4] text-[#92400e]'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {student.status}
                </span>
                <span className="text-sm font-black text-[#d88900]">{student.progress}%</span>
                {student.status !== 'Active' ? (
                  <button onClick={() => openNudgeComposer(student.id)} className="bg-[#fff3c4] text-[#92400e] text-xs font-black px-4 py-2 rounded-lg">
                    ⚡ Nudge
                  </button>
                ) : (
                  <button onClick={() => openStudentProfile(student.id)} className="bg-blue-50 text-[#3f63f2] text-xs font-black px-4 py-2 rounded-lg">
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showAll && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h3 className="font-black text-lg mb-5">Quick Actions</h3>
          <div className="space-y-3">
            {[
              {
                title: 'Send Bulk Nudge',
                subtitle: 'Message all at-risk students at once',
                bg: 'bg-[#fff3c4]',
                target: 'atRisk',
              },
              {
                title: 'Weekly Engagement Report',
                subtitle: 'Download this week’s summary PDF',
                bg: 'bg-blue-50',
                target: 'analytics',
              },
              {
                title: 'Regional Performance',
                subtitle: 'Compare engagement across 10 regions',
                bg: 'bg-emerald-50',
                target: 'regionalView',
              },
              {
                title: 'Set Alert Thresholds',
                subtitle: 'Configure when at-risk alerts trigger',
                bg: 'bg-purple-50',
                target: 'alertThresholds',
              },
            ].map((action) => (
              <button
                key={action.title}
                type="button"
                onClick={() => setActiveMenu?.(action.target)}
                className="group w-full border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3f63f2] hover:shadow-lg hover:bg-blue-50/40 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-xl ${action.bg} flex items-center justify-center transition-all group-hover:scale-110`}>
                    <ArrowUpRight className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-black group-hover:text-[#3f63f2]">{action.title}</p>
                    <p className="text-sm text-slate-500">{action.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-[#3f63f2]" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AtRiskPanel({
  rows,
  openNudgeComposer,
  openStudentProfile,
  openBulkNudgeComposer,
}) {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#8b2418] to-[#dc2626] text-white p-6 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <h2 className="text-2xl font-black">⚠ At-Risk Students Panel</h2>
          <p className="text-sm text-red-100 mt-1">Students below engagement thresholds · Sorted by urgency score · Requires immediate attention</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 min-w-24">
            <p className="text-3xl font-black">{rows.length}</p>
            <p className="text-xs text-red-100">Total At-Risk</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 min-w-24">
            <p className="text-3xl font-black">{rows.filter((item) => item.inactiveDays >= 14).length}</p>
            <p className="text-xs text-red-100">Critical</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 min-w-24">
            <p className="text-3xl font-black">67%</p>
            <p className="text-xs text-red-100">Nudge Response</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-5">
        <div className="bg-[#fff3c4] border border-[#fde68a] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="font-black text-[#92400e]">Critical students selected · Ready for immediate support</p>
          <button
            type="button"
            onClick={() => openBulkNudgeComposer(rows.map((student) => student.id))}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded-lg text-sm font-black transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            + Send Bulk Nudge
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Last Active</th>
                <th className="p-4 text-left">Completion</th>
                <th className="p-4 text-left">Forum Posts</th>
                <th className="p-4 text-left">Risk Score</th>
                <th className="p-4 text-left">Nudge</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((student) => (
                <tr key={student.id} className={`border-t border-slate-100 ${student.status === 'Dropped' ? 'bg-rose-50' : 'bg-[#fffbea]'}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center font-black text-xs">{student.initials}</div>
                      <div>
                        <p className="font-black">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.id} · {student.region}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${student.status === 'Dropped' ? 'bg-rose-100 text-rose-700' : 'bg-[#fff3c4] text-[#92400e]'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-rose-600">{student.inactiveDays} days ago</td>
                  <td className="p-4 font-bold">{student.progress}%</td>
                  <td className="p-4 font-bold">{student.forumPosts}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-600" style={{ width: `${student.riskScore * 100}%` }}></div>
                      </div>
                      <span className="font-black">{student.riskScore}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-slate-500">{student.nudgeStatus}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openNudgeComposer(student.id)} className="bg-[#fff3c4] text-[#92400e] px-3 py-2 rounded-lg text-xs font-black">⚡ Nudge</button>
                      <button onClick={() => openStudentProfile(student.id)} className="bg-blue-50 text-[#3f63f2] px-3 py-2 rounded-lg text-xs font-black">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StudentProfile({ student, openNudgeComposer }) {
  return (
    <div className="p-5 sm:p-8 grid xl:grid-cols-[340px_1fr] gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-[#fff3c4] text-[#92400e] mx-auto flex items-center justify-center text-3xl font-black">
            {student.initials}
          </div>
          <h2 className="text-2xl font-black mt-5">{student.name}</h2>
          <p className="text-sm text-slate-500">ID: {student.id} · {student.region} · Age {student.age}</p>
          <span className={`inline-flex mt-4 px-4 py-2 rounded-full text-sm font-black ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-[#fff3c4] text-[#92400e]'}`}>
            {student.status === 'Active' ? '✓ Active' : '⚠ At-Risk'}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-slate-200 my-7 border-y border-slate-100 py-5 text-center">
          <div>
            <p className="text-2xl font-black text-rose-600">{student.inactiveDays}</p>
            <p className="text-xs text-slate-500">Days inactive</p>
          </div>
          <div>
            <p className="text-2xl font-black text-[#d88900]">{student.progress}%</p>
            <p className="text-xs text-slate-500">Completion</p>
          </div>
          <div>
            <p className="text-2xl font-black text-rose-600">{student.riskScore}</p>
            <p className="text-xs text-slate-500">Risk Score</p>
          </div>
        </div>

        <button onClick={() => openNudgeComposer(student.id)} className="mt-5 w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-black py-3 rounded-xl">
          ⚡ Send Nudge to {student.name.split(' ')[0]}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-black">Recent Activity</h3>
          <div className="mt-5 space-y-5">
            {student.activity.map((activity, index) => (
              <div key={`${activity}-${index}`} className="flex gap-4">
                <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-sm">
                  {index === 0 ? '💬' : index === 2 ? '✅' : '📘'}
                </div>
                <div>
                  <p className="font-black text-sm">{activity}</p>
                  <p className="text-xs text-slate-500">{index + 1} days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <StudentCoursesCard student={student} />
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black">Login Trend</h3>
            <div className="h-56 mt-5 bg-[#fffbea] rounded-xl relative overflow-hidden">
              <svg className="absolute inset-0 h-full w-full p-8" preserveAspectRatio="none">
                <path d="M 0 60 C 80 20, 160 45, 230 70 S 350 160, 460 170" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <path d="M 240 92 C 320 115, 380 135, 460 170" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
              <span className="absolute right-8 top-8 bg-[#fff3c4] text-[#92400e] text-xs font-black px-3 py-2 rounded-lg">↓ Engagement declining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NudgeComposer({
  student,
  students,
  nudgeText,
  setNudgeText,
  sendNudge,
  lastSentNudgePreview,
  initialRecipientIds = [],
}) {
  const [activeTemplate, setActiveTemplate] = useState('checkIn');
  const [selectedRecipientIds, setSelectedRecipientIds] = useState(
    initialRecipientIds.length ? initialRecipientIds : [student.id]
  );
  const [recipientSearch, setRecipientSearch] = useState('');

  const firstName = student.name.split(' ')[0];
  const currentTimeLabel = getCurrentTimeLabel();
  const finalPreviewMessage = nudgeText.trim() || lastSentNudgePreview || 'No message written yet.';

  useEffect(() => {
    setSelectedRecipientIds(initialRecipientIds.length ? initialRecipientIds : [student.id]);
    setRecipientSearch('');
  }, [student.id, initialRecipientIds]);

  const selectedRecipients = students.filter((item) => selectedRecipientIds.includes(item.id));

  const availableRecipients = students.filter((item) => {
    const search = recipientSearch.toLowerCase();
    return (
      !selectedRecipientIds.includes(item.id) &&
      (item.name.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search) ||
        item.region.toLowerCase().includes(search))
    );
  });

  const addRecipient = (studentId) => {
    setSelectedRecipientIds((prev) => (prev.includes(studentId) ? prev : [...prev, studentId]));
    setRecipientSearch('');
  };

  const removeRecipient = (studentId) => {
    setSelectedRecipientIds((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((id) => id !== studentId);
    });
  };

  const messageTemplates = {
    checkIn: {
      title: 'Check-in & Support',
      subtitle: 'Warm, encouraging tone',
      message: `Hi ${firstName} 👋

I noticed you haven’t been active on LearnPulse for the past ${student.inactiveDays} days. I just wanted to check in and see how you’re doing.

You were making good progress, and it would be great to see you continue that momentum. If there’s anything making it hard to stay on track, please let me know.`,
    },
    assignment: {
      title: 'Assignment Reminder',
      subtitle: 'Focus on specific tasks',
      message: `Hi ${firstName} 👋

This is a friendly reminder that you have ${student.overdueTasks} pending task${student.overdueTasks === 1 ? '' : 's'} that need your attention.

Please try to complete the outstanding assignment(s) as soon as you can. Completing them will improve your progress score and help you get back on track.

You can do this. I’m here to support you if you need help.`,
    },
    meeting: {
      title: 'Meeting Invite',
      subtitle: 'Schedule a 1-on-1',
      message: `Hi ${firstName} 👋

I’d like to invite you for a short check-in meeting so we can talk about your progress and any challenges you may be facing.

The goal is simply to understand how best to support you and help you catch up on your learning activities.

Please let me know a convenient time for you.`,
    },
    custom: {
      title: 'Custom Message',
      subtitle: 'Write from scratch',
      message: `Hi ${firstName} 👋

I wanted to reach out and check how things are going with your learning progress.

Please let me know if there is anything you need support with.`,
    },
  };

  const handleTemplateClick = (templateKey) => {
    setActiveTemplate(templateKey);
    setNudgeText(messageTemplates[templateKey].message);
  };

  return (
    <div className="p-5 sm:p-8 grid xl:grid-cols-[1fr_360px] gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black">⚡ Send a Nudge</h2>
          <p className="text-sm text-slate-500 mt-1">Send a personalised, supportive message to re-engage selected student(s).</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-black uppercase text-slate-500">To</label>
            <div className="mt-2 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedRecipients.map((recipient) => (
                  <span
                    key={recipient.id}
                    className={`text-sm font-black px-3 py-2 rounded-lg flex items-center gap-2 ${
                      recipient.status === 'Dropped'
                        ? 'bg-rose-50 text-rose-700'
                        : recipient.status === 'At-Risk'
                        ? 'bg-blue-50 text-[#3f63f2]'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    👤 {recipient.name} [{recipient.status}]
                    <button type="button" onClick={() => removeRecipient(recipient.id)} className="hover:text-rose-600" title="Remove student">
                      ×
                    </button>
                  </span>
                ))}

                <input
                  value={recipientSearch}
                  onChange={(event) => setRecipientSearch(event.target.value)}
                  placeholder="Search and add another student..."
                  className="flex-1 min-w-[220px] px-3 py-2 text-sm outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {recipientSearch && (
                <div className="mt-3 border border-slate-100 rounded-xl bg-white shadow-lg overflow-hidden max-h-56 overflow-y-auto">
                  {availableRecipients.length > 0 ? (
                    availableRecipients.slice(0, 6).map((candidate) => (
                      <button
                        key={candidate.id}
                        type="button"
                        onClick={() => addRecipient(candidate.id)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-black text-slate-900">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.id} · {candidate.region} · {candidate.status}</p>
                        </div>
                        <span className="text-xs font-black text-[#3f63f2]">Add</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-slate-500">No matching student found.</p>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {selectedRecipientIds.length} student{selectedRecipientIds.length === 1 ? '' : 's'} selected.
            </p>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-500">Message Template</label>
            <div className="mt-2 grid sm:grid-cols-2 gap-3">
              {Object.entries(messageTemplates).map(([key, template]) => {
                const isActive = activeTemplate === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTemplateClick(key)}
                    className={`text-left border rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      isActive ? 'border-[#3f63f2] bg-blue-50 ring-4 ring-blue-100' : 'border-slate-200 bg-white hover:border-[#3f63f2]/60 hover:bg-blue-50/40'
                    }`}
                  >
                    <p className="font-black">{template.title}</p>
                    <p className="text-sm text-slate-500 mt-1">{template.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-500">Message</label>
            <textarea
              value={nudgeText}
              onChange={(event) => {
                setNudgeText(event.target.value);
                setActiveTemplate('custom');
              }}
              className="mt-2 w-full h-56 rounded-xl border border-[#3f63f2] bg-white p-4 text-sm leading-relaxed outline-none focus:ring-4 focus:ring-blue-100"
            />
            <p className="text-xs text-slate-400 text-right mt-1">{nudgeText.length} / 550 characters</p>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-500">Send via</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {['In-App Notification', 'Email', 'SMS (if enabled)'].map((channel) => {
                const isActive = channel === 'In-App Notification' || channel === 'Email';
                return (
                  <button
                    key={channel}
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-black border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      isActive ? 'bg-blue-50 border-[#3f63f2] text-[#3f63f2] ring-2 ring-blue-100' : 'bg-white border-slate-200 text-slate-600 hover:border-[#3f63f2]/50'
                    }`}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => sendNudge(selectedRecipientIds)}
            disabled={selectedRecipientIds.length === 0 || !nudgeText.trim()}
            className="bg-[#3f63f2] hover:bg-[#2f55de] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95"
          >
            <Send className="h-4 w-4" />
            Send to {selectedRecipientIds.length} student{selectedRecipientIds.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h3 className="font-black">Notification Preview</h3>
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-[#3f63f2] rounded-lg flex items-center justify-center text-white text-xs font-black">LP</div>
                <p className="text-sm font-black">LearnPulse</p>
                <span className="ml-auto text-xs text-slate-400">{currentTimeLabel}</span>
              </div>
              <p className="font-black mt-3">Your instructor checked in on you 👋</p>
              <p className="text-sm text-slate-600 mt-1 whitespace-pre-line leading-relaxed">“{finalPreviewMessage}”</p>
            </div>
          </div>
        </div>

        <div className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black">{firstName}’s Current Status</h3>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Live data from {firstName}’s student dashboard</p>

          <div className="mt-5 space-y-5 text-sm">
            <div className="flex justify-between items-center">
              <span>Status</span>
              <span className={`px-3 py-1.5 rounded-lg font-black transition-all ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : student.status === 'Dropped' ? 'bg-rose-100 text-rose-700' : 'bg-[#fff3c4] text-[#92400e]'}`}>
                {student.status}
              </span>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Last active</span>
                <span className={`font-black ${student.inactiveDays === 0 ? 'text-emerald-600' : student.inactiveDays >= 14 ? 'text-rose-600' : 'text-[#d88900]'}`}>
                  {student.inactiveDays === 0 ? 'Today' : `${student.inactiveDays} days ago`}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full transition-all duration-700 ${student.inactiveDays === 0 ? 'bg-emerald-500' : student.inactiveDays >= 14 ? 'bg-rose-600' : 'bg-[#f59e0b]'}`} style={{ width: `${Math.max(8, 100 - Math.min(student.inactiveDays * 6, 100))}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Completion rate</span>
                <span className={`font-black ${student.progress >= 70 ? 'text-emerald-600' : student.progress >= 40 ? 'text-[#d88900]' : 'text-rose-600'}`}>{student.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full transition-all duration-700 ${student.progress >= 70 ? 'bg-emerald-500' : student.progress >= 40 ? 'bg-[#f59e0b]' : 'bg-rose-600'}`} style={{ width: `${student.progress}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Dropout score</span>
                <span className={`font-black ${student.riskScore >= 0.7 ? 'text-rose-600' : student.riskScore >= 0.4 ? 'text-[#d88900]' : 'text-emerald-600'}`}>{student.riskScore} / 1.0</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full transition-all duration-700 ${student.riskScore >= 0.7 ? 'bg-rose-600' : student.riskScore >= 0.4 ? 'bg-[#f59e0b]' : 'bg-emerald-500'}`} style={{ width: `${student.riskScore * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-black uppercase text-slate-400">Student page sync</p>
              <p className="text-sm text-slate-600 mt-1">When {firstName} completes a task, this card updates automatically with the new progress, risk score, and status.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({
  student,
  completeTask,
  markStudentNotificationRead,
  setActiveMenu,
}) {
  const latestNotification = student.notifications.find(
    (notification) => !notification.read
  );

  const pendingAssignments = (student.tasks || []).filter(
    (task) => !task.submitted && !task.completed
  );

  const submittedAssignments = (student.tasks || []).filter(
    (task) => task.submitted || task.completed
  );

  const tasksToReachActive = pendingAssignments.length;
  const overdueTasksCount = pendingAssignments.length;

  const currentStreak =
    submittedAssignments.length > 0
      ? Math.min(submittedAssignments.length, 7)
      : 0;

  const bestCourseProgress = student.courses?.length
    ? Math.max(...student.courses.map((course) => course.progress || 0))
    : 0;

  const projectedEngagement = Math.min(
    100,
    student.engagement +
      pendingAssignments.reduce((sum, task) => sum + Number(task.impact || 0), 0)
  );

  const activityDays = ['bg-emerald-100','bg-emerald-100','bg-emerald-400','bg-emerald-600','bg-emerald-100','bg-slate-100','bg-slate-100','bg-emerald-100','bg-emerald-600','bg-slate-100','bg-emerald-100','bg-slate-100','bg-slate-100','bg-slate-100','bg-slate-100','bg-slate-100','bg-rose-100','bg-slate-100','bg-slate-100','bg-slate-100','bg-[#fff3c4]'];

  return (
    <div className="p-5 sm:p-8 space-y-6">
      {latestNotification && (
        <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 w-12 rounded-full bg-[#3f63f2] text-white flex items-center justify-center text-sm font-black shrink-0">NL</div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="font-black">{latestNotification.title}</h2>
                <button
                  type="button"
                  onClick={() => markStudentNotificationRead(latestNotification.id)}
                  className="bg-blue-50 hover:bg-[#3f63f2] text-[#3f63f2] hover:text-white text-xs font-black px-3 py-1 rounded-full transition-all active:scale-95"
                >
                  Mark as read ×
                </button>
              </div>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed">“{latestNotification.message}”</p>
              <p className="text-xs text-slate-400 mt-2">Received {latestNotification.time} · Click “Mark as read” to close</p>
            </div>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-br from-[#0f5132] to-[#164e3b] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/20">
        <div className="grid lg:grid-cols-[130px_1fr_180px] gap-8 items-center">
          <div className="mx-auto lg:mx-0">
            <div className="h-28 w-28 rounded-full border-[12px] border-emerald-300 border-r-emerald-700 flex items-center justify-center bg-white/5">
              <div className="text-center">
                <p className="text-3xl font-black">{student.engagement}%</p>
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-100">Engagement</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{student.status === 'Active' ? 'You are back on track! ✅' : 'You’re at-risk, but you can turn this around! 💪'}</h2>
            <p className="text-emerald-100 mt-3 max-w-2xl leading-relaxed">Your engagement is currently {student.engagement}%. Completing your pending assignments could raise it to about {projectedEngagement}% and help you return to Active status.</p>

            <div className="grid sm:grid-cols-3 gap-3 mt-6 max-w-lg">
              <button
                type="button"
                onClick={() => setActiveMenu?.('studentAssignments')}
                className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <p className="text-2xl font-black">{student.inactiveDays}</p>
                <p className="text-xs text-emerald-100">Days inactive</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenu?.('studentAssignments')}
                className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <p className="text-2xl font-black">{overdueTasksCount}</p>
                <p className="text-xs text-emerald-100">Pending Assignments</p>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenu?.('myCourses')}
                className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <p className="text-2xl font-black">{bestCourseProgress}%</p>
                <p className="text-xs text-emerald-100">Best Course</p>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveMenu?.('studentAssignments')}
            className="bg-white/10 hover:bg-white/20 rounded-2xl p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            <p className="text-sm font-bold text-emerald-100">Goal this week</p>
            <p className="text-4xl font-black mt-2">{tasksToReachActive}</p>
            <p className="text-sm text-emerald-100">{tasksToReachActive === 1 ? 'task' : 'tasks'} to reach Active</p>
            <div className="border-t border-white/15 mt-5 pt-4">
              <p className="text-xs text-amber-200 font-bold">🔥 Current streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
            </div>
            <p className="text-[11px] text-emerald-100/80 mt-3 font-bold">Open Assignment Portal →</p>
          </button>
        </div>
      </section>

      <div className="grid xl:grid-cols-3 gap-6">
        <StudentCoursesCard student={student} />
        <ActivityMonthCard activityDays={activityDays} />
        <CompareCard student={student} setActiveMenu={setActiveMenu} />
      </div>

      <MissingTasks student={student} completeTask={completeTask} />
    </div>
  );
}

function StudentCoursesCard({ student }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-black text-lg">🎓 My Courses</h3>
      <div className="mt-6 space-y-6">
        {student.courses.map((course) => (
          <div key={course.id} className="flex items-center gap-4">
            <div className={`h-14 w-14 rounded-full border-[7px] ${course.progress < 30 ? 'border-rose-500' : course.progress < 60 ? 'border-[#f59e0b]' : 'border-emerald-500'} border-r-slate-100`}></div>
            <div className="flex-1">
              <p className="font-black">{course.name}</p>
              <p className={`text-sm font-black ${course.progress < 30 ? 'text-rose-600' : course.progress < 60 ? 'text-[#d88900]' : 'text-emerald-600'}`}>{course.progress}% complete</p>
              <p className="text-xs text-slate-500">{course.completed} of {course.total} assignments done</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityMonthCard({ activityDays }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-black text-lg">📅 Activity This Month</h3>
      <div className="grid grid-cols-7 gap-3 mt-6">
        {activityDays.map((color, index) => <div key={index} className={`h-8 rounded-md ${color}`}></div>)}
      </div>
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-slate-600">Active days this month</span><span className="font-black text-emerald-600">7 / 18</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Current streak</span><span className="font-black text-rose-600">0 days 🔥</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Best streak this month</span><span className="font-black text-slate-800">4 days</span></div>
      </div>
    </div>
  );
}

function CompareCard({ student, setActiveMenu }) {
  const missingAssignments = (student.tasks || []).filter(
    (task) => !task.submitted && !task.completed
  );

  const missingCount = missingAssignments.length;

  const totalPossibleEngagementGain = missingAssignments.reduce(
    (sum, task) => sum + Number(task.impact || 0),
    0
  );

  const projectedEngagement = Math.min(
    100,
    student.engagement + totalPossibleEngagementGain
  );

  const canCatchUp = projectedEngagement >= 64;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-black text-lg">👥 How You Compare</h3>
      <p className="text-xs text-slate-500 mt-2">Anonymised — you’re not seeing individual student data.</p>
      <div className="mt-6 space-y-5">
        {[
          ['You', `${student.engagement}%`, `${student.engagement}%`, 'bg-[#f59e0b]'],
          ['Class average', '64%', '64%', 'bg-[#3f63f2]'],
          ['Top performers', '88%', '88%', 'bg-emerald-500'],
        ].map(([label, value, width, color]) => (
          <div key={label}>
            <div className="flex justify-between text-sm font-black mb-2"><span>{label}</span><span>{value}</span></div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${color}`} style={{ width }}></div></div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setActiveMenu?.('studentAssignments')}
        className="mt-6 w-full text-left bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-[#3f63f2]/40 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
      >
        <p className="text-sm font-black text-[#3f63f2]">
          💡 {missingCount > 0 ? 'You can do this' : 'You are on track'}
        </p>

        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          {missingCount > 0
            ? `You have ${missingCount} pending assignment${
                missingCount === 1 ? '' : 's'
              }. Completing ${
                missingCount === 1 ? 'it' : 'them'
              } could raise your engagement from ${student.engagement}% to about ${projectedEngagement}%${
                canCatchUp ? ' and help you reach the class average.' : '.'
              }`
            : 'You currently have no missing assignments. Keep maintaining your learning progress.'}
        </p>

        <p className="text-xs font-black text-[#3f63f2] mt-3">
          Open Assignment Portal →
        </p>
      </button>
    </div>
  );
}

function MissingTasks({ student, completeTask }) {
  const missingTasks = (student.tasks || []).filter(
    (task) => !task.submitted && !task.completed
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black">What’s Missing From Your Progress</h3>
          <p className="text-sm text-slate-500">Complete these items to improve your engagement score.</p>
        </div>
        <span className="bg-[#fff3c4] text-[#92400e] text-sm font-black px-4 py-2 rounded-xl">Ready to act?</span>
      </div>

      <div className="divide-y divide-slate-100">
        {missingTasks.length === 0 ? (
          <div className="p-6 text-emerald-700 font-black flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />All tasks are currently completed.</div>
        ) : (
          missingTasks.map((task) => (
            <div key={task.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="font-black">{task.title}</p>
                <p className={`text-sm font-bold mt-1 ${task.completed ? 'text-emerald-600' : 'text-rose-600'}`}>{task.due}</p>
                {task.materialName && task.materialName !== 'No material attached' && (
                  <p className="text-xs text-[#3f63f2] font-black mt-2">📎 Material: {task.materialName}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-emerald-50 text-emerald-600 text-xs font-black px-3 py-2 rounded-lg">+{task.impact}% engagement</span>
                <button
                  onClick={() => {
                    const assignmentTab = document.querySelector('[data-student-assignments-link]');
                    assignmentTab?.click();
                  }}
                  className="text-sm font-black px-5 py-3 rounded-xl bg-[#3f63f2] hover:bg-[#2f55de] text-white transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                >
                  Open Assignment →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EducatorAnalytics({ students, activeRate, atRiskRate, droppedRate, activeStudents, atRiskStudents, droppedStudents, scaledCount, openStudentProfile, openNudgeComposer }) {
  const averageEngagement = Math.round(students.reduce((sum, student) => sum + student.engagement, 0) / students.length);
  const averageCompletion = Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length);
  const averageRisk = (students.reduce((sum, student) => sum + student.riskScore, 0) / students.length).toFixed(2);
  const averageInactiveDays = Math.round(students.reduce((sum, student) => sum + student.inactiveDays, 0) / students.length);
  const topPerformers = students.slice().sort((a, b) => b.engagement - a.engagement).slice(0, 3);
  const priorityStudents = students.slice().sort((a, b) => b.riskScore - a.riskScore).slice(0, 4);

  const courseSummary = ['Data Analytics', 'Python for Data Science', 'Statistics & Probability'].map((courseName) => ({
    course: courseName,
    completion: Math.round(students.reduce((sum, student) => {
      const course = student.courses.find((item) => item.name === courseName);
      return sum + (course?.progress || 0);
    }, 0) / students.length),
  }));

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Avg. Engagement" value={`${averageEngagement}%`} note="Overall learner activity" color={averageEngagement >= 70 ? 'text-emerald-600' : averageEngagement >= 45 ? 'text-[#d88900]' : 'text-rose-600'} />
        <StatCard title="Avg. Completion" value={`${averageCompletion}%`} note="Across all active courses" color={averageCompletion >= 70 ? 'text-emerald-600' : averageCompletion >= 45 ? 'text-[#d88900]' : 'text-rose-600'} />
        <StatCard title="Avg. Risk Score" value={averageRisk} note="Lower is better" color={Number(averageRisk) >= 0.7 ? 'text-rose-600' : Number(averageRisk) >= 0.4 ? 'text-[#d88900]' : 'text-emerald-600'} highlight />
        <StatCard title="Avg. Inactive Days" value={averageInactiveDays} note="Since last login" color={averageInactiveDays >= 14 ? 'text-rose-600' : averageInactiveDays >= 7 ? 'text-[#d88900]' : 'text-emerald-600'} />
      </div>

      <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">📊 Global Engagement Overview</h2>
              <p className="text-sm text-slate-500 mt-1">Real-time summary of all students under the educator.</p>
            </div>
            <span className="bg-blue-50 text-[#3f63f2] text-xs font-black px-3 py-2 rounded-xl">{SCALE_TOTAL.toLocaleString()} learners</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-[230px_1fr] gap-8 items-center">
            <div className="h-56 w-56 mx-auto rounded-full border-[36px] border-emerald-500 border-r-[#f59e0b] border-b-rose-600 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-black">{averageEngagement}%</p>
                <p className="text-xs text-slate-500 font-bold">Avg. engagement</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                ['✅ Active students', `${scaledCount(activeStudents.length).toLocaleString()} students`, `${activeRate}%`, 'bg-emerald-500', 'text-emerald-600'],
                ['⚠️ At-risk students', `${scaledCount(atRiskStudents.length).toLocaleString()} students`, `${atRiskRate}%`, 'bg-[#f59e0b]', 'text-[#d88900]'],
                ['🔻 Dropped students', `${scaledCount(droppedStudents.length).toLocaleString()} students`, `${droppedRate}%`, 'bg-rose-600', 'text-rose-600'],
              ].map(([label, count, percent, color, textColor]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-black mb-2"><span>{label}</span><span className={textColor}>{percent}</span></div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${color}`} style={{ width: percent }}></div></div>
                  <p className="text-xs text-slate-500 mt-1">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h2 className="text-xl font-black">⚡ Quick Insights</h2>
          <p className="text-sm text-slate-500 mt-1">Fast signals for educator action.</p>
          <div className="mt-6 space-y-4">
            <div className="bg-[#fff7d6] border border-[#fde68a] rounded-2xl p-4">
              <p className="text-sm font-black text-[#92400e]">Most urgent action</p>
              <p className="text-sm text-[#b45309] mt-1">{priorityStudents[0]?.name} has the highest risk score at <span className="font-black">{priorityStudents[0]?.riskScore}</span>.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm font-black text-[#3f63f2]">Engagement gap</p>
              <p className="text-sm text-slate-600 mt-1">Active students are averaging higher course completion than at-risk students.</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-sm font-black text-emerald-700">Best opportunity</p>
              <p className="text-sm text-emerald-700 mt-1">Students between 50% and 65% completion can still be moved back to Active quickly.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h2 className="text-xl font-black">📚 Course Completion Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Average completion across courses.</p>
          <div className="mt-7 space-y-6">
            {courseSummary.map((course) => (
              <div key={course.course}>
                <div className="flex justify-between text-sm font-black mb-2"><span>{course.course}</span><span className={course.completion >= 70 ? 'text-emerald-600' : course.completion >= 40 ? 'text-[#d88900]' : 'text-rose-600'}>{course.completion}%</span></div>
                <div className="h-4 rounded-full bg-slate-100 overflow-hidden"><div className={course.completion >= 70 ? 'h-full bg-emerald-500' : course.completion >= 40 ? 'h-full bg-[#f59e0b]' : 'h-full bg-rose-600'} style={{ width: `${course.completion}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
          <h2 className="text-xl font-black">🎯 Risk Distribution</h2>
          <p className="text-sm text-slate-500 mt-1">Students grouped by dropout risk level.</p>
          <div className="mt-7 space-y-5">
            {[
              ['🟢 Low risk', students.filter((student) => student.riskScore < 0.4).length, 'bg-emerald-500', 'bg-emerald-50', 'text-emerald-700'],
              ['🟡 Medium risk', students.filter((student) => student.riskScore >= 0.4 && student.riskScore < 0.7).length, 'bg-[#f59e0b]', 'bg-[#fff7d6]', 'text-[#92400e]'],
              ['🔴 High risk', students.filter((student) => student.riskScore >= 0.7).length, 'bg-rose-600', 'bg-rose-50', 'text-rose-700'],
            ].map(([label, count, color, bg, textColor]) => {
              const percent = Math.round((count / students.length) * 100);
              return (
                <div key={label} className={`${bg} rounded-2xl p-4`}>
                  <div className="flex items-center justify-between mb-2"><p className={`font-black ${textColor}`}>{label}</p><p className={`font-black ${textColor}`}>{count} students</p></div>
                  <div className="h-3 rounded-full bg-white/70 overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div></div>
                  <p className="text-xs text-slate-500 mt-2">{percent}% of visible dataset</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <MiniStudentList title="🚨 Priority Students" subtitle="Students requiring quick intervention." rows={priorityStudents} action="Nudge" openStudentProfile={openStudentProfile} openNudgeComposer={openNudgeComposer} />
        <MiniStudentList title="🌟 Top Performers" subtitle="Students with strongest engagement." rows={topPerformers} action="Active" openStudentProfile={openStudentProfile} openNudgeComposer={openNudgeComposer} />
      </div>
    </div>
  );
}

function MiniStudentList({ title, subtitle, rows, action, openStudentProfile, openNudgeComposer }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      <div className="mt-5 divide-y divide-slate-100">
        {rows.map((student) => (
          <div key={student.id} className="py-4 flex items-center justify-between gap-3">
            <div>
              <button onClick={() => openStudentProfile(student.id)} className="font-black hover:text-[#3f63f2]">{student.name}</button>
              <p className="text-sm text-slate-500">Engagement {student.engagement}% · Risk {student.riskScore}</p>
            </div>
            {action === 'Nudge' ? (
              <button onClick={() => openNudgeComposer(student.id)} className="bg-[#fff3c4] text-[#92400e] text-xs font-black px-4 py-2 rounded-lg hover:bg-[#f59e0b] hover:text-white transition-all">Nudge</button>
            ) : (
              <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-4 py-2 rounded-lg">Active</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducatorTutorials({ setActiveMenu }) {
  const tutorialCards = [
    ['Dashboard Overview', '🏠', 'dashboard', 'The dashboard gives a quick summary of total students, active learners, at-risk learners, dropped students, trends, and students needing attention.'],
    ['Students Page', '👥', 'students', 'The students page shows the full student roster connected to live student records.'],
    ['At-Risk Panel', '⚠️', 'atRisk', 'The at-risk panel helps you prioritise students who need immediate support.'],
    ['Messages and Nudges', '💬', 'messages', 'The message page allows you to send supportive nudges through in-app notification and email.'],
    ['Assignments', '📝', 'assignments', 'The Assignments page allows educators to create assignments, attach learning materials, alert students, review submitted work, enter grades, and send feedback back to students.'],
    ['Analytics Page', '📊', 'analytics', 'Analytics gives you a global performance overview of all students under the educator.'],
    ['Regional View', '🗺️', 'regionalView', 'Regional View shows engagement and dropout patterns across all regions.'],
  ];

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#10203a] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <h2 className="text-3xl sm:text-4xl font-black">Learn how to use the educator dashboard</h2>
        <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">This tutorial explains how each section works, how the pages connect, and how educators can move from early warning signals to timely student support.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {['Check dashboard alerts', 'Open at-risk students', 'Send a nudge', 'Create and grade assignments', 'Monitor updates'].map((item, index) => (
          <div key={item} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center font-black">{index + 1}</div>
            <h3 className="font-black mt-4">{item}</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {item === 'Create and grade assignments'
                ? 'Use the Assignments page to upload tasks, attach materials, alert students, review submissions, and provide grades with feedback.'
                : 'Follow this step to keep students engaged and supported.'}
            </p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {tutorialCards.map(([title, icon, menu, description]) => (
          <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl border bg-blue-50 text-[#3f63f2] border-blue-100 flex items-center justify-center text-2xl">{icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
              </div>
            </div>
            <button onClick={() => setActiveMenu(menu)} className="mt-6 bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95">
              Open {title} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function AdminTutorials({ setActiveMenu }) {
  const tutorialCards = [
    ['Overview', '🏠', 'adminOverview', 'The Overview page gives administrators a platform-wide view of total students, active learners, at-risk learners, dropped students, trends, and students needing attention.'],
    ['At-Risk Panel', '⚠️', 'adminAtRisk', 'The At-Risk page helps administrators monitor learners who require urgent follow-up across the full platform.'],
    ['Messages', '💬', 'adminMessages', 'The Messages page shows student messages sent to the administrator dashboard for support or administrative action.'],
    ['Analytics', '📊', 'platformAnalytics', 'Analytics gives administrators a global performance overview of engagement, completion, dropout risk, and priority learners.'],
    ['Regional View', '🗺️', 'regionalView', 'Regional View shows engagement and dropout patterns across all regions, with exportable report insights.'],
  ];

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#10203a] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <h2 className="text-3xl sm:text-4xl font-black">Learn how to use the administrator dashboard</h2>
        <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
          This tutorial explains how each administrator section works, how the pages connect, and how administrators can move from platform-level warning signals to timely support and reporting.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {['Check overview alerts', 'Open at-risk students', 'Review messages', 'Analyse performance', 'Export regional reports'].map((item, index) => (
          <div key={item} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center font-black">{index + 1}</div>
            <h3 className="font-black mt-4">{item}</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Follow this step to monitor the full platform and support students quickly.</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {tutorialCards.map(([title, icon, menu, description]) => (
          <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl border bg-blue-50 text-[#3f63f2] border-blue-100 flex items-center justify-center text-2xl">{icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
              </div>
            </div>
            <button onClick={() => setActiveMenu(menu)} className="mt-6 bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95">
              Open {title} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function AssignmentsPortal({
  students,
  assignmentForm,
  setAssignmentForm,
  createAssignment,
  educatorNotifications = [],
  gradeStudentAssignment,
}) {
  const assignedCount =
    assignmentForm.assignedTo === 'all'
      ? students.length
      : students.filter((student) => student.status === assignmentForm.assignedTo).length;

  const recentTasks = students
    .flatMap((student) =>
      (student.tasks || []).map((task) => ({
        ...task,
        studentName: student.name,
        studentStatus: student.status,
      }))
    )
    .slice(0, 6);

  const submittedAssignments = students
    .flatMap((student) =>
      (student.tasks || [])
        .filter((task) => task.submitted)
        .map((task) => ({
          ...task,
          studentId: student.id,
          studentName: student.name,
          studentInitials: student.initials,
          studentStatus: student.status,
        }))
    )
    .sort((a, b) => {
      if ((a.grade || 'Pending') === 'Pending' && (b.grade || 'Pending') !== 'Pending') return -1;
      if ((a.grade || 'Pending') !== 'Pending' && (b.grade || 'Pending') === 'Pending') return 1;
      return 0;
    });

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#10203a] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 text-blue-100 text-xs font-black px-3 py-1.5 rounded-full">
              Educator Assignment Portal
            </span>

            <h2 className="text-3xl sm:text-4xl font-black mt-5">
              Create assignments for students
            </h2>

            <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
              Assign new learning tasks to all students or targeted groups. Once created, the assignment appears under each student’s “What’s Missing From Your Progress” section, and students receive an alert automatically.
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <p className="text-sm font-black text-blue-100 uppercase tracking-wider">
              Assignment will reach
            </p>
            <p className="text-5xl font-black mt-4">{assignedCount}</p>
            <p className="text-sm text-blue-100 mt-1">selected students</p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_380px] gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#3f63f2]/40">
          <h3 className="text-2xl font-black">Upload / Create Assignment</h3>
          <p className="text-sm text-slate-500 mt-2">
            Fill in the assignment details. Students will receive a notification immediately after publishing.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label className="text-xs font-black uppercase text-slate-500">Assignment Title</label>
              <input
                value={assignmentForm.title}
                onChange={(event) => setAssignmentForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="e.g. Module 5 Assignment — Data Visualisation"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-slate-500">Upload Learning Material</label>

              <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-blue-50/40 hover:border-[#3f63f2]/50 transition-all">
                <input
                  id="assignment-material-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.mp4,.zip"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setAssignmentForm((prev) => ({ ...prev, materialName: file ? file.name : '' }));
                  }}
                  className="hidden"
                />

                <label
                  htmlFor="assignment-material-upload"
                  className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-black text-slate-900">
                      {assignmentForm.materialName || 'Click to upload assignment material'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Supported: PDF, Word, PowerPoint, Excel, images, videos, or ZIP files.
                    </p>
                  </div>

                  <span className="bg-[#3f63f2] text-white text-sm font-black px-5 py-3 rounded-xl shadow-lg hover:bg-[#2f55de] transition-all">
                    Choose File
                  </span>
                </label>
              </div>

              {assignmentForm.materialName && (
                <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-emerald-700">Attached: {assignmentForm.materialName}</p>
                  <button
                    type="button"
                    onClick={() => setAssignmentForm((prev) => ({ ...prev, materialName: '' }))}
                    className="text-xs font-black text-rose-600 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-slate-500">Course</label>
                <select
                  value={assignmentForm.course}
                  onChange={(event) => setAssignmentForm((prev) => ({ ...prev, course: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                >
                  <option>Data Analytics</option>
                  <option>Python for Data Science</option>
                  <option>Statistics & Probability</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500">Due Date</label>
                <input
                  type="date"
                  value={assignmentForm.due}
                  onChange={(event) => setAssignmentForm((prev) => ({ ...prev, due: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase text-slate-500">Assign To</label>
                <select
                  value={assignmentForm.assignedTo}
                  onChange={(event) => setAssignmentForm((prev) => ({ ...prev, assignedTo: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                >
                  <option value="all">All Students</option>
                  <option value="Active">Active Students</option>
                  <option value="At-Risk">At-Risk Students</option>
                  <option value="Dropped">Dropped Students</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500">Engagement Impact</label>
                <select
                  value={assignmentForm.impact}
                  onChange={(event) => setAssignmentForm((prev) => ({ ...prev, impact: Number(event.target.value) }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                >
                  <option value={4}>+4% engagement</option>
                  <option value={5}>+5% engagement</option>
                  <option value={6}>+6% engagement</option>
                  <option value={8}>+8% engagement</option>
                  <option value={10}>+10% engagement</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="font-black text-[#3f63f2]">Student connection preview</p>
              <p className="text-sm text-slate-600 mt-2">
                Once published, this assignment will appear under the student page section titled “What’s Missing From Your Progress”. Each selected student will also receive a notification alert.
              </p>
            </div>

            <button
              onClick={createAssignment}
              disabled={!assignmentForm.title.trim()}
              className="bg-[#3f63f2] hover:bg-[#2f55de] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              Publish Assignment & Alert Students →
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-black">How it connects</h3>
            <div className="mt-5 space-y-4">
              {[
                ['1', 'Educator creates assignment'],
                ['2', 'Task is added to selected students'],
                ['3', 'Student receives alert notification'],
                ['4', 'Task appears in missing progress list'],
                ['5', 'Completion improves engagement score'],
              ].map(([step, label]) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center text-xs font-black">{step}</span>
                  <span className="text-sm font-bold text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-black">Recent Student Tasks</h3>
            <div className="mt-5 divide-y divide-slate-100">
              {recentTasks.map((task) => (
                <div key={`${task.id}-${task.studentName}`} className="py-3">
                  <p className="text-sm font-black">{task.title}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {task.studentName} · {task.studentStatus} · +{task.impact}% engagement
                  </p>
                  {task.materialName && task.materialName !== 'No material attached' && (
                    <p className="text-xs text-[#3f63f2] font-black mt-1">📎 {task.materialName}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black">Submitted Assignments for Grading</h3>
            <p className="text-sm text-slate-500 mt-1">
              Review student submissions, enter grades, and send feedback.
            </p>
          </div>

          <span className="bg-amber-50 text-[#92400e] text-sm font-black px-4 py-2 rounded-xl">
            {submittedAssignments.filter((task) => (task.grade || 'Pending') === 'Pending').length} pending review
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {submittedAssignments.length === 0 ? (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
              <p className="font-black text-slate-700">No submissions yet</p>
              <p className="text-sm text-slate-500 mt-1">
                Student submissions will appear here once uploaded.
              </p>
            </div>
          ) : (
            submittedAssignments.map((task) => (
              <GradeAssignmentCard
                key={`${task.studentId}-${task.id}`}
                task={task}
                gradeStudentAssignment={gradeStudentAssignment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AlertThresholds({ setActiveMenu }) {
  const thresholds = [
    {
      title: 'At-Risk Trigger',
      value: '7 days inactive',
      description: 'A student is flagged as at-risk when inactivity reaches 7 days.',
      color: 'text-[#d88900]',
      bg: 'bg-[#fff7d6]',
    },
    {
      title: 'Critical Trigger',
      value: '14 days inactive',
      description: 'A student is marked critical when inactivity reaches 14 days or more.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      title: 'Completion Alert',
      value: 'Below 45%',
      description: 'Students below 45% completion are prioritised for educator review.',
      color: 'text-[#3f63f2]',
      bg: 'bg-blue-50',
    },
    {
      title: 'Recovery Target',
      value: '65% engagement',
      description: 'Students return to Active status when engagement improves to 65% or above.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex bg-purple-50 text-purple-700 text-xs font-black px-3 py-1.5 rounded-full">Alert Configuration</span>
            <h2 className="text-3xl font-black mt-4">Set Alert Thresholds</h2>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Use this section to review the rules that determine when students are marked as At-Risk, Critical, or Active again.
            </p>
          </div>

          <button
            onClick={() => setActiveMenu('dashboard')}
            className="bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {thresholds.map((item) => (
          <div
            key={item.title}
            className={`${item.bg} border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#3f63f2]/40`}
          >
            <p className="text-xs uppercase font-black text-slate-500">{item.title}</p>
            <p className={`text-3xl font-black mt-5 ${item.color}`}>{item.value}</p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-black">How threshold actions connect</h3>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {[
            ['1', 'Student activity drops', 'Login, assignment, and forum data are monitored.'],
            ['2', 'Risk status updates', 'The system updates student status based on the thresholds.'],
            ['3', 'Educator is alerted', 'At-risk and critical students appear in the dashboard and at-risk panel.'],
            ['4', 'Nudge is sent', 'Educators can send messages to support re-engagement.'],
          ].map(([step, title, body]) => (
            <div key={step} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <div className="h-9 w-9 rounded-full bg-[#3f63f2] text-white flex items-center justify-center text-sm font-black">{step}</div>
              <h4 className="font-black mt-4">{title}</h4>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function RegionDetailDropdown({ selectedRegionDetail, setSelectedRegionDetail }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-[fadeIn_0.25s_ease-out] transition-all duration-300 hover:shadow-xl hover:border-[#3f63f2]/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black">📍 {selectedRegionDetail.region} Detail</h3>
          <p className="text-sm text-slate-500 mt-1">Live regional performance breakdown from current platform data.</p>
        </div>
        <button onClick={() => setSelectedRegionDetail(null)} className="text-xs font-black text-slate-500 hover:text-rose-600">Close</button>
      </div>

      <div className="mt-5 space-y-5">
        {[
          { label: 'Active', value: selectedRegionDetail.active, color: 'bg-emerald-500', text: 'text-emerald-600', icon: '✅' },
          { label: 'At-Risk', value: selectedRegionDetail.atRisk, color: 'bg-[#f59e0b]', text: 'text-[#d88900]', icon: '⚠️' },
          { label: 'Dropped', value: selectedRegionDetail.dropped, color: 'bg-rose-600', text: 'text-rose-600', icon: '🔻' },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm font-black mb-2"><span>{item.icon} {item.label}</span><span className={item.text}>{item.value}%</span></div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${item.color} transition-all duration-700`} style={{ width: `${item.value}%` }}></div></div>
          </div>
        ))}
      </div>

      <div className={`mt-6 rounded-2xl p-4 ${selectedRegionDetail.dropped >= 35 ? 'bg-rose-50 border border-rose-100' : selectedRegionDetail.active >= 40 ? 'bg-emerald-50 border border-emerald-100' : 'bg-[#fff7d6] border border-[#fde68a]'}`}>
        <p className={`text-sm font-black ${selectedRegionDetail.dropped >= 35 ? 'text-rose-700' : selectedRegionDetail.active >= 40 ? 'text-emerald-700' : 'text-[#92400e]'}`}>
          {selectedRegionDetail.dropped >= 35 ? 'Immediate review recommended' : selectedRegionDetail.active >= 40 ? 'Strong performance region' : 'Needs close monitoring'}
        </p>
        <p className="text-sm text-slate-600 mt-1">This detail card updates from the same regional analytics data used in the chart and region ranking.</p>
      </div>
    </div>
  );
}

function RegionalAnalytics({ regionAnalytics, exportRegionalReport, showFlow = false }) {
  const [regionFilter, setRegionFilter] = useState('dropped');
  const [selectedRegionDetail, setSelectedRegionDetail] = useState(null);
  const sortedRegionAnalytics = regionAnalytics.slice().sort((a, b) => b[regionFilter] - a[regionFilter]);
  const filterLabels = { active: 'Active', atRisk: 'At-Risk', dropped: 'Dropped' };
  const region04 = regionAnalytics.find((item) => item.region === 'Region 04');
  const region07 = regionAnalytics.find((item) => item.region === 'Region 07');

  return (
    <div className="grid xl:grid-cols-[1fr_370px] gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black">Engagement Breakdown by Region</h2>
            <p className="text-sm text-slate-500">Stacked: Active · At-Risk · Dropped · Sorted by {filterLabels[regionFilter]} rate</p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm font-black">
            <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-lg outline-none hover:border-[#3f63f2] focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100 transition-all">
              <option value="active">Search by Filter: Active</option>
              <option value="atRisk">Search by Filter: At-Risk</option>
              <option value="dropped">Search by Filter: Dropped</option>
            </select>
            <button onClick={exportRegionalReport} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95">Export CSV</button>
          </div>
        </div>

        <div className="mt-7 flex gap-5 text-sm font-bold">
          <span className="text-emerald-600">■ Active</span>
          <span className="text-[#f59e0b]">■ At-Risk</span>
          <span className="text-rose-600">■ Dropped</span>
        </div>

        <div className="mt-6 space-y-4">
          {sortedRegionAnalytics.map((item) => (
            <div key={item.region} className="grid grid-cols-[90px_1fr_60px] gap-4 items-center">
              <p className="text-sm font-black text-slate-700">{item.region}</p>
              <div className="h-7 rounded-lg bg-slate-100 overflow-hidden flex">
                <div className="bg-emerald-500" style={{ width: `${item.active}%` }}></div>
                <div className="bg-[#f59e0b]" style={{ width: `${item.atRisk}%` }}></div>
                <div className="bg-rose-600" style={{ width: `${item.dropped}%` }}></div>
              </div>
              <p className={`text-sm font-black ${item[regionFilter] >= 35 ? 'text-rose-600' : item[regionFilter] <= 24 ? 'text-emerald-600' : 'text-slate-600'}`}>{item[regionFilter]}%</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h3 className="font-black">📊 Region 04 vs Region 07 — Trend Comparison</h3>
          <div className="h-40 mt-4 relative overflow-hidden">
            <svg className="absolute inset-0 h-full w-full p-4" preserveAspectRatio="none">
              <path d="M 0 80 C 120 85, 240 88, 380 70 S 520 48, 680 40" fill="none" stroke="#10b981" strokeWidth="4" />
              <path d="M 0 50 C 140 60, 250 70, 360 75 S 540 85, 680 96" fill="none" stroke="#dc2626" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="bg-[#8b2418] text-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="font-black">⚠ Alert — Region 04</h3>
            <p className="text-3xl font-black mt-4">High dropout risk</p>
            <p className="text-sm text-red-100 mt-2">Highest dropout trend in the platform. Requires immediate institutional review.</p>
            <button onClick={() => setSelectedRegionDetail(selectedRegionDetail?.region === 'Region 04' ? null : region04)} className="mt-5 bg-white/15 hover:bg-white/25 text-white px-4 py-3 rounded-xl text-sm font-black transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95">
              {selectedRegionDetail?.region === 'Region 04' ? 'Hide Region 04 Detail ↑' : 'View Region 04 Detail →'}
            </button>
          </div>
          {selectedRegionDetail?.region === 'Region 04' && <RegionDetailDropdown selectedRegionDetail={selectedRegionDetail} setSelectedRegionDetail={setSelectedRegionDetail} />}
        </div>

        <div className="space-y-3">
          <div className="bg-[#14532d] text-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="font-black">🌟 Top Performer — Region 07</h3>
            <p className="text-3xl font-black mt-4">Most stable region</p>
            <p className="text-sm text-emerald-100 mt-2">Strong active rate and lower dropout trend. Worth studying their approach.</p>
            <button onClick={() => setSelectedRegionDetail(selectedRegionDetail?.region === 'Region 07' ? null : region07)} className="mt-5 bg-white/15 hover:bg-white/25 text-white px-4 py-3 rounded-xl text-sm font-black transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95">
              {selectedRegionDetail?.region === 'Region 07' ? 'Hide Region 07 Detail ↑' : 'View Region 07 Detail →'}
            </button>
          </div>
          {selectedRegionDetail?.region === 'Region 07' && <RegionDetailDropdown selectedRegionDetail={selectedRegionDetail} setSelectedRegionDetail={setSelectedRegionDetail} />}
        </div>

        {showFlow && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black">Flow 4 — Admin Report Task</h3>
            <div className="mt-4 space-y-3 text-sm">
              {['Admin overview loads','Navigate to Regional View','Select date range filter','Select region(s) to compare','View comparison chart','Click “Export Report”','Choose PDF / CSV','Report generated and downloaded'].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="h-7 w-7 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center text-xs font-black">{index + 1}</span>
                  <span className="font-bold text-slate-700">{step}</span>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full bg-emerald-600 text-white font-black py-3 rounded-xl">Done ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentAssignmentsPortal({
  student,
  submitStudentAssignment,
  completeTask,
}) {
  const [selectedFileByTask, setSelectedFileByTask] = useState({});
  const assignments = student.tasks || [];
  const pendingAssignments = assignments.filter((task) => !task.submitted && !task.completed);
  const submittedAssignments = assignments.filter((task) => task.submitted || task.completed);
  const gradedAssignments = assignments.filter((task) => task.grade && task.grade !== 'Pending');

  const handleFileSelect = (taskId, file) => {
    setSelectedFileByTask((prev) => ({
      ...prev,
      [taskId]: file?.name || '',
    }));
  };

  const handleSubmit = (taskId) => {
    const fileName = selectedFileByTask[taskId];
    if (!fileName) return;
    submitStudentAssignment(taskId, fileName);
  };

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#0f5132] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 text-blue-100 text-xs font-black px-3 py-1.5 rounded-full">
              Student Assignment Portal
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-5">
              View, complete, and submit assignments
            </h2>
            <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
              Assignments published by your educator appear here. Review attached materials, upload your completed work, submit it, and track your grade after review.
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <p className="text-sm font-black text-blue-100 uppercase tracking-wider">
              Assignment summary
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-3xl font-black">{pendingAssignments.length}</p>
                <p className="text-xs text-blue-100">Pending</p>
              </div>
              <div>
                <p className="text-3xl font-black">{submittedAssignments.length}</p>
                <p className="text-xs text-blue-100">Submitted</p>
              </div>
              <div>
                <p className="text-3xl font-black">{gradedAssignments.length}</p>
                <p className="text-xs text-blue-100">Graded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-2xl font-black">Published Assignments</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Complete and submit assignments uploaded by your educator.
                </p>
              </div>
              <span className="bg-blue-50 text-[#3f63f2] text-sm font-black px-4 py-2 rounded-xl">
                {assignments.length} total
              </span>
            </div>

            {assignments.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-lg font-black text-slate-700">No assignments yet</p>
                <p className="text-sm text-slate-500 mt-2">
                  New assignments published by your educator will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {assignments.map((task) => {
                  const fileName = selectedFileByTask[task.id] || '';
                  const isSubmitted = task.submitted || task.completed;

                  return (
                    <div
                      key={task.id}
                      className={`p-5 transition-all hover:bg-blue-50/30 ${
                        isSubmitted ? 'bg-emerald-50/40' : 'bg-white'
                      }`}
                    >
                      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-5">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg font-black">{task.title}</h4>
                            <span
                              className={`text-xs font-black px-3 py-1 rounded-full ${
                                isSubmitted
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-[#fff3c4] text-[#92400e]'
                              }`}
                            >
                              {isSubmitted ? 'Submitted' : 'Pending'}
                            </span>
                          </div>

                          <p
                            className={`text-sm font-bold mt-2 ${
                              isSubmitted ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {task.due || 'New assignment added'}
                          </p>

                          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                              <p className="text-xs font-black uppercase text-slate-400">Course</p>
                              <p className="font-bold text-slate-700 mt-1">
                                {task.course || 'General Course'}
                              </p>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                              <p className="text-xs font-black uppercase text-emerald-600">
                                Engagement Impact
                              </p>
                              <p className="font-black text-emerald-700 mt-1">
                                +{task.impact}% engagement
                              </p>
                            </div>
                          </div>

                          {task.materialName && task.materialName !== 'No material attached' && (
                            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                              <p className="text-xs font-black uppercase text-[#3f63f2]">
                                Learning Material
                              </p>
                              <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <p className="text-sm font-black text-slate-700">
                                  📎 {task.materialName}
                                </p>
                                <button className="bg-white border border-blue-100 text-[#3f63f2] text-xs font-black px-4 py-2 rounded-lg hover:bg-[#3f63f2] hover:text-white transition-all">
                                  Open Material
                                </button>
                              </div>
                            </div>
                          )}

                          {isSubmitted && (
                            <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4">
                              <p className="text-xs font-black uppercase text-slate-400">
                                Submission Details
                              </p>
                              <p className="text-sm text-slate-700 mt-2">
                                Submitted file:{' '}
                                <span className="font-black">
                                  {task.submissionFileName || 'Completed through LearnPulse'}
                                </span>
                              </p>
                              <p className="text-sm text-slate-500 mt-1">
                                Submitted at: {task.submittedAt || 'Just now'}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="xl:w-72 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <p className="text-xs font-black uppercase text-slate-400">Grade</p>
                          <p
                            className={`text-3xl font-black mt-2 ${
                              task.grade && task.grade !== 'Pending'
                                ? 'text-emerald-600'
                                : 'text-[#d88900]'
                            }`}
                          >
                            {task.grade || 'Pending'}
                          </p>
                          <p className="text-sm text-slate-500 mt-2">
                            {task.feedback || 'Grade will appear here after educator review.'}
                          </p>

                          {!isSubmitted && (
                            <div className="mt-5 space-y-3">
                              <input
                                id={`student-submit-${task.id}`}
                                type="file"
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                                className="hidden"
                                onChange={(event) => handleFileSelect(task.id, event.target.files?.[0])}
                              />
                              <label
                                htmlFor={`student-submit-${task.id}`}
                                className="block cursor-pointer bg-white border-2 border-dashed border-slate-200 hover:border-[#3f63f2] rounded-xl p-4 text-center transition-all"
                              >
                                <p className="text-sm font-black text-slate-700">
                                  {fileName || 'Upload completed assignment'}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  PDF, Word, image, Excel, or ZIP
                                </p>
                              </label>
                              <button
                                onClick={() => handleSubmit(task.id)}
                                disabled={!fileName}
                                className="w-full bg-[#3f63f2] hover:bg-[#2f55de] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-black px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                              >
                                Submit Assignment →
                              </button>
                            </div>
                          )}

                          {isSubmitted && !task.completed && (
                            <button
                              onClick={() => completeTask(task.id)}
                              className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                            >
                              Mark Progress Complete ✓
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-black">Assignment Status</h3>
            <div className="mt-5 space-y-4">
              {[
                {
                  label: 'Pending',
                  value: pendingAssignments.length,
                  color: 'bg-[#fff3c4]',
                  text: 'text-[#92400e]',
                  body: 'Assignments waiting for submission.',
                },
                {
                  label: 'Submitted',
                  value: submittedAssignments.length,
                  color: 'bg-emerald-50',
                  text: 'text-emerald-700',
                  body: 'Assignments already submitted.',
                },
                {
                  label: 'Graded',
                  value: gradedAssignments.length,
                  color: 'bg-blue-50',
                  text: 'text-[#3f63f2]',
                  body: 'Assignments reviewed by educator.',
                },
              ].map((item) => (
                <div key={item.label} className={`${item.color} rounded-2xl p-4 border border-slate-100`}>
                  <div className="flex items-center justify-between">
                    <p className={`font-black ${item.text}`}>{item.label}</p>
                    <p className={`text-2xl font-black ${item.text}`}>{item.value}</p>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-black">How submission works</h3>
            <div className="mt-5 space-y-4">
              {[
                ['1', 'Open the learning material attached by your educator.'],
                ['2', 'Complete the assignment offline or online.'],
                ['3', 'Upload your completed file in the assignment card.'],
                ['4', 'Click Submit Assignment.'],
                ['5', 'Your grade appears after educator review.'],
              ].map(([step, text]) => (
                <div key={step} className="flex gap-3">
                  <span className="h-8 w-8 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center text-xs font-black shrink-0">
                    {step}
                  </span>
                  <p className="text-sm font-bold text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
            <h3 className="text-xl font-black text-emerald-700">Progress connection</h3>
            <p className="text-sm text-emerald-700 mt-3 leading-relaxed">
              When you submit and complete an assignment, your engagement score, course progress, and risk status can improve automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradeAssignmentCard({ task, gradeStudentAssignment }) {
  const [grade, setGrade] = useState(task.grade && task.grade !== 'Pending' ? task.grade : '');
  const [feedback, setFeedback] = useState(
    task.feedback && task.feedback !== 'Awaiting educator review' ? task.feedback : ''
  );

  const isGraded = task.grade && task.grade !== 'Pending';

  return (
    <div
      className={`border rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        isGraded ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200'
      }`}
    >
      <div className="grid xl:grid-cols-[1fr_320px] gap-5">
        <div>
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-full bg-[#3f63f2] text-white flex items-center justify-center text-sm font-black">
              {task.studentInitials}
            </div>
            <div>
              <h4 className="font-black text-lg">{task.title}</h4>
              <p className="text-sm text-slate-500 mt-1">
                {task.studentName} · {task.course || 'General Course'} · {task.studentStatus}
              </p>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-xs font-black uppercase text-slate-400">Submitted File</p>
              <p className="font-bold text-slate-700 mt-1">📎 {task.submissionFileName || 'No file name'}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-xs font-black uppercase text-slate-400">Submitted At</p>
              <p className="font-bold text-slate-700 mt-1">{task.submittedAt || 'Just now'}</p>
            </div>
          </div>

          {isGraded && (
            <div className="mt-4 bg-white border border-emerald-100 rounded-xl p-4">
              <p className="text-sm font-black text-emerald-700">Already graded: {task.grade}</p>
              <p className="text-sm text-slate-600 mt-1">{task.feedback || 'No feedback added.'}</p>
            </div>
          )}
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <label className="text-xs font-black uppercase text-slate-500">Grade</label>
          <input
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            placeholder="e.g. 85% or A"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
          />

          <label className="block text-xs font-black uppercase text-slate-500 mt-4">Feedback</label>
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Write feedback for the student..."
            className="mt-2 w-full h-24 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={() =>
              gradeStudentAssignment({
                studentId: task.studentId,
                taskId: task.id,
                grade,
                feedback,
              })
            }
            disabled={!grade.trim()}
            className="mt-4 w-full bg-[#3f63f2] hover:bg-[#2f55de] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-black px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            {isGraded ? 'Update Grade' : 'Submit Grade'} →
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentMessagesPage({
  student,
  studentMessageForm,
  setStudentMessageForm,
  sendStudentMessage,
}) {
  const inboxMessages = (student.notifications || []).filter(
    (item) =>
      item.direction !== 'sent' &&
      (item.from?.toLowerCase().includes('ngozi') ||
        item.from?.toLowerCase().includes('admin') ||
        item.from?.toLowerCase().includes('learnpulse') ||
        item.title?.toLowerCase().includes('message') ||
        item.title?.toLowerCase().includes('assignment') ||
        item.title?.toLowerCase().includes('graded'))
  );

  const sentMessages = (student.notifications || []).filter((item) => item.direction === 'sent');
  const canSend = studentMessageForm.subject.trim() && studentMessageForm.message.trim();

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#10203a] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 text-blue-100 text-xs font-black px-3 py-1.5 rounded-full">
              Student Message Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-5">Messages and support communication</h2>
            <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
              View messages from your educator and administrator, then send questions, progress updates, or support requests directly from your dashboard.
            </p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <p className="text-sm font-black text-blue-100 uppercase tracking-wider">Message Summary</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-3xl font-black">{inboxMessages.length}</p>
                <p className="text-xs text-blue-100">Received</p>
              </div>
              <div>
                <p className="text-3xl font-black">{sentMessages.length}</p>
                <p className="text-xs text-blue-100">Sent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_420px] gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-2xl font-black">Messages from Educators and Admin</h3>
            <p className="text-sm text-slate-500 mt-1">Read messages, assignment alerts, grading updates, and support notes.</p>
          </div>

          {inboxMessages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black text-slate-700">No received messages yet</p>
              <p className="text-sm text-slate-500 mt-2">Messages from your educator or administrator will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {inboxMessages.map((message) => (
                <div key={message.id} className="p-5 transition-all hover:bg-blue-50/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-black ${
                          message.from?.toLowerCase().includes('admin')
                            ? 'bg-[#92400e]'
                            : message.from?.toLowerCase().includes('learnpulse')
                            ? 'bg-[#3f63f2]'
                            : 'bg-emerald-600'
                        }`}
                      >
                        {message.from?.toLowerCase().includes('admin')
                          ? 'AD'
                          : message.from?.toLowerCase().includes('learnpulse')
                          ? 'LP'
                          : 'NL'}
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">From: {message.from || 'LearnPulse'}</p>
                        <h4 className="text-lg font-black mt-1">{message.title}</h4>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-400">{message.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-line">{message.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-2xl font-black">Send a Message</h3>
            <p className="text-sm text-slate-500 mt-1">Contact your educator or administrator for help.</p>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-black uppercase text-slate-500">Send To</label>
                <select
                  value={studentMessageForm.recipient}
                  onChange={(event) => setStudentMessageForm((prev) => ({ ...prev, recipient: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                >
                  <option value="educator">Educator — Ngozi Lawson</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-500">Subject</label>
                <input
                  value={studentMessageForm.subject}
                  onChange={(event) => setStudentMessageForm((prev) => ({ ...prev, subject: event.target.value }))}
                  placeholder="e.g. Help with assignment submission"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-500">Message</label>
                <textarea
                  value={studentMessageForm.message}
                  onChange={(event) => setStudentMessageForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Write your message here..."
                  className="mt-2 w-full h-40 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#3f63f2] focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button
                type="button"
                onClick={sendStudentMessage}
                disabled={!canSend}
                className="w-full bg-[#3f63f2] hover:bg-[#2f55de] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                Send Message →
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-black">Sent Messages</h3>
            <div className="mt-5 space-y-4">
              {sentMessages.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
                  <p className="text-sm font-black text-slate-700">No sent messages yet</p>
                  <p className="text-xs text-slate-500 mt-1">Messages you send will appear here.</p>
                </div>
              ) : (
                sentMessages.map((message) => (
                  <div key={message.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500">To: {message.to}</p>
                        <p className="text-sm font-black mt-1">{message.title}</p>
                      </div>
                      <span className="text-xs font-black text-slate-400">{message.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 whitespace-pre-line">{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentTutorials({ setActiveMenu }) {
  const tutorialCards = [
    {
      title: 'My Progress',
      icon: '📊',
      menu: 'myProgress',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      description: 'The My Progress page gives you a quick view of your engagement, pending assignments, activity, and how you compare with the class average.',
      points: [
        'Check your engagement score and current learning status.',
        'See pending assignments under “What’s Missing From Your Progress”.',
        'Read new alerts and mark them as read when done.',
        'Monitor how completing tasks can improve your engagement score.',
      ],
    },
    {
      title: 'Assignments',
      icon: '📝',
      menu: 'studentAssignments',
      color: 'bg-blue-50 text-[#3f63f2] border-blue-100',
      description: 'The Assignments page shows tasks published by your educator. You can open materials, upload completed work, submit assignments, and view your grade after review.',
      points: [
        'View all assignments assigned to you.',
        'Open attached learning materials where available.',
        'Upload and submit your completed assignment file.',
        'Track whether each assignment is Pending, Submitted, or Graded.',
      ],
    },
    {
      title: 'My Courses',
      icon: '📚',
      menu: 'myCourses',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      description: 'The My Courses page displays the courses you are registered for and your progress in each course.',
      points: [
        'See all courses registered under your profile.',
        'Track your progress percentage for each course.',
        'Check completed and remaining assignments by course.',
        'Open related assignments directly from course cards.',
      ],
    },
    {
      title: 'Notifications',
      icon: '🔔',
      menu: 'notifications',
      color: 'bg-amber-50 text-[#92400e] border-amber-100',
      description: 'The Notifications page shows alerts about new assignments, submitted work, grades, and important platform updates.',
      points: [
        'Read alerts from LearnPulse, your educator, or the platform.',
        'Receive alerts when a new assignment is uploaded.',
        'Receive grade notifications after educator review.',
      ],
    },
    {
      title: 'Messages',
      icon: '💬',
      menu: 'studentMessages',
      color: 'bg-purple-50 text-purple-700 border-purple-100',
      description: 'The Messages page allows you to read messages from educators and administrators, and send your own messages when you need help.',
      points: [
        'View messages from your educator and administrator.',
        'Send questions or support requests to your educator.',
        'Send administrative concerns to the administrator.',
        'Track sent messages in your message history.',
      ],
    },
  ];

  const workflowSteps = [
    ['1', 'Check your progress', 'Start from My Progress to see your engagement score, missing tasks, and latest alerts.'],
    ['2', 'Open assignments', 'Go to Assignments to view published tasks, attached materials, and submission status.'],
    ['3', 'Submit your work', 'Upload your completed assignment file and submit it for educator review.'],
    ['4', 'Monitor your grade', 'After review, your grade and feedback will appear in the assignment portal.'],
    ['5', 'Ask for support', 'Use Messages to contact your educator or administrator when you need help.'],
  ];

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#0f5132] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 text-blue-100 text-xs font-black px-3 py-1.5 rounded-full">Student Guide</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-5">Learn how to use your student dashboard</h2>
            <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
              This tutorial explains how each student page works and how your progress, assignments, courses, notifications, and messages are connected.
            </p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <p className="text-sm font-black text-blue-100 uppercase tracking-wider">Recommended workflow</p>
            <div className="mt-4 space-y-3">
              {['My Progress', 'Assignments', 'Submit Work', 'Check Grade', 'Message Support'].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-white text-[#3f63f2] flex items-center justify-center text-xs font-black">{index + 1}</span>
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {workflowSteps.map(([step, title, detail]) => (
          <div key={step} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center font-black">{step}</div>
            <h3 className="font-black mt-4">{title}</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {tutorialCards.map((card) => (
          <div key={card.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
            <div className="flex items-start gap-4">
              <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center text-2xl ${card.color}`}>{card.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-black">{card.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{card.description}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {card.points.map((point) => (
                <div key={point} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-50 text-[#3f63f2] flex items-center justify-center text-xs font-black shrink-0">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveMenu(card.menu)}
              className="mt-6 bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/20 active:scale-95"
            >
              Open {card.title} →
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40">
        <h2 className="text-2xl font-black">🔗 How your student pages connect</h2>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
          Assignments created by your educator appear in your Assignment Portal and also show under “What’s Missing From Your Progress” until you submit them. When you submit an assignment, it is removed from the missing list, your engagement can improve, and your educator receives an alert to grade it. Once graded, the grade and feedback appear in your Assignment Portal and Notifications page.
        </p>
      </div>
    </div>
  );
}

function StudentNotifications({ student, messagesOnly = false }) {
  const items = messagesOnly
    ? student.notifications.filter((item) => item.title.toLowerCase().includes('message'))
    : student.notifications;

  return (
    <div className="p-5 sm:p-8 space-y-5">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-black">{messagesOnly ? 'Messages' : 'Notifications'}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {messagesOnly
            ? 'Messages received from your educator.'
            : 'Alerts, assignment updates, and educator messages appear here.'}
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="font-black text-slate-700">No items yet</p>
            <p className="text-sm text-slate-500 mt-1">New alerts will appear here.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#3f63f2]/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{item.from}</p>
                  <h3 className="text-lg font-black mt-1">{item.title}</h3>
                </div>
                <span className="text-xs font-black text-slate-400">{item.time}</span>
              </div>
              <p className="text-sm text-slate-600 mt-3 whitespace-pre-line leading-relaxed">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StudentMyCoursesPage({ student }) {
  const registeredCourses = student.courses || [];
  const averageProgress = registeredCourses.length
    ? Math.round(registeredCourses.reduce((sum, course) => sum + course.progress, 0) / registeredCourses.length)
    : 0;
  const completedAssignments = registeredCourses.reduce((sum, course) => sum + course.completed, 0);
  const totalAssignments = registeredCourses.reduce((sum, course) => sum + course.total, 0);

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="bg-gradient-to-br from-[#10203a] to-[#3f63f2] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 text-blue-100 text-xs font-black px-3 py-1.5 rounded-full">
              My Registered Courses
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-5">
              Courses you are currently taking
            </h2>
            <p className="text-blue-100 mt-4 leading-relaxed max-w-3xl">
              This page shows all courses registered under your profile, your progress in each course, completed assignments, and remaining learning tasks.
            </p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <p className="text-sm font-black text-blue-100 uppercase tracking-wider">Course Summary</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-3xl font-black">{registeredCourses.length}</p>
                <p className="text-xs text-blue-100">Courses</p>
              </div>
              <div>
                <p className="text-3xl font-black">{averageProgress}%</p>
                <p className="text-xs text-blue-100">Avg. Progress</p>
              </div>
              <div>
                <p className="text-3xl font-black">{completedAssignments}/{totalAssignments}</p>
                <p className="text-xs text-blue-100">Assignments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {registeredCourses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
          <p className="text-xl font-black text-slate-800">No registered courses found</p>
          <p className="text-sm text-slate-500 mt-2">Courses assigned to you will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {registeredCourses.map((course) => {
            const remaining = Math.max(course.total - course.completed, 0);
            return (
              <div
                key={course.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#3f63f2]/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center text-2xl ${
                      course.progress >= 70
                        ? 'bg-emerald-50 text-emerald-700'
                        : course.progress >= 40
                        ? 'bg-[#fff7d6] text-[#92400e]'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    📚
                  </div>
                  <span
                    className={`text-xs font-black px-3 py-1.5 rounded-full ${
                      course.progress >= 70
                        ? 'bg-emerald-100 text-emerald-700'
                        : course.progress >= 40
                        ? 'bg-[#fff3c4] text-[#92400e]'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {course.progress >= 70
                      ? 'On Track'
                      : course.progress >= 40
                      ? 'Needs Attention'
                      : 'Falling Behind'}
                  </span>
                </div>

                <h3 className="text-xl font-black mt-6">{course.name}</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Registered course under your LearnPulse student profile.
                </p>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm font-black mb-2">
                    <span>Course Progress</span>
                    <span
                      className={
                        course.progress >= 70
                          ? 'text-emerald-600'
                          : course.progress >= 40
                          ? 'text-[#d88900]'
                          : 'text-rose-600'
                      }
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        course.progress >= 70
                          ? 'bg-emerald-500'
                          : course.progress >= 40
                          ? 'bg-[#f59e0b]'
                          : 'bg-rose-600'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs font-black uppercase text-slate-400">Completed</p>
                    <p className="text-2xl font-black mt-2 text-emerald-600">{course.completed}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs font-black uppercase text-slate-400">Remaining</p>
                    <p className={`text-2xl font-black mt-2 ${remaining > 0 ? 'text-[#d88900]' : 'text-emerald-600'}`}>
                      {remaining}
                    </p>
                  </div>
                </div>

                <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-black uppercase text-[#3f63f2]">Assignment Status</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {course.completed} of {course.total} assignments completed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const assignmentTab = document.querySelector('[data-student-assignments-link]');
                    assignmentTab?.click();
                  }}
                  className="mt-5 w-full bg-[#3f63f2] hover:bg-[#2f55de] text-white text-sm font-black px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                >
                  View Related Assignments →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StaffMessageNoticePage({ notifications = [], role = 'Educator' }) {
  const messages = notifications.filter((item) => item.type === 'student-message');
  const unreadCount = messages.filter((item) => !item.read).length;

  return (
    <div className="p-5 sm:p-8 space-y-5">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">{role} Message Notices</h2>
            <p className="text-sm text-slate-500 mt-1">
              Student messages sent to this dashboard appear here.
            </p>
          </div>

          <span className="bg-blue-50 text-[#3f63f2] text-sm font-black px-4 py-2 rounded-xl">
            {unreadCount} unread
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="font-black text-slate-700">No student messages yet</p>
          <p className="text-sm text-slate-500 mt-1">
            New messages from students will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#3f63f2]/40 ${
                item.read ? 'border-slate-200' : 'border-blue-200 bg-blue-50/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-full bg-[#3f63f2] text-white flex items-center justify-center text-sm font-black">
                  {item.studentInitials}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-slate-500">From: {item.studentName}</p>
                      <h3 className="text-lg font-black mt-1">{item.subject}</h3>
                    </div>

                    <span className="text-xs font-black text-slate-400">{item.time}</span>
                  </div>

                  <p className="text-sm text-slate-600 mt-3 whitespace-pre-line leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

