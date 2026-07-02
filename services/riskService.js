const calculateRisk = (student) => {
  const inactiveDays = Number(student?.inactiveDays || 0);
  const engagement = Number(student?.engagement || 100);
  const completedLessons = Number(student?.completedLessons || 0);

  let riskScore = 0;

  if (inactiveDays > 0) {
    riskScore += Math.min(inactiveDays * 5, 40);
  }

  if (engagement < 100) {
    riskScore += Math.max((100 - engagement) * 0.8, 0);
  }

  if (completedLessons === 0) {
    riskScore += 20;
  } else if (completedLessons < 5) {
    riskScore += 10;
  }

  riskScore = Math.min(Math.round(riskScore), 100);

  let status = 'active';
  if (riskScore >= 70) {
    status = 'dropped';
  } else if (riskScore >= 40) {
    status = 'at-risk';
  }

  return {
    riskScore,
    status
  };
};

module.exports = {
  calculateRisk
};
