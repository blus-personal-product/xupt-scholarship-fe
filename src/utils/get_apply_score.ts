import { evaluate } from 'mathjs';
import getStudentGrade from './get-grade';

const getApplyScore = (scoreInfo: {
  base: number;
  moral: number;
  practice: number;
  academic: number;
}, studentGrade: string, type: IStudentInfo['type']): number => {
  const grade = getStudentGrade(studentGrade)
  const { base, moral, practice, academic } = scoreInfo;
  let score = base;
  if (type === 'bachelor_degree') {
    if (grade === 2) {
      score = evaluate(`0.1 * ${moral} + 0.4 * ${base} + 0.3 * ${academic} + 0.2 * ${practice}`);
    }
    if (grade === 3) {
      score = evaluate(`0.1 * ${moral} + 0.5 * ${academic} + 0.4 * ${practice}`);
    }
  } else {
    if (grade === 2) {
      score = evaluate(`0.1 * ${moral} + 0.4 * ${base} + 0.2 * ${academic} + 0.3 * ${practice}`);
    }
    if (grade === 3) {
      score = evaluate(`0.1 * ${moral} + 0.4 * ${academic} + 0.5 * ${practice}`);
    }
  }
  return +score.toFixed(3);
}

export default getApplyScore;