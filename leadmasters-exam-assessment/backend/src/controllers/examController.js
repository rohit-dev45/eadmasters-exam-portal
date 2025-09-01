import Attempt from '../models/Attempt.js';
import Question from '../models/Question.js';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function startExam(req, res) {
  try {
    const questionCount = parseInt(req.query.count || '20', 10);
    const questions = await Question.aggregate([{ $sample: { size: questionCount } }]);
    const attempt = await Attempt.create({
      userId: req.user.id,
      questions: questions.map(q => q._id),
      durationSeconds: 1800
    });

    const safeQs = questions.map(q => ({
      id: q._id,
      text: q.text,
      options: shuffle(q.options.map((o, idx) => ({ index: idx, text: o.text })))
    }));

    return res.json({ attemptId: attempt._id, durationSeconds: attempt.durationSeconds, questions: safeQs });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function submitExam(req, res) {
  try {
    const { attemptId, answers } = req.body; // answers: [{questionId, selectedIndex}]
    const attempt = await Attempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
    if (attempt.submittedAt) return res.status(400).json({ message: 'Already submitted' });
    if (String(attempt.userId) !== String(req.user.id)) return res.status(403).json({ message: 'Forbidden' });

    const qs = await Question.find({ _id: { $in: attempt.questions } });
    const correctMap = new Map();
    qs.forEach(q => {
      const correctIndex = q.options.findIndex(o => o.isCorrect === true);
      correctMap.set(String(q._id), correctIndex);
    });

    let score = 0;
    for (const ans of answers || []) {
      const correctIndex = correctMap.get(String(ans.questionId));
      if (typeof correctIndex === 'number' && correctIndex === ans.selectedIndex) {
        score += 1;
      }
    }

    attempt.answers = answers || [];
    attempt.score = score;
    attempt.submittedAt = new Date();
    await attempt.save();

    return res.json({ attemptId: attempt._id, score, total: attempt.questions.length });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

export async function getResult(req, res) {
  try {
    const { id } = req.params; // attempt id
    const attempt = await Attempt.findById(id).populate('questions', 'text options');
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
    if (String(attempt.userId) !== String(req.user.id)) return res.status(403).json({ message: 'Forbidden' });

    return res.json({
      attemptId: attempt._id,
      score: attempt.score,
      total: attempt.questions.length,
      submittedAt: attempt.submittedAt,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
